# JAM PRD — Official Store

Static storefront for JAM PRD Drop 01. Hosted on Vercel; every push to `main` deploys.

## Files

- `index.html` — page structure
- `styles.css` — look and feel
- `app.js` — products, bag, music player, waveform. **Settings are at the top of this file.**
- `audio/` — put the track MP3 here

## Change the music

Open `app.js` and edit `CONFIG.track`:

- **MP3 (recommended):** add the file to `audio/` and set `mp3: 'audio/your-track.mp3'`.
  Plays on every phone and the waveform reacts to the actual music.
- **SoundCloud:** set `soundcloud` to the track link. Works without a file, but some phones (mostly iPhones)
  won't start a hidden SoundCloud player, so the site shows SoundCloud's own player for them to tap play.
  The waveform pulses at 140 BPM instead of following the music.

## Change products or prices

Edit the `PRODUCTS` list in `app.js` (name, price, description, prints).

## Still to do before taking money

1. **Checkout:** Stripe Checkout + a webhook that places the print order automatically
   (Printful API), then set `checkoutEndpoint: '/api/checkout'`.
2. **Print files:** full-size PNGs (4500 × 5400 px, transparent) for each design.
3. **Confirm the details on the site:** prices (£35 is a placeholder), the garment ("heavyweight cotton"
   must match the blank chosen in Printful), and the returns wording (UK online buyers can normally cancel
   within 14 days, so this is the default in the Help section).
4. **Contact email:** set `contactEmail` in `app.js`.
5. **Custom domain:** add it in Vercel → Project → Settings → Domains.
