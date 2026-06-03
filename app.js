// app.js – Mládež 2026

'use strict';

const PROXIMITY_M = 50;           // odemkne stanoviště do 50 metrů
const STORAGE_KEY = 'mladez2026_done';
const COLORS      = ['red', 'blue', 'green', 'yellow'];

let activeId = null;               // právě otevřené stanoviště
const nearbyIds = new Set();       // stanoviště v dosahu v této session

// ─── Uložiště ────────────────────────────────────────────────────────────────

function getDone()    { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } }
function saveDone(a)  { localStorage.setItem(STORAGE_KEY, JSON.stringify(a)); }
function isDone(id)   { return getDone().includes(id); }
function markDone(id) { const d = getDone(); if (!d.includes(id)) { d.push(id); saveDone(d); } }
function clearDone()  { saveDone([]); }

// ─── Vzdálenost (Haversine) ───────────────────────────────────────────────────

function distM(lat1, lng1, lat2, lng2) {
  const R = 6_371_000;
  const r = d => d * Math.PI / 180;
  const dLat = r(lat2 - lat1);
  const dLng = r(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2
          + Math.cos(r(lat1)) * Math.cos(r(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

// ─── Geolokace ────────────────────────────────────────────────────────────────

function getPos() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) { reject(new Error('no-geo')); return; }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 12_000,
      maximumAge: 5_000,
    });
  });
}

// ─── Přepínání obrazovek ──────────────────────────────────────────────────────

function show(screenId) {
  ['splash', 'overview', 'detail', 'done'].forEach(id => {
    document.getElementById(`screen-${id}`).classList.toggle('hidden', id !== screenId);
  });
}

// ─── Vykreslení karet (přehled) ───────────────────────────────────────────────

function colorOf(id) { return COLORS[(id - 1) % COLORS.length]; }

function renderCards() {
  const grid = document.getElementById('cards-grid');
  const done = getDone();
  grid.innerHTML = '';

  LOCATIONS.forEach(loc => {
    const finished = done.includes(loc.id);
    const nearby   = nearbyIds.has(loc.id);
    const locked   = !finished && !nearby;
    const color    = locked ? 'locked' : colorOf(loc.id);

    const card = document.createElement('div');
    card.className = `uno-card grid-card color-${color}`;
    card.dataset.id = loc.id;

    card.innerHTML = `
      <span class="corner tl">${loc.id}</span>
      <div class="card-oval${locked ? ' oval-locked' : ''}">
        <div class="card-oval-inner">
          ${locked
            ? `<span class="grid-lock">🔒</span>`
            : `<span class="grid-number">${loc.id}</span>`}
        </div>
      </div>
      <span class="corner br">${loc.id}</span>
    `;

    if (finished) {
      card.insertAdjacentHTML('beforeend',
        `<div class="card-badge badge-done">✓</div>`);
    } else if (nearby) {
      card.insertAdjacentHTML('beforeend',
        `<div class="card-badge badge-near">📍</div>`);
    }

    card.addEventListener('click', () => openDetail(loc.id));
    grid.appendChild(card);
  });

  document.getElementById('progress-chip').textContent =
    `${done.length} / ${LOCATIONS.length}`;
}

// ─── Detail stanoviště ────────────────────────────────────────────────────────

function openDetail(id) {
  activeId = id;
  const loc = LOCATIONS.find(l => l.id === id);

  document.getElementById('detail-card').className =
    `uno-card detail-card color-${colorOf(id)}`;
  document.getElementById('detail-corner-tl').textContent = id;
  document.getElementById('detail-corner-br').textContent = id;
  document.getElementById('detail-task-text').textContent = loc.task;

  show('detail');

  if (isDone(id)) {
    setState('done');
  } else {
    setState('checking');
    checkDetailPos();
  }
}

function setState(s) {
  ['checking', 'far', 'near', 'done'].forEach(name => {
    document.getElementById(`state-${name}`).classList.toggle('hidden', name !== s);
  });
}

