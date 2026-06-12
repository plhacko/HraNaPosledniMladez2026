// app.js – Mládež 2026

'use strict';

const PROXIMITY_M  = 50;
const STORAGE_KEY  = 'mladez2026_done';
const POINTS_KEY   = 'mladez2026_points';
const BONUS_KEY    = 'mladez2026_bonus';
const GEO_SKIP_KEY = 'mladez2026_geo_skipped';
const SONG_KEY     = 'mladez2026_song';
const COLORS       = ['red', 'blue', 'green', 'yellow'];

let activeId = null;
const nearbyIds = new Set();

// ─── Storage helpers ─────────────────────────────────────────────────────────

function getDone()    { try { return JSON.parse(localStorage.getItem(STORAGE_KEY))  || [];  } catch { return [];  } }
function saveDone(a)  { localStorage.setItem(STORAGE_KEY, JSON.stringify(a)); }
function isDone(id)   { return getDone().includes(id); }

function getPoints()      { try { return JSON.parse(localStorage.getItem(POINTS_KEY))   || {}; } catch { return {}; } }
function savePoints(obj)  { localStorage.setItem(POINTS_KEY,   JSON.stringify(obj)); }

function getBonus()       { try { return JSON.parse(localStorage.getItem(BONUS_KEY))    || {}; } catch { return {}; } }
function saveBonus(obj)   { localStorage.setItem(BONUS_KEY,    JSON.stringify(obj)); }

function getGeoSkipped()    { try { return JSON.parse(localStorage.getItem(GEO_SKIP_KEY)) || []; } catch { return []; } }
function addGeoSkipped(id)  { const a = getGeoSkipped(); if (!a.includes(id)) { a.push(id); localStorage.setItem(GEO_SKIP_KEY, JSON.stringify(a)); } }
function clearGeoSkipped()  { localStorage.removeItem(GEO_SKIP_KEY); }

function getSongData()    { try { return JSON.parse(localStorage.getItem(SONG_KEY)) || {}; } catch { return {}; } }

function markDone(id, pts) {
  const d = getDone();
  if (!d.includes(id)) { d.push(id); saveDone(d); }
  if (pts !== undefined) {
    const p = getPoints();
    if (p[id] === undefined) { p[id] = pts; savePoints(p); }
  }
}

function clearAll() {
  saveDone([]);
  localStorage.removeItem(POINTS_KEY);
  localStorage.removeItem(BONUS_KEY);
  clearGeoSkipped();
}

function getTotalPoints() { return Object.values(getPoints()).reduce((s, v) => s + v, 0); }
function getTotalBonus()  { return Object.values(getBonus()).reduce((s, v) => s + v, 0); }

// ─── Haversine ───────────────────────────────────────────────────────────────

