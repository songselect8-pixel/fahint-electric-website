"""Validate local photo derivation / document integrity without opening a browser."""
import hashlib
import json
from pathlib import Path
import numpy as np
from PIL import Image

root = Path(__file__).resolve().parents[1]
library = root.parent / "公司资料&产品/产品图片"
records = json.loads((root / "src/data/catalog/smart-switch-media.json").read_text(encoding="utf8"))
checked = set()
for model, media in records.items():
    for entries in media.values():
        for entry in entries:
            original = library / entry["source"]
            assert original.is_file(), (model, entry["source"])
            assert hashlib.sha256(original.read_bytes()).hexdigest() == entry["sourceHash"], model
            if entry["src"] in checked:
                continue
            checked.add(entry["src"])
            output = root / "public" / entry["src"]
            if entry["background"] != "white":
                assert original.read_bytes() == output.read_bytes(), (model, "original copy differs")
                if entry.get("kind") not in ("dimensions", "wiring"):
                    with Image.open(output) as image:
                        rgb = image.convert("RGB")
                        corners = [(2, 2), (rgb.width - 3, 2), (2, rgb.height - 3), (rgb.width - 3, rgb.height - 3)]
                        assert all(min(rgb.getpixel(p)) >= 250 for p in corners), (model, "existing EU photo has a grey background")
                continue
            with Image.open(original) as source, Image.open(output) as result:
                before = np.array(source.convert("RGB"))
                after = np.array(result.convert("RGB"))
            assert before.shape == after.shape == (800, 800, 3), model
            assert np.all(after[:5] == 255) and np.all(after[-5:] == 255), model
            assert np.all(after[:, :5] == 255) and np.all(after[:, -5:] == 255), model
            # Same original pixels inside glass / printed label and the housing.
            points = {"4.png": [(400, 400), (540, 545)],
                      "5.png": [(400, 400), (260, 310), (720, 480)],
                      "6.png": [(230, 360), (210, 570), (410, 300), (360, 734)]}.get(original.name, [(400, 400)])
            for x, y in points:
                assert np.array_equal(before[y, x], after[y, x]), (model, original.name, "product pixel", x, y)
            if original.name == "6.png":
                assert np.all(after[170, 260] == 255), (model, "stray background beside housing")
print(f"Verified {len(records)} models and {len(checked)} assets: white edges, original product pixels, source hashes and unchanged reference drawings.")