async function checkDetailPos() {
  setState('checking');
  try {
    const pos = await getPos();
    const { latitude: lat, longitude: lng } = pos.coords;
    const loc = LOCATIONS.find(l => l.id === activeId);
    const d = distM(lat, lng, loc.lat, loc.lng);

    if (d <= PROXIMITY_M) {
      nearbyIds.add(loc.id);
      setState('near');
    } else {
      document.getElementById('detail-distance-text').textContent =
        `Nejsi na místě · ~${Math.round(d)} m daleko`;
      setState('far');
    }
  } catch {
    document.getElementById('detail-distance-text').textContent =
      'Polohu se nepodařilo zjistit. Zkus to znovu.';
    setState('far');
  }
  renderCards();
}

// ─── Kontrola polohy pro všechna stanoviště ───────────────────────────────────

async function checkAll() {
  const btn = document.getElementById('btn-check-location');
  btn.disabled = true;
  btn.textContent = '⏳ Zjišťuji…';

  try {
    const pos = await getPos();
    const { latitude: lat, longitude: lng } = pos.coords;
    LOCATIONS.forEach(loc => {
      if (isDone(loc.id)) return;
      const d = distM(lat, lng, loc.lat, loc.lng);
      if (d <= PROXIMITY_M) nearbyIds.add(loc.id);
      else nearbyIds.delete(loc.id);
    });
  } catch { /* uživatel může zkusit znovu */ }

  btn.disabled = false;
  btn.textContent = '📍 Zkontrolovat moji polohu';
  renderCards();
}

// ─── Dokončení hry ────────────────────────────────────────────────────────────

function checkAllDone() {
  if (getDone().length >= LOCATIONS.length) {
    launchConfetti();
    show('done');
  }
}

function launchConfetti() {
  const c = document.getElementById('confetti-container');
  c.innerHTML = '';
  const cols = ['#E3373A', '#0055A5', '#00996E', '#FFD900', '#FFFFFF', '#FF8C00'];
  for (let i = 0; i < 90; i++) {
    const p = document.createElement('div');
    const size = 6 + Math.random() * 8;
    p.className = 'confetti-piece';
    p.style.cssText = `
      left: ${Math.random() * 100}vw;
      background: ${cols[Math.floor(Math.random() * cols.length)]};
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${1.5 + Math.random() * 2.5}s;
      animation-delay: ${Math.random() * 1.5}s;
    `;
    c.appendChild(p);
  }
}

// ─── Inicializace úvodní obrazovky ────────────────────────────────────────────

function initSplash() {
  const hasSave = getDone().length > 0;
  document.getElementById('btn-start').classList.toggle('hidden', hasSave);
  document.getElementById('btn-continue').classList.toggle('hidden', !hasSave);
  document.getElementById('btn-new-game').classList.toggle('hidden', !hasSave);
}

function resetGame() {
  clearDone();
  nearbyIds.clear();
  initSplash();
  renderCards();
}

// ─── Spuštění ─────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  initSplash();

  // Úvodní obrazovka
  document.getElementById('btn-start')
    .addEventListener('click', () => show('overview'));
  document.getElementById('btn-continue')
    .addEventListener('click', () => show('overview'));
  document.getElementById('btn-new-game')
    .addEventListener('click', () => { resetGame(); show('overview'); });

  // Přehled stanovišť
  document.getElementById('btn-check-location')
    .addEventListener('click', checkAll);

  // Detail
  document.getElementById('btn-back').addEventListener('click', () => {
    show('overview');
    renderCards();
  });
  document.getElementById('btn-retry')
    .addEventListener('click', checkDetailPos);
  document.getElementById('btn-complete').addEventListener('click', () => {
    if (activeId === null) return;
    markDone(activeId);
    nearbyIds.delete(activeId);
    setState('done');
    renderCards();
    setTimeout(checkAllDone, 900);
  });

  // Závěrečná obrazovka
  document.getElementById('btn-reset').addEventListener('click', () => {
    resetGame();
    show('splash');
  });
});
