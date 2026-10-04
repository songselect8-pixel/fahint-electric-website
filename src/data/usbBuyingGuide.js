// Buyer guide based on the primary references and verified FAHINT model data.
export const usbBuyingGuide = {
  "slug": "usb-wall-outlet-buying-guide",
  "title": "USB Wall Outlet Buying Guide: Ports, PD and Power",
  "excerpt": "Compare USB ports, PD output, shared power and AC ratings. Use FAHINT model examples and a purchasing checklist to prepare your USB wall outlet inquiry.",
  "date": "2026-10-04",
  "updated": "2026-10-04",
  "readMinutes": 6,
  "category": "Buying Guide",
  "cover": "assets/images/editorial-home/product-usb-optimized.webp",
  "coverAlt": "USB charging outlet beside a laptop on a desk in an illustrated interior",
  "coverCaption": "Illustrated USB charging setup. The scene is not a device-compatibility or charging-performance test.",
  "coverSource": "Existing FAHINT application illustration — editorial-home/product-usb-optimized.webp",
  "coverWidth": 1600,
  "coverHeight": 889,
  "sources": [
    {
      "label": "USB-IF — USB Type-C terminology and capabilities",
      "href": "https://www.usb.org/sites/default/files/usb_type-c_language_product_and_packaging_guidelines_20230320.pdf"
    },
    {
      "label": "Leviton — USB outlet comparison brochure (industry reference)",
      "href": "https://leviton.com/content/dam/leviton/residential/product_documents/brochure/USB_Brochure.pdf"
    },
    {
      "label": "Legrand — radiant 65W USB outlet specifications (industry reference)",
      "href": "https://www.legrand.us/wiring-devices/radiant-collection/radiant-65w-usb-outlet-type-c-15a-tamper-resistant-black/p/rd-r26usbpd65bk"
    },
    {
      "label": "Eaton — USB receptacle range (industry reference)",
      "href": "https://www.eaton.com/us/en-us/catalog/wiring-devices-and-connectivity/usb-receptacles.html"
    },
    {
      "label": "FAHINT — USB product-family documents",
      "href": "/resources?family=usb-outlets"
    }
  ],
  "body": [
    {
      "type": "p",
      "text": "To choose a USB wall outlet, start with the devices and cables it needs to serve. Then compare the port arrangement, published USB output and simultaneous-port limits. Check the AC receptacle rating separately, followed by physical fit, model documentation and sample requirements."
    },
    {
      "type": "p",
      "text": "This guide is for distributors, private-label buyers and project purchasers selecting wiring devices for North American markets. The examples use FAHINT’s published model data. Industry references explain the selection questions; they do not establish FAHINT performance or certification."
    },
    {
      "type": "h2",
      "text": "Start with the devices and cables"
    },
    {
      "type": "p",
      "text": "Write a short charging brief before choosing a wattage. Will users bring USB-A cables, USB-C cables or both? Is the requirement one device at a time, or two devices charging together? A bedside charging point and a desk used with a laptop can have different requirements, even when the wall outlets look similar."
    },
    {
      "type": "p",
      "text": "Record the intended device models and their charging requirements from the device documentation. For a laptop, include its required USB-C Power Delivery profile rather than assuming any USB-C outlet will replace its charger. Ask for the proposed outlet to be checked with the intended devices and suitably rated cables during sample review."
    },
    {
      "type": "h2",
      "text": "USB-A, USB-C and PD are different choices"
    },
    {
      "type": "p",
      "text": "USB-C describes the connector; USB Power Delivery, or PD, describes a power capability that must be supported separately. A USB-C connector does not by itself establish PD support. Check the stated charging profiles instead of choosing by the shape of the port.",
      "source": 0
    },
    {
      "type": "p",
      "text": "For example, FTR15C-3100 combines USB-A and USB-C with a published combined output of 3.1A at 5V DC. It is a conventional 5V model, not one of the PD models in the FAHINT range. FTR15-3100 offers dual USB-A with the same published combined output.",
      "links": [
        {
          "label": "Compare A + C configurations",
          "href": "/products/usb-outlets?ports=a-c"
        }
      ]
    },
    {
      "type": "p",
      "text": "The dual USB-C FTR15QC-DC20W, FTR15QC-DC36W and FTR15QC-DC65W publish different PD output profiles. These are alternatives to investigate against the charging brief, not fixed categories for phones, tablets and laptops. Match the required voltage and current, not only the largest wattage printed in the name."
    },
    {
      "type": "h2",
      "text": "Separate single-port and shared output"
    },
    {
      "type": "p",
      "text": "Read three figures separately: the maximum for one port, the combined output for the device, and the allocation when multiple ports are occupied. Leviton’s ordering table separates single-port and combined power, which is a useful way to structure any USB outlet comparison.",
      "source": 1
    },
    {
      "type": "p",
      "text": "On FTR15C-3100, the published individual limits are 5V DC / 2.4A for USB-A and 5V DC / 3.0A for USB-C. The published combined limit is 3.1A at 5V DC. Those individual limits do not mean both ports can deliver their respective maximum currents together."
    },
    {
      "type": "p",
      "text": "For the FAHINT PD examples below, simultaneous-port power sharing is not published in the current model references. Each USB-C port has an advertised maximum, but that does not establish what both ports deliver together. Ask for the shared-output specification and a sample check if two-device charging is part of the brief."
    },
    {
      "type": "p",
      "text": "A higher advertised maximum is not a promise that every connected device charges faster. Use the device’s required profiles, the cable specification and the proposed charging combination as the basis for approval.",
      "links": [
        {
          "label": "View 65W PD models",
          "href": "/products/usb-outlets?charging=pd-65w"
        }
      ]
    },
    {
      "type": "h2",
      "text": "Choose the AC rating separately"
    },
    {
      "type": "p",
      "text": "The 15A or 20A designation describes the AC receptacle, not the speed of USB charging. FTR15QC-DC65W has a 15A, 125V NEMA 5-15R receptacle; FTR20QC-DC65W has a 20A, 125V NEMA 5-20R receptacle. Both publish USB-C output up to 65W, so the higher AC rating alone does not mean higher USB output."
    },
    {
      "type": "p",
      "text": "F4P is a four-port USB charger without AC receptacle openings. Its published input is 125V / 60Hz and its combined USB output is 5V DC / 4.2A / 21W. Keep USB-only chargers separate from combination receptacles when preparing an assortment."
    },
    {
      "type": "p",
      "text": "Have a qualified professional confirm the circuit, location and installation requirements. Selecting a USB charging function does not by itself establish any required ground-fault protection, weather resistance or suitability for a particular location."
    },
    {
      "type": "h2",
      "text": "A practical FAHINT shortlist"
    },
    {
      "type": "p",
      "text": "Use these seven examples to narrow the configuration, then open the model page for its specifications and available documents. They are reference choices, not a ranking or a tested compatibility list."
    },
    {
      "type": "table",
      "caption": "FAHINT USB outlet shortlist",
      "columns": [
        "Model",
        "USB ports",
        "AC rating / input",
        "Published USB output"
      ],
      "rows": [
        [
          {
            "label": "FTR15-3100",
            "href": "/products/usb-outlets/ftr15-3100"
          },
          "Dual USB-A",
          "15A,125V NEMA 5-15R",
          "3.1A, 5V DC combined"
        ],
        [
          {
            "label": "FTR15C-3100",
            "href": "/products/usb-outlets/ftr15c-3100"
          },
          "USB-A + USB-C",
          "15A,125V NEMA 5-15R",
          "3.1A, 5V DC combined"
        ],
        [
          {
            "label": "FTR15QC-DC20W",
            "href": "/products/usb-outlets/ftr15qc-dc20w"
          },
          "Dual USB-C",
          "15A,125V NEMA 5-15R",
          "USB-C up to 20W per port*"
        ],
        [
          {
            "label": "FTR15QC-DC36W",
            "href": "/products/usb-outlets/ftr15qc-dc36w"
          },
          "Dual USB-C",
          "15A,125V NEMA 5-15R",
          "USB-C up to 36W per port*"
        ],
        [
          {
            "label": "FTR15QC-DC65W",
            "href": "/products/usb-outlets/ftr15qc-dc65w"
          },
          "Dual USB-C",
          "15A,125V NEMA 5-15R",
          "USB-C up to 65W per port*"
        ],
        [
          {
            "label": "FTR20QC-DC65W",
            "href": "/products/usb-outlets/ftr20qc-dc65w"
          },
          "Dual USB-C",
          "20A,125V NEMA 5-20R",
          "USB-C up to 65W per port*"
        ],
        [
          {
            "label": "F4P",
            "href": "/products/usb-outlets/f4p"
          },
          "4 × USB-A",
          "125V 60Hz input; no AC receptacle",
          "5V DC · 4.2A · 21W combined"
        ]
      ]
    },
    {
      "type": "p",
      "text": "*PD figures are individual-port maxima from the published model references. Do not add the two port ratings together. Confirm the available output when both ports are used before specifying a multi-device charging requirement."
    },
    {
      "type": "p",
      "text": "On the USB models page, filter by ports, AC rating and charging output. Select two or three models for comparison, then add suitable models to your inquiry list. Record quantities and finishes there so the quotation request reflects the actual shortlist.",
      "links": [
        {
          "label": "Browse USB outlet models",
          "href": "/products/usb-outlets"
        }
      ]
    },
    {
      "type": "h2",
      "text": "Check fit, finish and documentation"
    },
    {
      "type": "p",
      "text": "Physical fit deserves its own check. Eaton highlights device depth in its USB range information. Include depth and wiring space in the review rather than treating the face dimensions as the whole device.",
      "source": 3
    },
    {
      "type": "p",
      "text": "Legrand’s 65W product page lists dimensions and wallplate requirements alongside electrical specifications. Apply that same separation when preparing your shortlist: the charging specification and the installation fit each need to be checked.",
      "source": 2
    },
    {
      "type": "p",
      "text": "Use the drawing for the exact FAHINT model, not a similar-looking device. Some models do not yet have a published original dimension drawing. Request the missing information rather than inferring it from another model, and confirm whether the intended wallplate is included or ordered separately."
    },
    {
      "type": "p",
      "text": "Approve the device finish and matching plate together. For branded packaging, confirm the authorized markings, artwork and pack format against the sample. Check the exact model designation and conditions in the relevant certificate, and confirm current status before ordering. ISO 9001 concerns the quality management system; it is not a product listing.",
      "links": [
        {
          "label": "Review USB product documents",
          "href": "/resources?family=usb-outlets"
        }
      ]
    },
    {
      "type": "h2",
      "text": "Prepare a useful quotation request"
    },
    {
      "type": "p",
      "text": "A clear brief gives the supplier enough information to resolve open questions before you approve an order. Include:"
    },
    {
      "type": "list",
      "label": "USB outlet quotation checklist",
      "items": [
        "Full model numbers and quantities for each configuration, rather than a request for “USB outlets” alone.",
        "Intended devices and cables, required output profiles, and whether two or more devices must charge at the same time.",
        "AC receptacle rating and configuration, or a clear statement that a USB-only charger is required.",
        "Device finish, wallplate style, physical-fit requirements and any missing drawings you need reviewed.",
        "Destination market and the model-specific documents or sample checks required by your project.",
        "Packaging, authorized brand markings and quantities by finish or pack format.",
        "Requested samples and delivery timing, with unresolved power-sharing or compatibility questions called out."
      ]
    },
    {
      "type": "p",
      "text": "Sample arrangements, minimum quantities, customization options and lead times are confirmed in the quotation. The guide helps prepare the request; the agreed model documents and approved sample remain the basis for the order."
    }
  ]
};
