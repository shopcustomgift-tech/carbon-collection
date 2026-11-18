# Carbon Collection

Online jewelry catalog. Prices on request; customers contact by WhatsApp, email or phone to arrange a viewing.

- `index.html` is the whole site (edit the pieces near the top of the script).
- `images/` holds the photos. Piece photos are named after the piece number (cc-001.jpg).
- Each piece has a `status` of Available, On hold or Sold.

- `pieces.js` holds the rest of the collection (CC-007 onward). Each piece has `cat` (Rings, Bangles, Bracelets, Earrings, Necklaces) and `stones`; edit names, stones or status there.
- Gemstone quick buttons (Rubies, Emeralds, Sapphires, Pearls) are set in `FEATURED` in index.html. Links like `#rubies` or `#rings` open the catalog pre-filtered.
- Each piece can also have `metal` ("Yellow Gold", "White Gold") and `style` (earrings: Studs, Hanging, Hoops; necklaces: Pendants, Chains & Tennis). Links: `#studs`, `#hanging`, `#hoops`, `#pendants`, `#yellow-gold`, `#white-gold`.
- `p/` has one small page per piece (e.g. `p/cc-012.html`). WhatsApp messages from the site include that link, so WhatsApp shows the piece's photo. After adding or editing pieces, run `node tools/make-piece-pages.js` to rebuild them. A link like `…/#cc-012` opens that piece's photo directly.