function distM(lat1, lng1, lat2, lng2) {
  const R = 6_371_000;
  const r = d => d * Math.PI / 180;
  const dLat = r(lat2 - lat1);
  const dLng = r(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2
          + Math.cos(r(lat1)) * Math.cos(r(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

// ─── Geolocation ─────────────────────────────────────────────────────────────

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

// ─── Screens ─────────────────────────────────────────────────────────────────

function show(screenId) {
  ['splash', 'overview', 'detail', 'done'].forEach(id => {
    document.getElementById(`screen-${id}`).classList.toggle('hidden', id !== screenId);
  });
}

// ─── Score display ───────────────────────────────────────────────────────────

function renderScore() {
  document.getElementById('pts-display').textContent   = `${getTotalPoints()} b.`;
  document.getElementById('bonus-display').textContent = `+${getTotalBonus()} bonus`;
}

// ─── Overview cards ──────────────────────────────────────────────────────────

function colorOf(id) { return COLORS[(id - 1) % COLORS.length]; }

function renderCards() {
  const grid = document.getElementById('cards-grid');
  const done = getDone();
  const skipped = getGeoSkipped();
  grid.innerHTML = '';

  LOCATIONS.forEach(loc => {
    const finished   = done.includes(loc.id);
    const nearby     = nearbyIds.has(loc.id);
    const geoSkipped = skipped.includes(loc.id);
    const noGeoNeeded = loc.lat === null;
    const locked     = !finished && !nearby && !geoSkipped && !noGeoNeeded;
    const color      = locked ? 'locked' : colorOf(loc.id);

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

    if (finished && geoSkipped) {
      card.insertAdjacentHTML('beforeend', `<div class="card-badge badge-geoskip">🔓</div>`);
    } else if (finished) {
      card.insertAdjacentHTML('beforeend', `<div class="card-badge badge-done">✓</div>`);
    } else if (nearby) {
      card.insertAdjacentHTML('beforeend', `<div class="card-badge badge-near">📍</div>`);
    }

    card.addEventListener('click', () => openDetail(loc.id));

    // Debug geo-skip: long-press on not-yet-done cards that have real coords
    if (!finished && !noGeoNeeded) {
      let longPressTimer;
      card.addEventListener('pointerdown', () => {
        longPressTimer = setTimeout(() => {
          if (confirm(`Přeskočit ověření polohy pro stanoviště ${loc.id}? (jen pro testování)`)) {
            addGeoSkipped(loc.id);
            openDetail(loc.id);
          }
        }, 500);
      });
      card.addEventListener('pointerup',    () => clearTimeout(longPressTimer));
      card.addEventListener('pointerleave', () => clearTimeout(longPressTimer));
      card.addEventListener('pointermove',  () => clearTimeout(longPressTimer));
    }

    grid.appendChild(card);
  });

  document.getElementById('progress-chip').textContent =
    `${done.length} / ${LOCATIONS.length}`;

  renderScore();
}

// ─── Detail view ─────────────────────────────────────────────────────────────

function setState(s) {
  ['checking', 'timelocked', 'far', 'near', 'quiz', 'form', 'done'].forEach(name => {
    document.getElementById(`state-${name}`).classList.toggle('hidden', name !== s);
  });
}

function openDetail(id) {
  activeId = id;
  const loc = LOCATIONS.find(l => l.id === id);

  document.getElementById('detail-card').className =
    `uno-card detail-card color-${colorOf(id)}`;
  document.getElementById('detail-corner-tl').textContent = id;
  document.getElementById('detail-corner-br').textContent = id;
  document.getElementById('detail-task-name').textContent = loc.name;

  show('detail');

  if (isDone(id)) {
    updateDoneState(loc);
    setState('done');
    return;
  }

  // Time-lock check
  if (loc.timeLock) {
    const [lockH, lockM] = loc.timeLock.split(':').map(Number);
    const now = new Date();
    if (now.getHours() < lockH || (now.getHours() === lockH && now.getMinutes() < lockM)) {
      document.getElementById('timelocked-text').textContent =
        `Karta bude dostupná ve ${loc.timeLock}`;
      setState('timelocked');
      return;
    }
  }

  // No coords yet — show task immediately
  if (loc.lat === null) {
    showTaskState(loc);
    return;
  }

  // Geo-skipped — show task immediately
  if (getGeoSkipped().includes(id)) {
    showTaskState(loc);
    return;
  }

  setState('checking');
  checkDetailPos();
}

function showTaskState(loc) {
  if (loc.type === 'quiz') {
    renderQuiz(loc);
    setState('quiz');
  } else if (loc.type === 'form') {
    renderSongForm(loc);
    setState('form');
  } else {
    document.getElementById('detail-task-text').innerHTML = loc.task;
    setState('near');
  }
}

function updateDoneState(loc) {
  const pts = getPoints();
  const ptsEarned = pts[loc.id] ?? 0;
  document.getElementById('state-done-pts').textContent =
    ptsEarned > 0 ? `${ptsEarned} bodů získáno` : '';

  if (loc.maxBonus > 0) {
    const bonus = getBonus();
    const bonusEarned = bonus[loc.id];
    document.getElementById('state-done-bonus').textContent =
      bonusEarned !== undefined
        ? `+${bonusEarned} bonusových bodů`
        : loc.bonusDesc;
  } else {
    document.getElementById('state-done-bonus').textContent = '';
  }

  const geoSkipped = getGeoSkipped().includes(loc.id);
  document.getElementById('state-done-geoskip').classList.toggle('hidden', !geoSkipped);
}

async function checkDetailPos() {
  const loc = LOCATIONS.find(l => l.id === activeId);
  if (!loc || loc.lat === null) {
    showTaskState(loc);
    return;
  }
  setState('checking');
  try {
    const pos = await getPos();
    const { latitude: lat, longitude: lng } = pos.coords;
    const d = distM(lat, lng, loc.lat, loc.lng);

    if (d <= PROXIMITY_M) {
      nearbyIds.add(loc.id);
      showTaskState(loc);
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

// ─── Check all locations ──────────────────────────────────────────────────────

async function checkAll() {
  const btn = document.getElementById('btn-check-location');
  btn.disabled = true;
  btn.textContent = '⏳ Zjišťuji…';

  try {
    const pos = await getPos();
    const { latitude: lat, longitude: lng } = pos.coords;
    LOCATIONS.forEach(loc => {
      if (isDone(loc.id) || loc.lat === null) return;
      const d = distM(lat, lng, loc.lat, loc.lng);
      if (d <= PROXIMITY_M) nearbyIds.add(loc.id);
      else nearbyIds.delete(loc.id);
    });
  } catch { /* uživatel může zkusit znovu */ }

  btn.disabled = false;
  btn.textContent = '📍 Zkontrolovat moji polohu';
  renderCards();
}

// ─── Quiz (task 9) ────────────────────────────────────────────────────────────

function renderQuiz(loc) {
  const container = document.getElementById('quiz-content');
  let html = `<div class="task-intro">${loc.task}</div>`;

  loc.quiz.forEach((q, qi) => {
    html += `<div class="quiz-question">
      <p class="quiz-q-text">${qi + 1}. ${q.q}</p>
      <div class="quiz-options">
        ${q.options.map((opt, oi) => `
          <label class="quiz-option">
            <input type="radio" name="q${qi}" value="${oi}">
            ${opt}
          </label>
        `).join('')}
      </div>
    </div>`;
  });

  html += `<button id="btn-quiz-submit" class="btn btn-green-solid">Odeslat odpovědi</button>`;
  container.innerHTML = html;

  document.getElementById('btn-quiz-submit').addEventListener('click', submitQuiz);
}

function submitQuiz() {
  const loc = LOCATIONS.find(l => l.id === activeId);
  let correct = 0;
  let allAnswered = true;

  loc.quiz.forEach((q, qi) => {
    const selected = document.querySelector(`input[name="q${qi}"]:checked`);
    if (!selected) { allAnswered = false; return; }

    const labels = document.querySelectorAll(`input[name="q${qi}"]`);
    const isCorrect = parseInt(selected.value) === q.correct;
    if (isCorrect) correct++;

    labels.forEach(inp => {
      const label = inp.closest('label');
      inp.disabled = true;
      label.classList.add('disabled');
      if (parseInt(inp.value) === q.correct)  label.classList.add('correct');
      else if (inp.checked)                   label.classList.add('wrong');
    });
  });

  if (!allAnswered) {
    alert('Odpovězte prosím na všechny otázky.');
    return;
  }

  const pts = correct * 2;
  const submitBtn = document.getElementById('btn-quiz-submit');
  submitBtn.disabled = true;
  submitBtn.textContent = `Odesláno`;

  const result = document.createElement('p');
  result.className = 'quiz-result';
  result.textContent = `${correct} / ${loc.quiz.length} správně → ${pts} bodů`;
  submitBtn.before(result);

  const doneBtn = document.createElement('button');
  doneBtn.className = 'btn btn-green-solid';
  doneBtn.style.marginTop = '6px';
  doneBtn.textContent = 'Označit jako splněné ✓';
  doneBtn.addEventListener('click', () => {
    markDone(activeId, pts);
    nearbyIds.delete(activeId);
    updateDoneState(loc);
    setState('done');
    renderCards();
    setTimeout(checkAllDone, 900);
  });
  submitBtn.after(doneBtn);
}

// ─── Song form (task 8) ───────────────────────────────────────────────────────

function renderSongForm(loc) {
  const container = document.getElementById('form-content');
  const saved = getSongData();

  container.innerHTML = `
    <div class="task-intro">${loc.task}</div>
    <div class="song-form">
      <input id="song-team"   class="form-input"    type="text"  placeholder="Název týmu"  value="${escHtml(saved.team   || '')}">
      <input id="song-name"   class="form-input"    type="text"  placeholder="Název písně" value="${escHtml(saved.name   || '')}">
      <textarea id="song-lyrics" class="form-textarea" rows="14" placeholder="Sem napište celý text písně (sloky oddělujte prázdnými řádky)…">${escHtml(saved.lyrics || '')}</textarea>
      <button id="btn-send-song" class="btn btn-blue">📧 Odeslat na email</button>
      <button id="btn-mark-sent" class="btn btn-green-solid hidden">Označit jako odesláno ✓</button>
    </div>
  `;

  ['song-team', 'song-name', 'song-lyrics'].forEach(elId => {
    document.getElementById(elId).addEventListener('input', persistSongData);
  });

  document.getElementById('btn-send-song').addEventListener('click', () => {
    const team   = document.getElementById('song-team').value.trim();
    const name   = document.getElementById('song-name').value.trim();
    const lyrics = document.getElementById('song-lyrics').value;

    if (!team || !name || !lyrics.trim()) {
      alert('Vyplňte prosím název týmu, název písně a text.');
      return;
    }

    const subject = encodeURIComponent(`Piš barde skládej – ${team} – ${name}`);
    const body    = encodeURIComponent(lyrics);
    window.location.href = `mailto:plhacko@gmail.com?subject=${subject}&body=${body}`;

    document.getElementById('btn-mark-sent').classList.remove('hidden');
  });

  document.getElementById('btn-mark-sent').addEventListener('click', () => {
    markDone(activeId, 0);
    nearbyIds.delete(activeId);
    updateDoneState(loc);
    setState('done');
    renderCards();
    setTimeout(checkAllDone, 900);
  });
}

function persistSongData() {
  const data = {
    team:   document.getElementById('song-team')?.value   ?? '',
    name:   document.getElementById('song-name')?.value   ?? '',
    lyrics: document.getElementById('song-lyrics')?.value ?? '',
  };
  localStorage.setItem(SONG_KEY, JSON.stringify(data));
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ─── All done ────────────────────────────────────────────────────────────────

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
    const p    = document.createElement('div');
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

// ─── Judge panel ─────────────────────────────────────────────────────────────

function openJudgePanel() {
  const done     = getDone();
  const eligible = LOCATIONS.filter(l => done.includes(l.id) && l.maxBonus > 0);
  const bonus    = getBonus();

  const list = document.getElementById('judge-list');
  if (eligible.length === 0) {
    list.innerHTML = '<p style="opacity:0.6;font-size:0.85rem">Zatím žádné splněné úkoly s bonusovými body.</p>';
  } else {
    list.innerHTML = eligible.map(l => `
      <div class="judge-item">
        <label for="judge-${l.id}">${l.id}. ${l.name}</label>
        <small>${l.bonusDesc}</small>
        <input type="number" id="judge-${l.id}" class="judge-input"
          data-id="${l.id}" min="0" max="${l.maxBonus}"
          value="${bonus[l.id] ?? 0}">
      </div>
    `).join('');
  }

  document.getElementById('judge-modal').classList.remove('hidden');
}

function initJudgePanel() {
  let longPressTimer;
  const scoreRow = document.getElementById('score-row');

  scoreRow.addEventListener('pointerdown', () => {
    longPressTimer = setTimeout(openJudgePanel, 500);
  });
  scoreRow.addEventListener('pointerup',    () => clearTimeout(longPressTimer));
  scoreRow.addEventListener('pointerleave', () => clearTimeout(longPressTimer));
  scoreRow.addEventListener('pointermove',  () => clearTimeout(longPressTimer));

  document.getElementById('btn-judge-save').addEventListener('click', () => {
    const bonus = getBonus();
    document.querySelectorAll('.judge-input').forEach(inp => {
      const id  = parseInt(inp.dataset.id);
      const val = Math.min(parseInt(inp.value) || 0, LOCATIONS.find(l => l.id === id).maxBonus);
      bonus[id] = val;
    });
    saveBonus(bonus);
    renderScore();
    document.getElementById('judge-modal').classList.add('hidden');
  });

  document.getElementById('btn-judge-close').addEventListener('click', () => {
    document.getElementById('judge-modal').classList.add('hidden');
  });
}

// ─── Splash screen ────────────────────────────────────────────────────────────

function initSplash() {
  const hasSave = getDone().length > 0;
  document.getElementById('btn-start').classList.toggle('hidden',    hasSave);
  document.getElementById('btn-continue').classList.toggle('hidden', !hasSave);
  document.getElementById('btn-new-game').classList.toggle('hidden', !hasSave);
}

function resetGame() {
  clearAll();
  nearbyIds.clear();
  initSplash();
  renderCards();
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  initSplash();
  initJudgePanel();

  // Splash
  document.getElementById('btn-start')
    .addEventListener('click', () => show('overview'));
  document.getElementById('btn-continue')
    .addEventListener('click', () => show('overview'));
  document.getElementById('btn-new-game')
    .addEventListener('click', () => { resetGame(); show('overview'); });

  // Overview
  document.getElementById('btn-check-location')
    .addEventListener('click', checkAll);

  // Detail
  document.getElementById('btn-back').addEventListener('click', () => {
    show('overview');
    renderCards();
  });
  document.getElementById('btn-retry')
    .addEventListener('click', checkDetailPos);
  document.getElementById('btn-timelock-retry').addEventListener('click', () => {
    const loc = LOCATIONS.find(l => l.id === activeId);
    openDetail(activeId);  // re-runs time check
  });
  document.getElementById('btn-complete').addEventListener('click', () => {
    if (activeId === null) return;
    const loc = LOCATIONS.find(l => l.id === activeId);
    markDone(activeId, loc.basePoints);
    nearbyIds.delete(activeId);
    updateDoneState(loc);
    setState('done');
    renderCards();
    setTimeout(checkAllDone, 900);
  });

  // All-done screen
  document.getElementById('btn-reset').addEventListener('click', () => {
    resetGame();
    show('splash');
  });
});
