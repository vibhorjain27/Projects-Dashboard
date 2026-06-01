/**
 * script.js — Portfolio dashboard interactions
 * Handles: project card rendering, category filtering, modal, stats counter,
 *          confidential project password gate (SHA-256 via SubtleCrypto)
 */

/* ── Password gate config ─────────────────────────────────────────── */
const PW_HASH = "6cfeabfd42ce0b3374dde062e0b700771188daf131a579b843235ac1e223e1e2";
const SESSION_KEY = "vj_portfolio_unlocked";

/* ── Helpers ──────────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const on = (el, ev, fn) => el.addEventListener(ev, fn);

async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256",
    new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function isUnlocked() {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

function setUnlocked() {
  sessionStorage.setItem(SESSION_KEY, "1");
}

/* ── SVG Icons ────────────────────────────────────────────────────── */
const ICONS = {
  external: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  lock: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
};

/* ── Category / status config ─────────────────────────────────────── */
const CATEGORY_LABELS = {
  professional: '💼 Professional',
  personal:     '🎮 Personal',
};

const STATUS_LABELS = {
  live:     '● Live',
  wip:      '◑ WIP',
  archived: '○ Archived',
};

/* ── Build a project card element ─────────────────────────────────── */
function buildCard(project, delay = 0) {
  const locked      = project.confidential && !isUnlocked();
  const card        = document.createElement('div');
  card.className    = `project-card${project.featured ? ' featured' : ''}${project.confidential ? ' locked' : ''}${(project.confidential && isUnlocked()) ? ' unlocked' : ''}`;
  card.style.animationDelay = `${delay}ms`;
  card.dataset.category  = project.category;
  card.dataset.projectId = project.id;

  const liveBtn = project.liveUrl
    ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary" onclick="event.stopPropagation()">
         ${ICONS.external} ${project.fileLabel || 'Live Demo'}
       </a>`
    : (project.fileLabel
        ? `<span class="btn btn-primary" style="opacity:0.45;cursor:not-allowed;">${ICONS.lock} ${project.fileLabel}</span>`
        : '');

  const githubBtn = project.githubUrl
    ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline" onclick="event.stopPropagation()">
         ${ICONS.github} Source
       </a>`
    : '';

  const confidentialBadge = project.confidential
    ? `<span class="badge badge-confidential">${ICONS.lock} Restricted</span>`
    : '';

  const lockOverlay = (project.confidential && !isUnlocked())
    ? `<div class="lock-overlay" aria-hidden="true">
         <span class="lock-icon">🔒</span>
         <span class="lock-text">Click to unlock</span>
       </div>`
    : '';

  card.innerHTML = `
    <div class="card-top">
      <div class="card-icon" aria-hidden="true">${project.icon}</div>
      <div class="card-meta">
        <div class="card-badges">
          <span class="badge badge-${project.category}">${CATEGORY_LABELS[project.category]}</span>
          <span class="badge badge-status-${project.status}">${STATUS_LABELS[project.status] || project.status}</span>
          ${confidentialBadge}
        </div>
        <h3 class="card-title">${project.title}</h3>
      </div>
    </div>
    <p class="card-desc">${project.shortDesc}</p>
    <div class="card-tags">
      ${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <div class="card-actions">
      ${liveBtn}
      ${githubBtn}
    </div>
    ${lockOverlay}
  `;

  on(card, 'click', e => {
    if (e.target.closest('.btn')) return;
    if (project.confidential && !isUnlocked()) {
      openPasswordModal(() => {
        // After successful unlock, rerender and open modal
        renderCards(currentFilter);
        openModal(project);
      });
    } else {
      openModal(project);
    }
  });

  return card;
}

/* ── Render cards ─────────────────────────────────────────────────── */
let currentFilter = 'all';

function renderCards(filter = 'all') {
  const grid    = $('projects-grid');
  const noRes   = $('no-results');
  const countEl = $('project-count');

  grid.innerHTML = '';

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  if (filtered.length === 0) {
    noRes.classList.remove('hidden');
    grid.classList.add('hidden');
  } else {
    noRes.classList.add('hidden');
    grid.classList.remove('hidden');
    filtered.forEach((p, i) => grid.appendChild(buildCard(p, i * 60)));
  }

  countEl.textContent = `${filtered.length} project${filtered.length !== 1 ? 's' : ''}`;
}

