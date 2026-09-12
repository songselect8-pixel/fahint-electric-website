# Homepage scroll choreography

Refine the approved homepage with motion at chapter handoffs. Keep images, copy, spacing, the six-category grid and native scrolling intact.

## Motion thesis

- Focal sequence: the hero's installed device opens into six installation scenes. The collection heading leads; each photo frame opens to its complete bounds, with the three siblings offset by 0/80/160ms per desktop row. Captions settle behind their images. No model or product geometry changes.
- Continuity: the cutaway house and company photograph open their framing and recover full brightness as they enter. Reuse the existing native view-timeline enhancement beside the factory-photo sequence; unsupported browsers see complete static photographs. Headings and the brand panel use the existing `Reveal` component as quiet supporting arrivals.
- Feedback: keyboard focus immediately reveals and stabilizes its target. Product hotspots, certificate controls, FAQ answers and the inquiry form are not individually animated; house hotspots and their image keep identical coordinates.
- Budget: existing IntersectionObserver helper, CSS transitions and native scroll timelines only; no new library, scroll handler, scroll interception, permanent will-change or background loops. Frame/caption entrances finish within 720ms plus at most 160ms stagger. Small screens use shorter movement and no stagger. Reduced motion keeps content immediately visible and preserves existing interactive state feedback.

## Work

- [x] Inspect existing Reveal, all callers, homepage sections, CSS and motion preference behavior. Keep the factory sequence and hero carousel.
- [x] Write focused regression checks for one-shot visibility, keyboard interruption, section integration, reduced-motion/default fallbacks and bounded mobile delays; confirm RED.
- [x] Reuse Reveal on semantic heading/card elements; add scoped photographic framing and chapter timeline styles.
- [x] Verify focused/full tests, build and bounded source inspection. No browser review/restart; user reviews appearance.

## Verification

- RED: 3 expected failures and 40 passing checks before implementation; missing focus activation, card integration and motion styles were detected.
- GREEN: focused tests passed 43/43; full suite passed 666/666 across 31 files; production build passed.
- The existing mobile-layout test matched the new combined motion media query and crossed into a tablet rule. Requiring the mobile block's opening brace fixed the matcher; the approved mobile layout itself was unchanged.
- Targeted impeccable detector returned no findings. Scoped `git diff --check` passed, with only the repository's existing LF/CRLF conversion notices.
- Source review confirmed one-shot observer cleanup, composed focus handling, complete default/reduced-motion frames, scoped mobile delays, and static fallbacks for unsupported native scroll timelines. No new dependencies, scroll interception or permanent `will-change`.
- Kept the approved hero alignment, neutral chapter bridge, six category images/content and section order. No browser review, preview restart, image generation or deployment was performed.
