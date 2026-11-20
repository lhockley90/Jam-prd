// Turns a SoundCloud short link (on.soundcloud.com/...) into the full track URL,
// because SoundCloud's embedded player doesn't accept short links.
// Also checks whether the track allows embedding.
const ALLOWED = ['on.soundcloud.com', 'soundcloud.com', 'www.soundcloud.com', 'm.soundcloud.com'];

module.exports = async (req, res) => {
  let input;
  try {
    input = new URL(String(req.query.url || ''));
  } catch (_) {
    return res.status(400).json({ error: 'Send a SoundCloud link as ?url=' });
  }
  if (input.protocol !== 'https:' || !ALLOWED.includes(input.hostname)) {
    return res.status(400).json({ error: 'Only SoundCloud links are accepted' });
  }

  try {
    let current = input.toString();
    for (let hop = 0; hop < 5 && new URL(current).hostname === 'on.soundcloud.com'; hop++) {
      const r = await fetch(current, { redirect: 'manual', headers: { 'user-agent': 'Mozilla/5.0 (JAM PRD store)' } });
      const location = r.headers.get('location');
      if (location) {
        current = new URL(location, current).toString();
        continue;
      }
      // No redirect header: let fetch follow whatever it can and use where it lands.
      const followed = await fetch(current, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (JAM PRD store)' } });
      current = followed.url || current;
      break;
    }

    const clean = new URL(current);
    clean.search = '';
    clean.hash = '';
    if (clean.hostname === 'm.soundcloud.com' || clean.hostname === 'www.soundcloud.com') clean.hostname = 'soundcloud.com';

    let embeddable = null;
    let title = null;
    let oembedStatus = null;
    let widgetStatus = null;
    try {
      const o = await fetch('https://soundcloud.com/oembed?format=json&url=' + encodeURIComponent(clean.toString()), { headers: { 'user-agent': 'Mozilla/5.0 (JAM PRD store)' } });
      oembedStatus = o.status;
      if (o.ok) {
        embeddable = true;
        const data = await o.json();
        title = data.title || null;
      } else if (o.status === 403 || o.status === 404) {
        embeddable = false;
      }
    } catch (_) { /* leave as unknown */ }
    try {
      const w = await fetch('https://w.soundcloud.com/player/?url=' + encodeURIComponent(clean.toString()), { headers: { 'user-agent': 'Mozilla/5.0 (JAM PRD store)' } });
      widgetStatus = w.status;
    } catch (_) { /* leave as unknown */ }

    res.setHeader('Cache-Control', 's-maxage=3600');
    return res.status(200).json({ url: clean.toString(), embeddable, title, oembedStatus, widgetStatus });
  } catch (_) {
    return res.status(502).json({ error: 'Could not reach SoundCloud' });
  }
};
