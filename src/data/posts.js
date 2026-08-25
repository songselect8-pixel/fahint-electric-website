// SEO articles. Technical content is drawn from the NEC and UL 943 as cited in
// each article, plus Fahint's own catalogue specifications. No invented statistics.

export const posts = [
  {
    slug: 'gfci-vs-afci-whats-the-difference',
    title: 'GFCI vs AFCI: What Is the Difference and Where Does Each Belong?',
    excerpt:
      'Both devices interrupt a circuit, but they detect completely different faults. Here is how to specify each one correctly and why some locations need both.',
    date: '2026-08-12',
    readMinutes: 7,
    category: 'Technical Guide',
    cover: '/assets/images/products/gf15-features.webp',
    body: [
      { type: 'p', text: 'Buyers regularly ask us whether a GFCI receptacle can replace an AFCI breaker, or the reverse. It cannot. The two devices monitor different electrical signatures and protect against different hazards, and the National Electrical Code treats them as separate requirements.' },
      { type: 'h2', text: 'What a GFCI detects' },
      { type: 'p', text: 'A Ground Fault Circuit Interrupter continuously compares the current flowing out on the hot conductor with the current returning on the neutral. In a healthy circuit those two values match. If current is leaking to ground — for example through a person who has become part of the path — the values diverge.' },
      { type: 'p', text: 'A Class A GFCI is defined by UL 943 as one that trips when that imbalance reaches 6 milliamperes. The purpose is protection against electrocution. That is why GFCI protection is required in locations where water and people meet: bathrooms, kitchens, basements, garages, laundry areas and outdoors.' },
      { type: 'h2', text: 'What an AFCI detects' },
      { type: 'p', text: 'An Arc Fault Circuit Interrupter looks for the high-frequency electrical signature of an arcing fault — the erratic waveform produced by a damaged cord, a nail driven through a cable, or a loose terminal screw. Arcing generates heat and is a fire ignition source.' },
      { type: 'p', text: 'AFCI protection is therefore a fire-prevention requirement rather than a shock-prevention one, and the NEC applies it broadly to dwelling-unit branch circuits serving living spaces.' },
      { type: 'h2', text: 'Why some locations require both' },
      { type: 'p', text: 'Because the two devices address unrelated hazards, a location can fall under both requirements at once. A kitchen countertop circuit in a dwelling unit is the classic example: it needs GFCI protection because of the proximity of water, and AFCI protection because it is a dwelling-unit branch circuit.' },
      { type: 'p', text: 'In that situation the installer has two compliant paths — a dual-function AFCI/GFCI breaker at the panel, or an AFCI breaker at the panel combined with a GFCI receptacle at the point of use. The second approach is often preferred on renovation work because a tripped GFCI can be reset at the outlet rather than at the panel.' },
      { type: 'h2', text: 'A note on self-test' },
      { type: 'p', text: 'UL 943 5th Edition introduced an auto-monitoring requirement, which is why current-production GFCIs perform periodic self-tests. Fahint GFCI devices run an MCU-controlled self-test every 15 minutes, with the initial test completing within three seconds of power-up, and signal end of service life through a dual-colour indicator.' },
      { type: 'h2', text: 'Specifying correctly' },
      { type: 'p', text: 'When you are building a bill of materials, treat GFCI and AFCI as independent line items driven by two separate questions: is there a shock risk from water or ground contact, and is this a dwelling-unit branch circuit? Answering them separately avoids both over-specification and inspection failures.' }
    ]
  },
  {
    slug: 'nec-406-8-weather-resistant-receptacles',
    title: 'NEC 406.8 Explained: When You Need Weather-Resistant Receptacles',
    excerpt:
      'A WR marking is not interchangeable with a weatherproof cover. Understanding what NEC 406.8 actually requires for damp and wet locations.',
    date: '2026-08-08',
    readMinutes: 6,
    category: 'Compliance',
    cover: '/assets/images/products/gw15-lifestyle.webp',
    body: [
      { type: 'p', text: 'One of the most common specification errors we see on outdoor installations is treating a weatherproof enclosure and a weather-resistant receptacle as the same thing. They are complementary, not interchangeable, and NEC Section 406.8 addresses both.' },
      { type: 'h2', text: 'Damp versus wet locations' },
      { type: 'p', text: 'The Code distinguishes between damp locations — such as a covered porch or a sheltered patio, where moisture is present but direct exposure is limited — and wet locations, where the receptacle is subject to saturation or direct weather. The enclosure requirements differ between the two, but the receptacle requirement does not.' },
      { type: 'h2', text: 'What the WR marking means' },
      { type: 'p', text: 'A receptacle marked WR has been constructed and tested to withstand environmental exposure. That means UV-resistant and cold-impact-resistant polymers on the face and buttons, corrosion-resistant metal components, and internal protection for the circuit board.' },
      { type: 'p', text: 'On Fahint weather-resistant GFCI devices, that internal protection takes the form of a conformal coating applied to the board, keeping moisture away from the components that control the trip mechanism.' },
      { type: 'h2', text: 'The enclosure is a separate requirement' },
      { type: 'p', text: 'A WR receptacle installed without a suitable cover is still not compliant, and a weatherproof in-use cover fitted over a standard indoor receptacle is equally non-compliant. Both elements must be present: the device rated for the environment, and the enclosure rated for the location classification.' },
      { type: 'h2', text: 'Do not forget TR' },
      { type: 'p', text: 'In dwelling units the tamper-resistant requirement applies alongside the weather-resistant one. This is why outdoor residential receptacles are usually specified as TR and WR together — Fahint GW15 and GW20 ship with both features as standard.' },
      { type: 'h2', text: 'Practical specification advice' },
      { type: 'p', text: 'When you write an outdoor receptacle specification, state three things explicitly: the amperage and NEMA configuration, the required device markings (TR, WR, GFCI as applicable), and the enclosure rating appropriate to the damp or wet classification. Leaving any one of the three implicit is where field problems begin.' }
    ]
  },
  {
    slug: 'why-gfci-outlets-trip',
    title: 'Why GFCI Outlets Trip: Six Causes and How to Diagnose Them',
    excerpt:
      'A tripping GFCI is usually reporting a real condition. A systematic way to distinguish genuine ground faults from nuisance trips and wiring errors.',
    date: '2026-08-04',
    readMinutes: 8,
    category: 'Troubleshooting',
    cover: '/assets/images/products/gf15-install.webp',
    body: [
      { type: 'p', text: 'When a GFCI trips repeatedly, the instinct is often to assume the device is defective. In practice a tripping GFCI is usually doing exactly what it was designed to do. Working through the causes in order will identify the real problem faster than swapping devices.' },
      { type: 'h2', text: '1. A genuine ground fault' },
      { type: 'p', text: 'Current is leaking to ground somewhere on the protected circuit. Unplug every load, reset the device, then reconnect loads one at a time. If the trip follows a particular appliance, the fault is in that appliance, not the receptacle.' },
      { type: 'h2', text: '2. Accumulated moisture' },
      { type: 'p', text: 'Moisture inside an outdoor box, a garage receptacle, or a bathroom enclosure creates a low-resistance path to ground. This is often intermittent and weather-correlated. Dry the enclosure completely and verify the cover and gasket before concluding the device is at fault.' },
      { type: 'h2', text: '3. Reversed line and load wiring' },
      { type: 'p', text: 'The LINE terminals connect to the incoming supply and the LOAD terminals feed downstream devices. Reversing them is one of the most frequent installation errors. Fahint GFCI devices include reverse-wiring protection: if line and load are reversed, no power reaches the receptacle face, and the device can be reset only after the wiring is corrected.' },
      { type: 'h2', text: '4. Shared or crossed neutrals' },
      { type: 'p', text: 'If the neutral of a GFCI-protected circuit is bonded with the neutral of another circuit — common in older multiwire branch circuit installations — return current bypasses the sensing transformer and the device reads it as an imbalance. Each GFCI needs its own dedicated neutral downstream.' },
      { type: 'h2', text: '5. Long circuit runs with capacitive leakage' },
      { type: 'p', text: 'Very long cable runs accumulate small amounts of capacitive leakage to ground. On a marginal installation this can approach the 6 mA Class A threshold, particularly when combined with electronic loads that have their own leakage. Shortening the protected run usually resolves it.' },
      { type: 'h2', text: '6. End of service life' },
      { type: 'p', text: 'GFCI devices do not last forever. Under UL 943 5th Edition, auto-monitoring devices must indicate when they can no longer protect. On Fahint devices a solid red indicator means the self-test has determined the unit has reached end of life and must be replaced. A green indicator means the device is working and cycling its self-test every 15 minutes.' },
      { type: 'h2', text: 'A note on monthly testing' },
      { type: 'p', text: 'Self-test does not eliminate the recommendation to press the TEST button monthly. The self-test verifies the internal electronics; the manual test additionally verifies the mechanical interruption of the contacts.' }
    ]
  },
  {
    slug: 'tamper-resistant-receptacle-requirements',
    title: 'Tamper-Resistant Receptacles: What the NEC Requires in Dwelling Units',
    excerpt:
      'TR receptacles are mandatory in dwelling units, but the requirement extends further than most buyers realise. A guide to where the shutter system is needed.',
    date: '2026-07-29',
    readMinutes: 5,
    category: 'Compliance',
    cover: '/assets/images/products/gt15-plate.webp',
    body: [
      { type: 'p', text: 'The tamper-resistant requirement is one of the clearest child-safety provisions in the National Electrical Code, and it is also one of the most frequently under-specified when buyers build a purchase order from an older parts list.' },
      { type: 'h2', text: 'How the shutter mechanism works' },
      { type: 'p', text: 'A TR receptacle contains a spring-loaded shutter system behind the face. The shutters open only when balanced pressure is applied to both blade slots simultaneously — which happens naturally when a two- or three-prong plug is inserted, but not when a single object is pushed into one slot.' },
      { type: 'p', text: 'The mechanism is entirely passive and requires no maintenance. From the user perspective a TR receptacle behaves like a standard one, with slightly higher initial insertion force.' },
      { type: 'h2', text: 'Where the requirement applies' },
      { type: 'p', text: 'The NEC requires that 15A and 20A, 125V receptacles installed in dwelling units be listed tamper-resistant. The scope covers the residence broadly rather than only children\'s rooms, and subsequent Code cycles have extended similar requirements into occupancies such as childcare facilities, preschools, waiting areas and patient care spaces.' },
      { type: 'p', text: 'Because Code adoption varies by jurisdiction and edition, always confirm which NEC edition your Authority Having Jurisdiction has adopted before finalising a specification.' },
      { type: 'h2', text: 'TR combined with other features' },
      { type: 'p', text: 'TR is a construction feature, not a device category, so it combines with others. A dwelling-unit bathroom receptacle typically needs TR and GFCI together; an outdoor dwelling-unit receptacle typically needs TR, WR and GFCI together. Fahint covers these combinations with the GT series for TR and the GW series for TR plus WR.' },
      { type: 'h2', text: 'Purchasing implications' },
      { type: 'p', text: 'If you are supplying the North American residential market, TR should be treated as the default rather than an upgrade. Stocking non-TR devices for dwelling-unit applications creates returns and inspection failures that cost more than the small unit price difference.' }
    ]
  },
  {
    slug: 'how-to-source-ul-listed-gfci-from-china',
    title: 'How to Source UL Listed GFCI Outlets From China Without Compliance Risk',
    excerpt:
      'A practical due-diligence checklist for importers: verifying UL files, understanding what listing actually covers, and the questions that separate real factories from traders.',
    date: '2026-07-22',
    readMinutes: 9,
    category: 'Sourcing',
    cover: '/assets/images/hero/hero-factory.webp',
    body: [
      { type: 'p', text: 'GFCI devices are life-safety products. For an importer, a compliance failure is not a quality complaint — it is a recall, a liability exposure and potentially a customs detention. The due diligence is worth doing properly.' },
      { type: 'h2', text: 'Verify the UL file, not the certificate image' },
      { type: 'p', text: 'Any supplier can send a PDF. What matters is the file number, which you can look up independently in UL\'s online certifications directory. Confirm three things: that the file exists, that it is held by the company you are actually buying from, and that the specific model numbers you are purchasing appear under it.' },
      { type: 'p', text: 'Fahint products are listed under file E504391. We encourage buyers to verify it directly rather than relying on documents we supply.' },
      { type: 'h2', text: 'Understand what the listing covers' },
      { type: 'p', text: 'A UL listing applies to a specific construction. If a supplier changes the internal board, the contact material or the housing polymer without updating the file, the shipped product is no longer the listed product even though the marking is still on it. Ask directly whether the construction has changed since listing and whether follow-up service inspections are current.' },
      { type: 'h2', text: 'Distinguish the factory from the trader' },
      { type: 'p', text: 'Questions that are difficult for a trading company to answer convincingly: How many inspection lines do you run and what does each one test? What is your first pass yield? Who holds the tooling for this model? Can you produce a video walkthrough of the assembly line on request?' },
      { type: 'p', text: 'Fahint operates a 70,000 square foot facility in Wenzhou with 12 automated inspection lines and a first pass yield above 98 percent. Those are the kinds of numbers you should expect a real manufacturer to state without hesitation.' },
      { type: 'h2', text: 'Confirm the standard edition' },
      { type: 'p', text: 'GFCI requirements have changed materially over successive editions of UL 943. Ask explicitly which edition the product is certified to. Current production should be to UL 943 5th Edition 2018, which includes the auto-monitoring requirement that drives the self-test function.' },
      { type: 'h2', text: 'Ask about the failure mode' },
      { type: 'p', text: 'A well-designed GFCI fails safe. Ask what happens at end of life, whether the device denies power when it can no longer protect, and how the user is notified. A supplier who cannot answer this clearly has probably not designed the product themselves.' },
      { type: 'h2', text: 'Check logistics realism' },
      { type: 'p', text: 'Lead time promises are easy to make. Ask whether the supplier holds North American warehouse stock, what the realistic factory-direct production window is, and what happens to your timeline if a shipment is held for inspection. Fahint ships stocked items from overseas warehouses within three days, with delivery in as fast as ten days; factory-direct production runs typically complete in 25 to 35 days.' },
      { type: 'h2', text: 'Request samples and test them' },
      { type: 'p', text: 'Before committing to volume, obtain samples and verify the trip threshold, the reverse-wiring behaviour and the self-test indication yourself. A supplier confident in their product will not resist this.' }
    ]
  },
  {
    slug: 'gfci-colour-finishes-specification',
    title: 'Specifying Device Finishes: Matching GFCI Outlets Across a Whole Project',
    excerpt:
      'Why finish consistency across receptacles, switches and wallplates matters more than buyers expect, and how to avoid mismatched devices on a completed installation.',
    date: '2026-07-15',
    readMinutes: 5,
    category: 'Specification',
    cover: '/assets/images/products/gf15-white.webp',
    body: [
      { type: 'p', text: 'Finish is usually the last thing on a wiring device specification and the first thing an end client notices. On a completed project, three slightly different shades of white across receptacles, switches and plates reads as poor workmanship even when the electrical work is flawless.' },
      { type: 'h2', text: 'Why shades drift' },
      { type: 'p', text: 'Different manufacturers use different polymer formulations and colourants. Two products both described as "white" from two suppliers will rarely match under the same light, and the difference becomes obvious when devices sit next to each other on the same wall.' },
      { type: 'p', text: 'The problem compounds over the life of a building as devices are replaced piecemeal from whatever is on the shelf.' },
      { type: 'h2', text: 'Sourcing the whole wall from one system' },
      { type: 'p', text: 'The cleanest solution is to specify every device on a project from one manufacturer\'s coordinated palette. Fahint produces GFCI outlets, USB outlets, standard receptacles, dimmers, lighting switches, smart switches and wallplates across the same finish range, so a whole installation reads as one system.' },
      { type: 'h2', text: 'The seven-finish palette' },
      { type: 'p', text: 'Our standard range covers White, Ivory, Light Almond, Black, Grey and Brown. White remains the core volume colour. Light Almond is heavily used in the renovation market, where it matches devices installed decades earlier. Black has grown substantially in high-end commercial and smart residential work.' },
      { type: 'h2', text: 'Glossy and matte' },
      { type: 'p', text: 'Beyond colour, wallplates are available in glossy and matte finishes. Matte hides fingerprints and surface imperfections and tends to suit contemporary interiors; glossy is easier to clean and remains standard on commercial specifications.' },
      { type: 'h2', text: 'Custom colour matching' },
      { type: 'p', text: 'For private-label programmes we offer custom colour matching on wall plates, covers and bases, with a standard customisation MOQ of 400 cartons. If you are building a branded product line, a proprietary finish is one of the more visible ways to differentiate it.' }
    ]
  }
];

export function findPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export const postCategories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];
