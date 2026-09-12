"""User-approved local background replacement; never redraw product pixels.

The US renders share five camera silhouettes. A narrow GrabCut edge band refines
each outline while the entire interior (glass, icons, terminals, labels) stays
locked. EU white photographs and technical artwork are copied byte-for-byte.
Requires Pillow, numpy and opencv-python; invoked by import-smart-switch-media.mjs.
"""
import hashlib
import json
from pathlib import Path
import shutil
import sys

import cv2
import numpy as np
from PIL import Image

# Coordinates are for the original 800 px renders, not a color-key threshold.
OUTLINES = {
    "front": [(268, 72), (557, 39), (587, 50), (573, 200), (564, 200),
              (561, 231), (602, 238), (606, 244), (572, 599), (568, 603),
              (531, 600), (519, 765), (487, 769), (201, 716)],
    "rear": [(186, 44), (191, 39), (628, 44), (631, 47), (632, 740),
             (628, 744), (191, 750), (186, 746)],
    "low": [(21, 293), (591, 285), (784, 444), (783, 458), (776, 486),
            (592, 499), (576, 577), (571, 580), (253, 599), (205, 548),
            (201, 512), (156, 515), (151, 511), (17, 309)],
    "rear-angle": [(20, 382), (184, 341), (185, 292), (191, 286), (505, 215),
                   (513, 218), (552, 268), (596, 257), (776, 469), (774, 491),
                   (771, 503), (154, 658), (149, 649), (19, 404)],
    "terminals": [(284, 81), (473, 46), (495, 48), (512, 45), (516, 49),
                  (523, 763), (507, 770), (474, 767), (282, 716),
                  (282, 605), (204, 597), (199, 589), (199, 225), (208, 221), (283, 212)]
}


def white_background(original, camera):
    rgb = np.array(original.convert("RGB"))
    if rgb.shape != (800, 800, 3):
        raise ValueError(f"Unreviewed render dimensions: {rgb.shape}")
    silhouette = np.zeros((800, 800), np.uint8)
    cv2.fillPoly(silhouette, [np.array(OUTLINES[camera], np.int32)], 255)
    kernel = np.ones((13, 13), np.uint8)
    core = cv2.erode(silhouette, kernel) > 0
    outer = cv2.dilate(silhouette, kernel) > 0
    labels = np.where(silhouette > 0, cv2.GC_PR_FGD, cv2.GC_PR_BGD).astype(np.uint8)
    labels[core] = cv2.GC_FGD
    labels[~outer] = cv2.GC_BGD
    cv2.setRNGSeed(17)
    cv2.grabCut(rgb, labels, None, np.zeros((1, 65)), np.zeros((1, 65)), 2, cv2.GC_INIT_WITH_MASK)
    mask = ((labels == cv2.GC_FGD) | (labels == cv2.GC_PR_FGD)).astype(np.uint8) * 255
    # Pale planar rims can match the background color. Preserve their traced
    # contours instead of allowing a color classifier to eat the bottom edge.
    if camera in ("rear", "terminals", "low"):
        mask = silhouette
    # Subpixel feathering is limited to the cut edge; no interior retouching.
    alpha = cv2.GaussianBlur(mask, (3, 3), 0.45).astype(np.float32) / 255
    alpha[core] = 1
    alpha[~outer] = 0
    result = np.rint(rgb * alpha[..., None] + 255 * (1 - alpha[..., None])).astype(np.uint8)
    if not np.array_equal(result[core], rgb[core]):
        raise ValueError("Product interior changed")
    return Image.fromarray(result)


def main():
    output = Path(sys.argv[1]).resolve()
    expected = Path(__file__).resolve().parents[1] / "public/assets/images/catalog/smart-switches"
    if output != expected.resolve():
        raise ValueError("Output must stay inside the smart-switch asset directory")
    output.mkdir(parents=True, exist_ok=True)
    cv2.setNumThreads(2)
    sizes = {}
    for job in json.load(sys.stdin):
        original = Path(job["original"])
        target = (output / job["filename"]).resolve()
        if target.parent != output or target == original.resolve():
            raise ValueError("Unsafe output path")
        if hashlib.sha256(original.read_bytes()).hexdigest() != job["sourceHash"]:
            raise ValueError("Source changed during import")
        if not target.exists() or job.get("refresh"):
            if job.get("mask"):
                with Image.open(original) as source:
                    white_background(source, job["mask"]).save(target, "WEBP", lossless=True, method=6)
            else:
                shutil.copyfile(original, target)
        with Image.open(target) as image:
            sizes[job["filename"]] = list(image.size)
            if job.get("mask"):
                pixels = np.array(image.convert("RGB"))
                if not (np.all(pixels[:5] == 255) and np.all(pixels[-5:] == 255)
                        and np.all(pixels[:, :5] == 255) and np.all(pixels[:, -5:] == 255)):
                    raise ValueError("Background is not white at image boundary")
    print(json.dumps(sizes))


if __name__ == "__main__":
    main()
