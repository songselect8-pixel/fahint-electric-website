# Homepage Content Restoration Design

## Objective

Preserve the new full-screen, image-led brand direction while restoring the trust-building content removed from the previous homepage. The page should communicate both a finished brand system and a credible OEM/ODM manufacturing partner without returning to dense catalogue-style copy.

## Approved constraints

- Keep the three-button floating rail unchanged.
- Keep the full-screen hero and the five approved product families.
- Restore Blog, FAQ and the full inquiry form near the bottom of the homepage.
- Do not restore Wallplates or Dimmers to the homepage product-family selector.
- Use existing verified company data, product assets, factory photographs, certificates and blog posts.

## Page structure

1. Full-screen brand hero.
2. Five product-family selector.
3. Private-label capability module covering product selection, finishes, branding/packaging and documentation.
4. Brand collaboration story using the supplied customer/team photograph.
5. Full-width OEM/ODM factory poster.
6. Four-step Select / Customize / Approve / Produce workflow.
7. Manufacturing proof gallery with real workshop, laboratory, sample-room and warehouse photography plus verified company statistics.
8. Buyer-fit module for private-label brands, distributors and project buyers.
9. Certification carousel using real certificate scans.
10. Latest three blog articles.
11. FAQ module.
12. Full inquiry form and company contact summary.
13. Existing trust strip and closing proposal CTA, positioned so they support rather than duplicate the form.

## Visual system

- Large photographic bands alternate with calm white or pale-grey editorial sections.
- Headlines remain short and are capped to readable widths.
- Supporting copy is limited to one short paragraph or concise card copy.
- Existing navy, cyan, white and neutral palette remains the design foundation.
- Factory and certificate sections rely on real supplied assets rather than decorative stock imagery.

## Responsive corrections

- Replace the brand-story viewport-derived horizontal padding with bounded `clamp()` spacing so ultra-wide screens do not squeeze or clip the copy column.
- Cap editorial grid widths and maintain a stable text/media ratio above 1800px.
- Stack image/text modules on tablets and phones while keeping headings and controls readable.
- Keep the floating rail unchanged; repeated rail icons visible in stitched full-page screenshots are a screenshot-stitching artifact, not multiple DOM rails.

## Acceptance criteria

- The homepage contains private-label, manufacturing, buyer-fit, certification, blog, FAQ and inquiry modules.
- The five approved product tabs remain unchanged.
- The brand-story headline is readable without clipping at 2560px-wide viewports.
- No horizontal overflow at desktop, ultra-wide, tablet or mobile widths.
- The page builds and all automated homepage tests pass.
