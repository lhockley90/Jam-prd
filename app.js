(() => {
  'use strict';

  /* ================= SETTINGS: edit these ================= */
  const CONFIG = {
    track: {
      // Best option: put the MP3 in /audio and set its path here, e.g. 'audio/crash-out.mp3'.
      // An MP3 plays on every phone and drives the live waveform.
      mp3: '',
      // Used when there is no MP3. Plays through SoundCloud's own player.
      // HOT BOY (https://soundcloud.com/jamprd/jam-p-r-d-hot-boy-wav) has embedding switched off on SoundCloud,
      // so for now this plays his SoundCloud profile. Switch back once embedding is on, or use the MP3.
      soundcloud: 'https://soundcloud.com/jamprd',
      // Leave blank to use the title from SoundCloud.
      title: ''
    },
    soundcloudProfile: 'https://soundcloud.com/jamprd', // adds a "Listen on SoundCloud" link
    contactEmail: '',      // adds a Contact link to the footer
    checkoutEndpoint: ''   // becomes '/api/checkout' once Stripe and print-on-demand are connected
  };

  const SIZES = ['S', 'M', 'L', 'XL', '2XL'];
  const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

  /* ================= PRODUCTS ================= */
  const TEE = 'M145 18 C165 40 235 40 255 18 L330 40 C350 48 362 60 370 76 L394 128 L338 160 L318 122 L318 420 C318 426 314 430 308 430 L92 430 C86 430 82 426 82 420 L82 122 L62 160 L6 128 L30 76 C38 60 50 48 70 40 Z';
  const PIRATA = "'Pirata One', serif";
  const ANTON = 'Anton, Impact, sans-serif';
  const WHITE = '#F4F4F4';

  const WAVE_BACK = '92,147.0 95,148.3 98,148.2 101,146.5 104,145.4 108,146.9 112,142.5 115,143.0 118,162.6 121,160.3 125,136.7 128,164.0 131,134.0 134,163.7 138,164.2 141,139.1 145,161.5 149,175.2 152,121.5 155,161.3 158,130.8 162,160.0 165,167.2 169,129.6 173,128.4 176,178.2 179,170.0 181,127.6 185,126.3 189,136.5 192,186.9 195,173.3 199,184.5 202,189.5 206,135.6 209,120.8 213,176.8 216,163.7 219,131.7 223,126.7 226,182.3 230,169.1 233,139.9 237,131.0 241,140.8 244,169.9 248,141.2 251,160.1 255,168.4 258,172.3 262,138.5 264,161.4 268,133.8 271,169.0 273,137.9 277,142.1 281,156.6 285,143.4 288,159.1 292,143.6 296,144.0 299,146.3 303,155.1 306,154.6';
  const WAVE_CHEST = '222,109.5 224,109.3 226,110.9 228,110.7 230,111.3 232,109.1 234,108.1 236,108.9 238,111.1 240,113.1 242,114.0 245,106.9 247,108.3 249,112.4 251,114.5 253,112.8 255,107.2 257,106.5 260,105.8 262,108.0 264,111.6 266,111.1 268,112.5 270,110.7 272,108.3 274,111.2 276,110.5 278,111.0 280,109.6';
  const BARBS = 'M266.6 178.5 L272.5 188.8 M264.4 186.6 L274.7 180.7 M250.9 210.0 L250.9 221.9 M245.0 215.9 L256.9 215.9 M221.6 229.4 L215.7 239.7 M213.5 231.6 L223.8 237.5 M186.5 231.6 L176.2 237.5 M178.4 229.4 L184.3 239.7 M155.0 215.9 L143.1 215.9 M149.1 210.0 L149.1 221.9 M135.6 186.6 L125.3 180.7 M133.4 178.5 L127.5 188.8 M133.4 151.5 L127.5 141.2 M135.6 143.4 L125.3 149.3 M149.1 120.0 L149.1 108.1 M155.0 114.1 L143.1 114.1 M245.0 114.1 L256.9 114.1 M250.9 120.0 L250.9 108.1 M264.4 143.4 L274.7 149.3 M266.6 151.5 L272.5 141.2';

  const PRODUCTS = [
    {
      id: 'crash-out', no: '01', name: 'Crash Out Tee', price: 35, accent: '#8B7CFF', tag: 'BACK PRINT', hero: 'back',
      desc: 'Chrome JAM PRD across the back, cut through by a jagged waveform, with CRASH OUT underneath. Small chest logo on the front.',
      placement: { front: 'Small chest logo', back: 'Full back print' },
      prints: {
        front: (u, a) => `
          <text x="251" y="102" font-family="${PIRATA}" font-size="18" fill="${WHITE}" text-anchor="middle">JAM PRD</text>
          <polyline points="${WAVE_CHEST}" fill="none" stroke="${a}" stroke-width="1.2"/>`,
        back: (u, a) => `
          <text x="200" y="168" font-family="${PIRATA}" font-size="58" fill="url(#${u}-chrome)" stroke="#000" stroke-width="1" paint-order="stroke" text-anchor="middle">JAM PRD</text>
          <polyline points="${WAVE_BACK}" fill="none" stroke="${a}" stroke-width="2.2" opacity="0.95"/>
          <text x="203" y="230" font-family="${ANTON}" font-size="32" letter-spacing="7" fill="${WHITE}" text-anchor="middle">CRASH OUT</text>
          <text x="202" y="258" font-family="${ANTON}" font-size="11" letter-spacing="4" fill="${a}" text-anchor="middle">DONT GET ME MAD</text>`
      }
    },
    {
      id: 'u-wot-blud', no: '02', name: 'U Wot Blud Tee', price: 35, accent: '#E1251B', tag: 'FRONT PRINT', hero: 'front',
      desc: 'The question, asked loud. Big sticker-style print on the front, JAM PRD under the collar on the back.',
      placement: { front: 'Full front print', back: 'Neck print' },
      prints: {
        front: (u, a) => `
          <g transform="rotate(-6 200 190)">
            <text x="200" y="168" font-family="${ANTON}" font-size="60" fill="${a}" stroke="${WHITE}" stroke-width="7" stroke-linejoin="round" paint-order="stroke" text-anchor="middle">U WOT</text>
            <text x="200" y="242" font-family="${ANTON}" font-size="76" fill="${a}" stroke="${WHITE}" stroke-width="7" stroke-linejoin="round" paint-order="stroke" text-anchor="middle">BLUD?</text>
            <text x="200" y="278" font-family="${PIRATA}" font-size="22" fill="${WHITE}" text-anchor="middle">JAM PRD</text>
          </g>`,
        back: (u, a) => `
          <text x="200" y="66" font-family="${PIRATA}" font-size="18" fill="${WHITE}" text-anchor="middle">JAM PRD</text>
          <text x="201" y="79" font-family="${ANTON}" font-size="7" letter-spacing="2" fill="${a}" text-anchor="middle">U WOT BLUD</text>`
      }
    },
    {
      id: 'pl8s-only', no: '03', name: 'Pl8s Only Tee', price: 35, accent: '#E1251B', tag: 'BACK PRINT', hero: 'back',
      desc: 'A dubplate on the back with PL8S ONLY running round the edge and NON-UPLOADED underneath. Record badge on the chest.',
      placement: { front: 'Chest badge', back: 'Full back print' },
      prints: {
        front: (u, a) => `
          <circle cx="234" cy="102" r="13" fill="none" stroke="${WHITE}" stroke-width="1.4"/>
          <circle cx="234" cy="102" r="9" fill="none" stroke="${WHITE}" stroke-opacity="0.4" stroke-width="0.6"/>
          <circle cx="234" cy="102" r="4.6" fill="${a}"/>
          <circle cx="234" cy="102" r="1" fill="#0d0d10"/>
          <text x="252" y="100" font-family="${ANTON}" font-size="10" letter-spacing="1.5" fill="${WHITE}">PL8S ONLY</text>
          <text x="252" y="112" font-family="${PIRATA}" font-size="10" fill="${WHITE}">JAM PRD</text>`,
        back: (u, a) => `
          <path id="${u}-arc" d="M108 180 A92 92 0 1 1 292 180 A92 92 0 1 1 108 180" fill="none"/>
          <circle cx="200" cy="180" r="80" fill="#000" stroke="${WHITE}" stroke-width="2"/>
          ${[74, 66, 58, 50, 42].map(r => `<circle cx="200" cy="180" r="${r}" fill="none" stroke="${WHITE}" stroke-opacity="0.28" stroke-width="0.7"/>`).join('')}
          <path d="M139.4 145 A70 70 0 0 1 176.1 114.2" fill="none" stroke="${WHITE}" stroke-opacity="0.4" stroke-width="3" stroke-linecap="round"/>
          <path d="M260.6 215 A70 70 0 0 1 223.9 245.8" fill="none" stroke="${WHITE}" stroke-opacity="0.25" stroke-width="3" stroke-linecap="round"/>
          <circle cx="200" cy="180" r="30" fill="${a}"/>
          <text x="200" y="175" font-family="${PIRATA}" font-size="14" fill="${WHITE}" text-anchor="middle">JAM PRD</text>
          <circle cx="200" cy="180" r="2.5" fill="#0d0d10"/>
          <text x="200" y="193" font-family="${ANTON}" font-size="5" letter-spacing="1" fill="${WHITE}" text-anchor="middle">NON-UPLOADED</text>
          <text font-family="${ANTON}" font-size="12" fill="${WHITE}"><textPath href="#${u}-arc" textLength="570" lengthAdjust="spacing">PL8S ONLY • PL8S ONLY • PL8S ONLY • PL8S ONLY • PL8S ONLY •</textPath></text>
          <text x="203" y="318" font-family="${ANTON}" font-size="22" letter-spacing="6" fill="${WHITE}" text-anchor="middle">NON-UPLOADED</text>`
      }
    },
    {
      id: 'worldwide', no: '04', name: 'Worldwide Tee', price: 35, accent: '#E1251B', tag: 'FRONT PRINT', hero: 'front',
      desc: 'A crowned globe wrapped in barbed wire, with chrome JAM PRD across it. JAM PRD Worldwide across the upper back.',
      placement: { front: 'Full front print', back: 'Upper back print' },
      prints: {
        front: (u, a) => `
          <circle cx="200" cy="165" r="62" fill="none" stroke="${WHITE}" stroke-opacity="0.9" stroke-width="1.8"/>
          <ellipse cx="200" cy="165" rx="22" ry="62" fill="none" stroke="${WHITE}" stroke-opacity="0.5"/>
          <ellipse cx="200" cy="165" rx="44" ry="62" fill="none" stroke="${WHITE}" stroke-opacity="0.5"/>
          <path d="M200 103 L200 227 M138 165 L262 165 M143.3 140 L256.7 140 M143.3 190 L256.7 190 M160.8 117 L239.2 117 M160.8 213 L239.2 213" fill="none" stroke="${WHITE}" stroke-opacity="0.5"/>
          <circle cx="200" cy="165" r="72" fill="none" stroke="${WHITE}" stroke-width="1.4"/>
          <path d="${BARBS}" fill="none" stroke="${WHITE}" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M178 91 L174 68 L188 78 L200 60 L212 78 L226 68 L222 91 Z" fill="url(#${u}-chrome)" stroke="#000"/>
          <circle cx="174" cy="67" r="2.4" fill="${a}"/><circle cx="200" cy="59" r="2.6" fill="${a}"/><circle cx="226" cy="67" r="2.4" fill="${a}"/>
          <text x="200" y="182" font-family="${PIRATA}" font-size="48" fill="url(#${u}-chrome)" stroke="#000" stroke-width="4" stroke-linejoin="round" paint-order="stroke" text-anchor="middle">JAM PRD</text>
          <text x="204" y="272" font-family="${ANTON}" font-size="20" letter-spacing="8" fill="${WHITE}" text-anchor="middle">WORLDWIDE</text>`,
        back: (u, a) => `
          <text x="200" y="104" font-family="${PIRATA}" font-size="40" fill="url(#${u}-chrome)" stroke="#000" stroke-width="3" stroke-linejoin="round" paint-order="stroke" text-anchor="middle">JAM PRD</text>
          <text x="204" y="128" font-family="${ANTON}" font-size="13" letter-spacing="8" fill="${a}" text-anchor="middle">WORLDWIDE</text>
          <path d="M130 150 L270 150" fill="none" stroke="${WHITE}" stroke-width="1.4"/>
          <path d="M152 147 L158 153 M152 153 L158 147 M175 147 L181 153 M175 153 L181 147 M197 147 L203 153 M197 153 L203 147 M219 147 L225 153 M219 153 L225 147 M242 147 L248 153 M242 153 L248 147" fill="none" stroke="${WHITE}" stroke-width="1.4" stroke-linecap="round"/>`
      }
    }
  ];

  let uidCounter = 0;
  function teeSVG(product, side, label) {
    const u = `t${++uidCounter}`;
    const collar = side === 'front' ? 'M141 17 C163 46 237 46 259 17' : 'M141 17 C168 30 232 30 259 17';
    const shade = side === 'front'
      ? '<stop offset="0" stop-color="#fff" stop-opacity="0.07"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.25"/>'
      : '<stop offset="0" stop-color="#000" stop-opacity="0.25"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0.07"/>';
    const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
    return `<svg viewBox="0 0 400 440" ${a11y}>
      <defs>
        <linearGradient id="${u}-shade" x1="0" y1="0" x2="1" y2="0">${shade}</linearGradient>
        <linearGradient id="${u}-chrome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="0.42" stop-color="#d6d6d6"/><stop offset="0.5" stop-color="#6b6b6b"/><stop offset="0.6" stop-color="#c6c6c6"/><stop offset="1" stop-color="#f4f4f4"/></linearGradient>
      </defs>
      <path d="${TEE}" fill="#0d0d10" stroke="rgba(255,255,255,0.16)" stroke-width="1.2"/>
      <path d="${TEE}" fill="url(#${u}-shade)"/>
      <path d="${collar}" fill="none" stroke="#000" stroke-opacity="0.7" stroke-width="5"/>
      ${product.prints[side](u, product.accent)}
    </svg>`;
  }

  const $ = (s, el = document) => el.querySelector(s);
  const byId = id => PRODUCTS.find(p => p.id === id);

  /* ================= SHOP GRID ================= */
  const grid = $('#product-grid');
  grid.innerHTML = PRODUCTS.map(p => `
    <button class="card" type="button" data-id="${p.id}" aria-label="${p.name}, ${money.format(p.price)}. View details">
      <span class="stage">
        <span class="card-tags mono"><span>${p.no}</span><span>${p.tag}</span></span>
        <span class="tee tee-main">${teeSVG(p, p.hero)}</span>
        <span class="tee tee-alt">${teeSVG(p, p.hero === 'back' ? 'front' : 'back')}</span>
      </span>
      <span class="card-info">
        <span class="card-name">${p.name}</span>
        <span class="card-price mono">${money.format(p.price)}</span>
        <span class="card-sub">Heavyweight tee · Black</span>
      </span>
    </button>`).join('');
  grid.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (card) openSheet(card.dataset.id);
  });

  /* ================= PRODUCT SHEET ================= */
  const sheet = $('#sheet');
  const sheetInner = $('#sheet-inner');
  let current = null;

  function openSheet(id) {
    const p = byId(id);
    if (!p) return;
    current = { id, size: null, qty: 1 };
    sheetInner.innerHTML = `
      <div class="sheet-grid">
        <div class="stage">
          <div class="tee${p.hero === 'front' ? '' : ' is-off'}" data-view="front">${teeSVG(p, 'front', `${p.name}, front`)}</div>
          <div class="tee${p.hero === 'back' ? '' : ' is-off'}" data-view="back">${teeSVG(p, 'back', `${p.name}, back`)}</div>
          <div class="view-toggle" role="group" aria-label="Choose view">
            <button class="mono" type="button" data-view-btn="front" aria-pressed="${p.hero === 'front'}">Front</button>
            <button class="mono" type="button" data-view-btn="back" aria-pressed="${p.hero === 'back'}">Back</button>
          </div>
        </div>
        <div class="sheet-info">
          <button class="icon-btn sheet-close" type="button" data-close aria-label="Close">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>
          </button>
          <div>
            <p class="mono muted" style="margin:0 0 10px">${p.no} · DROP 01</p>
            <h2 class="sheet-title" id="sheet-title">${p.name}</h2>
          </div>
          <p class="mono sheet-price" style="margin:0">${money.format(p.price)}</p>
          <p class="sheet-desc">${p.desc}</p>
          <fieldset class="field">
            <legend class="mono muted">Size</legend>
            <div class="sizes">${SIZES.map(s => `<button class="size" type="button" data-size="${s}" aria-pressed="false">${s}</button>`).join('')}</div>
            <p class="size-hint" id="size-hint" role="status"></p>
          </fieldset>
          <div class="buy-row">
            <div class="qty">
              <button type="button" data-qty="-1" aria-label="One fewer">−</button>
              <output id="qty-out" aria-live="polite">1</output>
              <button type="button" data-qty="1" aria-label="One more">+</button>
            </div>
            <button class="btn btn-primary" id="add-btn" type="button">Add to bag</button>
          </div>
          <ul class="spec">
            <li><span>Garment</span><span>Heavyweight cotton tee, black</span></li>
            <li><span>Front</span><span>${p.placement.front}</span></li>
            <li><span>Back</span><span>${p.placement.back}</span></li>
            <li><span>Made</span><span>Printed when you order</span></li>
            <li><span>Ships</span><span>Worldwide, with tracking</span></li>
          </ul>
        </div>
      </div>`;
    sheet.showModal();
  }

  sheet.addEventListener('click', e => {
    if (e.target === sheet || e.target.closest('[data-close]')) { sheet.close(); return; }
    const viewBtn = e.target.closest('[data-view-btn]');
    if (viewBtn) {
      const view = viewBtn.dataset.viewBtn;
      sheet.querySelectorAll('[data-view-btn]').forEach(b => b.setAttribute('aria-pressed', String(b === viewBtn)));
      sheet.querySelectorAll('.tee[data-view]').forEach(t => t.classList.toggle('is-off', t.dataset.view !== view));
      return;
    }
    const sizeBtn = e.target.closest('[data-size]');
    if (sizeBtn) {
      current.size = sizeBtn.dataset.size;
      sheet.querySelectorAll('[data-size]').forEach(b => b.setAttribute('aria-pressed', String(b === sizeBtn)));
      $('#size-hint').textContent = '';
      return;
    }
    const qtyBtn = e.target.closest('[data-qty]');
    if (qtyBtn) {
      current.qty = Math.min(10, Math.max(1, current.qty + Number(qtyBtn.dataset.qty)));
      $('#qty-out').textContent = current.qty;
      return;
    }
    if (e.target.closest('#add-btn')) {
      if (!current.size) { $('#size-hint').textContent = 'Pick a size first.'; return; }
      addToBag(current.id, current.size, current.qty);
      sheet.close();
      toast(`Added to bag · ${byId(current.id).name}, ${current.size}`);
    }
  });

  /* ================= BAG ================= */
  const BAG_KEY = 'jamprd-bag';
  let bag = [];
  try { bag = JSON.parse(localStorage.getItem(BAG_KEY)) || []; } catch (_) { bag = []; }
  bag = bag.filter(i => byId(i.id));

  function saveBag() {
    try { localStorage.setItem(BAG_KEY, JSON.stringify(bag)); } catch (_) { /* storage blocked: bag lasts for this visit */ }
    renderBag();
  }
  function addToBag(id, size, qty) {
    const line = bag.find(i => i.id === id && i.size === size);
    if (line) line.qty = Math.min(10, line.qty + qty);
    else bag.push({ id, size, qty });
    saveBag();
  }

  const drawer = $('#drawer');
  function renderBag() {
    const count = bag.reduce((n, i) => n + i.qty, 0);
    $('#bag-count').textContent = count;
    $('#bag-open').setAttribute('aria-label', `Open bag, ${count} item${count === 1 ? '' : 's'}`);
    const items = $('#drawer-items');
    if (!bag.length) {
      items.innerHTML = '<p class="empty">Your bag is empty.</p>';
    } else {
      items.innerHTML = bag.map((i, idx) => {
        const p = byId(i.id);
        return `<div class="line-item">
          <div class="line-thumb stage"><div class="tee">${teeSVG(p, p.hero)}</div></div>
          <div>
            <div class="line-name">${p.name}</div>
            <div class="line-meta mono">Size ${i.size} · Qty ${i.qty}</div>
          </div>
          <div class="line-actions">
            <span class="mono">${money.format(p.price * i.qty)}</span>
            <button class="remove" type="button" data-remove="${idx}">Remove</button>
          </div>
        </div>`;
      }).join('');
    }
    const subtotal = bag.reduce((n, i) => n + byId(i.id).price * i.qty, 0);
    $('#subtotal').textContent = money.format(subtotal);
    $('#checkout-btn').disabled = !bag.length;
    $('#checkout-note').textContent = '';
  }

  $('#bag-open').addEventListener('click', () => drawer.showModal());
  $('#drawer-close').addEventListener('click', () => drawer.close());
  drawer.addEventListener('click', e => {
    if (e.target === drawer) { drawer.close(); return; }
    const rm = e.target.closest('[data-remove]');
    if (rm) { bag.splice(Number(rm.dataset.remove), 1); saveBag(); }
  });

  $('#checkout-btn').addEventListener('click', async () => {
    const note = $('#checkout-note');
    if (!CONFIG.checkoutEndpoint) {
      note.textContent = "Payments aren't switched on yet. This is a preview of the store.";
      return;
    }
    const btn = $('#checkout-btn');
    btn.disabled = true;
    note.textContent = 'Taking you to secure checkout…';
    try {
      const res = await fetch(CONFIG.checkoutEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: bag })
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.url;
    } catch (err) {
      note.textContent = "Checkout didn't open. Please try again in a moment.";
      btn.disabled = false;
    }
  });

  renderBag();

  /* ================= TOAST ================= */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ================= AUDIO ================= */
  const audioEl = $('#audio');
  const state = { mode: 'none', ready: false, playing: false, wantPlay: false, duration: 0, position: 0, seeking: false };
  let actx = null, analyser = null, freqData = null, timeData = null;
  let widget = null, scFrame = null, scFailTimer = null, scCheckTimer = null, scUnlocked = false;
  const dock = $('#sc-dock');
  // iPhones and iPads won't start a hidden SoundCloud player until someone taps play on it once.
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  const soundToggle = $('#sound-toggle');
  const playBtn = $('#play-btn');
  const seek = $('#seek');
  const heroListen = $('#hero-listen');

  function fmt(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  }
  function setTitle(title) {
    $('#player-title').textContent = title;
    $('#np-title').textContent = title;
  }
  function setStatus(s) { $('#player-status').textContent = s; }
  function setControls(on) {
    [soundToggle, playBtn, seek, heroListen].forEach(el => { el.disabled = !on; });
  }
  function showSoundcloudLink(url) {
    const link = $('#soundcloud-link');
    if (!url) return;
    link.href = url;
    link.hidden = false;
  }

  function updateProgress() {
    const frac = state.duration ? state.position / state.duration : 0;
    $('#np-fill').style.width = `${(frac * 100).toFixed(2)}%`;
    $('#np-time').textContent = fmt(state.position);
    $('#time').textContent = `${fmt(state.position)} / ${fmt(state.duration)}`;
    if (!state.seeking) seek.value = Math.round(frac * 1000);
  }

  function onPlay() {
    state.playing = true;
    clearTimeout(scCheckTimer);
    document.body.classList.add('is-playing');
    soundToggle.setAttribute('aria-pressed', 'true');
    $('#sound-label').textContent = 'SOUND ON';
    playBtn.setAttribute('aria-label', 'Pause');
    heroListen.textContent = 'Pause the track';
    setStatus('PLAYING');
    if (state.mode === 'sc') {
      scUnlocked = true;
      if (dock.classList.contains('is-open')) setTimeout(() => dock.classList.remove('is-open'), 1500);
    }
  }
  function onPause() {
    state.playing = false;
    document.body.classList.remove('is-playing');
    soundToggle.setAttribute('aria-pressed', 'false');
    $('#sound-label').textContent = 'SOUND OFF';
    playBtn.setAttribute('aria-label', 'Play');
    heroListen.textContent = 'Play the track';
    if (state.ready) setStatus('PAUSED');
  }

  function ensureAnalyser() {
    if (actx || state.mode !== 'mp3') return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      actx = new Ctx();
      const src = actx.createMediaElementSource(audioEl);
      analyser = actx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;
      freqData = new Uint8Array(analyser.frequencyBinCount);
      timeData = new Uint8Array(analyser.fftSize);
      src.connect(analyser);
      analyser.connect(actx.destination);
    } catch (_) { actx = null; analyser = null; }
  }

  function play() {
    if (!state.ready) { state.wantPlay = true; return; }
    if (state.mode === 'mp3') {
      ensureAnalyser();
      if (actx && actx.state === 'suspended') actx.resume();
      audioEl.play().catch(() => toast('Tap play to start the track'));
    } else if (state.mode === 'sc' && widget) {
      if (isIOS && !scUnlocked) { revealSoundcloud(); return; }
      widget.play();
      // Some browsers block a hidden player. If it hasn't started, show SoundCloud's own player to tap.
      clearTimeout(scCheckTimer);
      scCheckTimer = setTimeout(() => { if (!state.playing) revealSoundcloud(); }, 2500);
    }
  }
  function pause() {
    state.wantPlay = false;
    if (state.mode === 'mp3') audioEl.pause();
    else if (state.mode === 'sc' && widget) widget.pause();
  }
  function toggle() { state.playing ? pause() : play(); }

  function revealSoundcloud() {
    if (!scFrame) return;
    dock.classList.add('is-open');
    setStatus('TAP PLAY ON THE PLAYER');
  }
  $('#sc-dock-close').addEventListener('click', () => dock.classList.remove('is-open'));

  function setupMp3() {
    state.mode = 'mp3';
    audioEl.src = CONFIG.track.mp3;
    audioEl.loop = true;
    audioEl.preload = 'metadata';
    setTitle(CONFIG.track.title || 'JAM PRD');
    audioEl.addEventListener('loadedmetadata', () => { state.duration = audioEl.duration; updateProgress(); });
    audioEl.addEventListener('timeupdate', () => { state.position = audioEl.currentTime; state.duration = audioEl.duration || state.duration; updateProgress(); });
    audioEl.addEventListener('play', onPlay);
    audioEl.addEventListener('pause', onPause);
    audioEl.addEventListener('error', () => { state.ready = false; setControls(false); setStatus('TRACK UNAVAILABLE'); });
    state.ready = true;
    setControls(true);
    setStatus('READY');
  }

  function soundcloudFailed(reason) {
    clearTimeout(scFailTimer);
    if (state.ready) return;
    state.mode = 'none';
    setControls(false);
    dock.classList.remove('is-open');
    setStatus(reason === 'embed' ? 'EMBEDDING TURNED OFF' : 'TRACK UNAVAILABLE');
    setTitle('Listen on SoundCloud');
    showSoundcloudLink(CONFIG.soundcloudProfile || CONFIG.track.soundcloud);
    $('#gate-note').textContent = 'Best with headphones';
  }

  // SoundCloud's player doesn't accept short links (on.soundcloud.com), so the server turns them into the full address.
  async function resolveSoundcloud(url) {
    try {
      if (new URL(url).hostname !== 'on.soundcloud.com') return { url };
      const r = await fetch('/api/sc-resolve?url=' + encodeURIComponent(url));
      if (!r.ok) throw new Error('resolve failed');
      return await r.json();
    } catch (_) {
      return { url };
    }
  }

  async function setupSoundcloud() {
    state.mode = 'sc';
    setControls(false);
    setStatus('LOADING');
    setTitle(CONFIG.track.title || 'Loading track…');
    const info = await resolveSoundcloud(CONFIG.track.soundcloud);
    scFrame = document.createElement('iframe');
    scFrame.className = 'sc-frame';
    scFrame.title = 'SoundCloud player';
    scFrame.allow = 'autoplay';
    scFrame.src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(info.url) +
      '&color=%23d8201a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false';
    $('#sc-frame-slot').appendChild(scFrame);

    const s = document.createElement('script');
    s.src = 'https://w.soundcloud.com/player/api.js';
    s.onload = initWidget;
    s.onerror = soundcloudFailed;
    document.head.appendChild(s);
    scFailTimer = setTimeout(soundcloudFailed, 15000);
  }

  function initWidget() {
    if (!window.SC || !window.SC.Widget) { soundcloudFailed(); return; }
    widget = window.SC.Widget(scFrame);
    const E = window.SC.Widget.Events;
    widget.bind(E.READY, () => {
      clearTimeout(scFailTimer);
      state.ready = true;
      setControls(true);
      setStatus('READY');
      widget.getDuration(d => { state.duration = d / 1000; updateProgress(); });
      widget.getCurrentSound(sound => {
        if (!sound) return;
        if (!CONFIG.track.title && sound.title) setTitle(sound.title);
        showSoundcloudLink(CONFIG.soundcloudProfile || sound.permalink_url);
      });
      if (state.wantPlay) play();
    });
    widget.bind(E.PLAY, onPlay);
    widget.bind(E.PAUSE, onPause);
    widget.bind(E.FINISH, () => {
      widget.getSounds(list => { if (!list || list.length <= 1) { widget.seekTo(0); widget.play(); } });
    });
    widget.bind(E.PLAY, () => {
      widget.getCurrentSound(sound => { if (sound && sound.title && !CONFIG.track.title) setTitle(sound.title); });
      widget.getDuration(d => { state.duration = d / 1000; });
    });
    widget.bind(E.PLAY_PROGRESS, e => {
      state.position = e.currentPosition / 1000;
      if (!state.duration && e.relativePosition) state.duration = state.position / e.relativePosition;
      updateProgress();
    });
    widget.bind(E.ERROR, soundcloudFailed);
  }

  if (CONFIG.track.mp3) setupMp3();
  else if (CONFIG.track.soundcloud) setupSoundcloud();
  else { setControls(false); setStatus('NO TRACK LOADED'); setTitle('Track coming soon'); }

  soundToggle.addEventListener('click', toggle);
  playBtn.addEventListener('click', toggle);
  heroListen.addEventListener('click', toggle);
  seek.addEventListener('input', () => {
    state.seeking = true;
    const t = (seek.value / 1000) * (state.duration || 0);
    if (state.mode === 'mp3') audioEl.currentTime = t;
    else if (state.mode === 'sc' && widget) widget.seekTo(t * 1000);
  });
  seek.addEventListener('change', () => { state.seeking = false; });

  if (CONFIG.soundcloudProfile) showSoundcloudLink(CONFIG.soundcloudProfile);
  if (CONFIG.contactEmail) {
    const c = $('#contact-link');
    c.href = `mailto:${CONFIG.contactEmail}`;
    c.textContent = CONFIG.contactEmail.toUpperCase();
    c.hidden = false;
  }
  $('#year').textContent = new Date().getFullYear();

  /* ================= ENTER GATE ================= */
  const gate = $('#gate');
  let entered = false;
  try { entered = sessionStorage.getItem('jamprd-entered') === '1'; } catch (_) { /* ignore */ }

  function closeGate(withSound) {
    gate.classList.add('is-hidden');
    document.body.classList.remove('gate-open');
    try { sessionStorage.setItem('jamprd-entered', '1'); } catch (_) { /* ignore */ }
    if (withSound) play();
  }
  if (entered || state.mode === 'none') {
    gate.classList.add('is-hidden');
    if (!entered && state.mode === 'none') gate.remove();
  } else {
    document.body.classList.add('gate-open');
    $('#enter-sound').focus();
  }
  $('#enter-sound').addEventListener('click', () => closeGate(true));
  $('#enter-muted').addEventListener('click', () => closeGate(false));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !gate.classList.contains('is-hidden')) closeGate(false);
  });

  /* ================= WAVEFORM ================= */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvases = [
    { el: $('#viz'), bar: 6, barW: 3, amp: 0.46, alpha: 0.5 },
    { el: $('#player-viz'), bar: 5, barW: 3, amp: 0.48, alpha: 0.85 }
  ].filter(c => c.el);

  function sizeCanvases() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvases.forEach(c => {
      const r = c.el.getBoundingClientRect();
      c.w = r.width; c.h = r.height;
      c.el.width = Math.max(1, Math.round(r.width * dpr));
      c.el.height = Math.max(1, Math.round(r.height * dpr));
      c.ctx = c.el.getContext('2d');
      c.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
  }

  function draw(t) {
    const live = state.mode === 'mp3' && analyser && state.playing;
    if (live) { analyser.getByteFrequencyData(freqData); analyser.getByteTimeDomainData(timeData); }
    const beat = Math.exp(-((t / (60000 / 140)) % 1) * 5); // 140 BPM pulse for non-live playback
    const energy = state.playing ? 0.55 + 0.45 * beat : 0.16;

    canvases.forEach(c => {
      const { ctx, w, h } = c;
      if (!ctx || !w) return;
      ctx.clearRect(0, 0, w, h);
      const n = Math.floor(w / c.bar);
      const mid = h / 2;
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, 'rgba(216,32,26,0)');
      grad.addColorStop(0.2, `rgba(216,32,26,${c.alpha})`);
      grad.addColorStop(0.5, `rgba(255,74,61,${c.alpha})`);
      grad.addColorStop(0.8, `rgba(139,124,255,${c.alpha})`);
      grad.addColorStop(1, 'rgba(139,124,255,0)');
      ctx.fillStyle = grad;
      for (let i = 0; i < n; i++) {
        let v;
        if (live) {
          const fi = Math.floor(Math.abs((i / n) * 2 - 1) * freqData.length * 0.6);
          v = freqData[fi] / 255;
        } else {
          const noise = (Math.sin(i * 0.35 + t * 0.0016) + Math.sin(i * 0.13 - t * 0.0011) + Math.sin(i * 0.71 + t * 0.0023)) / 6 + 0.5;
          v = noise * energy;
        }
        const bh = Math.max(1, v * h * c.amp);
        ctx.fillRect(i * c.bar, mid - bh, c.barW, bh * 2);
      }
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        let y;
        if (live) {
          const ti = Math.floor((x / w) * (timeData.length - 1));
          y = mid + ((timeData[ti] - 128) / 128) * h * 0.4;
        } else {
          const a = state.playing ? 10 + 14 * beat : 6;
          y = mid + Math.sin(x * 0.02 + t * 0.003) * a * Math.sin(x * 0.004 + t * 0.0007);
        }
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });
  }

  function loop(t) {
    if (!document.hidden) draw(t);
    requestAnimationFrame(loop);
  }

  sizeCanvases();
  window.addEventListener('resize', sizeCanvases);
  if (reduceMotion) draw(0);
  else requestAnimationFrame(loop);
})();