/* ── Stats counter animation ──────────────────────────────────────── */
function animateCount(el, target, duration = 800) {
  const start = performance.now();
  function step(now) {
    const t   = Math.min((now - start) / duration, 1);
    const val = Math.round(t * target);
    el.textContent = val;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function updateStats() {
  animateCount($('stat-total'),        PROJECTS.length);
  animateCount($('stat-live'),         PROJECTS.filter(p => p.status === 'live').length,  900);
  animateCount($('stat-professional'), PROJECTS.filter(p => p.category === 'professional').length, 1000);
  animateCount($('stat-personal'),     PROJECTS.filter(p => p.category === 'personal').length, 1100);
}

/* ── Filter tabs ──────────────────────────────────────────────────── */
function initFilters() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    on(tab, 'click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentFilter = tab.dataset.filter;
      renderCards(currentFilter);
    });
  });
}

/* ── Password modal ───────────────────────────────────────────────── */
let _pwCallback = null;

function openPasswordModal(onSuccess) {
  _pwCallback = onSuccess;
  const overlay = $('pw-modal-overlay');
  overlay.classList.remove('hidden');
  $('pw-input').value = '';
  $('pw-error').textContent = '';
  $('pw-input').classList.remove('error');
  document.body.style.overflow = 'hidden';
  setTimeout(() => $('pw-input').focus(), 80);
}

function closePasswordModal() {
  $('pw-modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
  _pwCallback = null;
}

async function handlePasswordSubmit() {
  const val = $('pw-input').value;
  if (!val) return;

  const hash = await sha256(val);
  if (hash === PW_HASH) {
    setUnlocked();
    closePasswordModal();
    if (_pwCallback) _pwCallback();
  } else {
    const input = $('pw-input');
    const err   = $('pw-error');
    input.classList.add('error');
    err.textContent = 'Incorrect password. Try again.';
    input.addEventListener('input', () => {
      input.classList.remove('error');
      err.textContent = '';
    }, { once: true });
  }
}

function initPasswordModal() {
  on($('pw-submit'), 'click', handlePasswordSubmit);
  on($('pw-cancel'), 'click', closePasswordModal);
  on($('pw-input'),  'keydown', e => { if (e.key === 'Enter') handlePasswordSubmit(); });
  on($('pw-modal-overlay'), 'click', e => {
    if (e.target === $('pw-modal-overlay')) closePasswordModal();
  });
}

/* ── Project detail modal ─────────────────────────────────────────── */
function openModal(project) {
  $('modal-icon').textContent  = project.icon;
  $('modal-title').textContent = project.title;
  $('modal-desc').textContent  = project.fullDesc;

  const catEl = $('modal-category');
  catEl.textContent = CATEGORY_LABELS[project.category];
  catEl.className   = `modal-category badge badge-${project.category}`;

  const statusEl = $('modal-status');
  statusEl.textContent = STATUS_LABELS[project.status] || project.status;
  statusEl.className   = `modal-status badge badge-status-${project.status}`;

  $('modal-tags').innerHTML = project.tags
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  const liveBtn = project.liveUrl
    ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary">
         ${ICONS.external} ${project.fileLabel || 'View Live Demo'}
       </a>`
    : (project.confidential && project.fileLabel
        ? `<span class="btn btn-primary" style="opacity:0.45;cursor:not-allowed;">${ICONS.lock} Link coming soon</span>`
        : '');

  const githubBtn = project.githubUrl
    ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline">
         ${ICONS.github} View Source
       </a>`
    : '';

  $('modal-actions').innerHTML = liveBtn + githubBtn;

  const overlay = $('modal-overlay');
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  $('modal-close').focus();
}

function closeModal() {
  $('modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function initModal() {
  on($('modal-close'),   'click', closeModal);
  on($('modal-overlay'), 'click', e => {
    if (e.target === $('modal-overlay')) closeModal();
  });
  on(document, 'keydown', e => {
    if (e.key === 'Escape') {
      if (!$('pw-modal-overlay').classList.contains('hidden')) closePasswordModal();
      else closeModal();
    }
  });
}

/* ── Init ─────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateStats();
  renderCards('all');
  initFilters();
  initModal();
  initPasswordModal();
});
