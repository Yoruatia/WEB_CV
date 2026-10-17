function safe(fn, label){
  try { fn(); } catch (err) { console.warn('[site] skipped "' + (label || fn.name || 'block') + '":', err); }
}
function $(id){ return document.getElementById(id); }

/* localStorage can throw in private mode / blocked storage */
const store = {
  get(k){ try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v){ try { localStorage.setItem(k, v); } catch (e) {} }
};

/* ---------------------------------------------------------------------- */
/* ICONS                                                                   */
/* type "fill"   = solid brand logo (Simple Icons paths, 24×24)            */
/* type "stroke" = outline icon                                            */
/* ---------------------------------------------------------------------- */
const ICONS = {
  linkedin: { type: 'fill', body:
    '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>' },
  github: { type: 'fill', body:
    '<path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.57v-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3"/>' },
  instagram: { type: 'fill', body:
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5-3a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 17 6z"/>' },
  email: { type: 'stroke', body:
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>' },
  cv: { type: 'stroke', body:
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 11v6M9.5 14.5 12 17l2.5-2.5"/>' }
};
function iconSvg(name){
  const icon = ICONS[name] || ICONS.email;
  const paint = icon.type === 'fill'
    ? 'fill="currentColor" stroke="none"'
    : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  return `<svg viewBox="0 0 24 24" width="17" height="17" ${paint} aria-hidden="true">${icon.body}</svg>`;
}

/* ---------------------------------------------------------------------- */
safe(() => { $('yr').textContent = new Date().getFullYear(); }, 'year');

/* ---------------------------------------------------------------------- */
/* THEME TOGGLE                                                            */
/* ---------------------------------------------------------------------- */
safe(() => {
  const root = document.documentElement;
  const saved = store.get('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if ((saved || (prefersDark ? 'dark' : 'light')) === 'dark') root.setAttribute('data-theme', 'dark');

  const btn = $('themeToggle');
  const iconSun = $('iconSun');
  function paint(){
    if (!iconSun) return;
    const isDark = root.getAttribute('data-theme') === 'dark';
    iconSun.innerHTML = isDark
      ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
      : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  }
  paint();
  if (btn) btn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) { root.removeAttribute('data-theme'); store.set('theme', 'light'); }
    else { root.setAttribute('data-theme', 'dark'); store.set('theme', 'dark'); }
    paint();
  });
}, 'theme');

/* ---------------------------------------------------------------------- */
/* REVEAL ON SCROLL                                                        */
/* ---------------------------------------------------------------------- */
function observeReveals(scope){
  safe(() => {
    const els = (scope || document).querySelectorAll('.reveal:not(.in)');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }, 'reveal');
}

/* ---------------------------------------------------------------------- */
/* NAV ACTIVE STATE + BACK TO TOP                                          */
/* ---------------------------------------------------------------------- */
let sections = [];
safe(() => {
  const backToTop = $('backtotop');
  const navLinks = Array.from(document.querySelectorAll('#navlinks a'));
  sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function onScroll(){
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 600);
    if (!sections.length) return;
    let currentId = sections[0].id;
    for (const sec of sections) { if (sec.getBoundingClientRect().top - 120 <= 0) currentId = sec.id; }
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + currentId));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  onScroll();
}, 'scroll-tracking');

/* ---------------------------------------------------------------------- */
/* PROFILE PHOTO                                                           */
/* ---------------------------------------------------------------------- */
safe(() => {
  const el = $('portraitPh');
  if (!el || typeof PROFILE_PHOTO === 'undefined' || !PROFILE_PHOTO) return;
  el.classList.add('has-photo');
  el.innerHTML = `<img src="${PROFILE_PHOTO}" alt="Shendi Moses Ginting">`;
}, 'profile-photo');

/* ---------------------------------------------------------------------- */
/* PATH-SPECIFIC TAGS                                                      */
/* ---------------------------------------------------------------------- */
safe(() => {
  const el = $('pathTags');
  if (!el || typeof PATH_TAGS === 'undefined') return;
  el.innerHTML = PATH_TAGS.map(t => `<span class="field-tag">${t}</span>`).join('');
}, 'path-tags');

/* ---------------------------------------------------------------------- */
/* STACK BADGES (shields.io)                                               */
/* ---------------------------------------------------------------------- */
safe(() => {
  const el = $('stackBadges');
  if (!el || typeof STACK_BADGES === 'undefined') return;
  el.innerHTML = STACK_BADGES.map(b => {
    const logo = b.logo ? `&logo=${b.logo}&logoColor=white` : '';
    const alt = b.label.replace(/_/g, ' ').replace(/--/g, '-');
    return `<img src="https://img.shields.io/badge/${encodeURIComponent(b.label)}-${b.color}?style=flat-square${logo}" alt="${alt}" title="${alt}" loading="lazy">`;
  }).join('');
}, 'stack-badges');

/* ---------------------------------------------------------------------- */
/* SKILLS                                                                  */
/* ---------------------------------------------------------------------- */
safe(() => {
  const el = $('skillsGrid');
  if (!el || typeof SKILLS === 'undefined') return;
  el.innerHTML = SKILLS.map(s => `
    <div class="skill-cat reveal">
      <h4>${s.cat}</h4>
      <div class="skill-tags">${s.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}</div>
    </div>
  `).join('');
}, 'skills');

/* ---------------------------------------------------------------------- */
/* EDUCATION                                                               */
/* ---------------------------------------------------------------------- */
safe(() => {
  const el = $('eduList');
  if (!el || typeof EDUCATION === 'undefined') return;
  el.innerHTML = EDUCATION.map(e => `
    <div class="edu-card reveal">
      <div class="edu-main">
        <h3>${e.school}</h3>
        <p>${e.degree}</p>
        ${e.note ? `<span class="edu-note mono">${e.note}</span>` : ''}
      </div>
      <span class="edu-period mono">${e.period}</span>
    </div>
  `).join('');
}, 'education');

/* ---------------------------------------------------------------------- */
/* EXPERIENCE (TIMELINE)                                                   */
/* ---------------------------------------------------------------------- */
safe(() => {
  const el = $('timelineList');
  if (!el || typeof EXPERIENCE === 'undefined') return;
  el.innerHTML = EXPERIENCE.map(e => `
    <div class="tl-item reveal">
      <span class="tl-dur mono">${e.dur}</span>
      <h3>${e.title}</h3>
      <span class="tl-org">${e.org}</span>
      <ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>
  `).join('');
}, 'experience');

/* ---------------------------------------------------------------------- */
/* PROJECTS                                                                */
/* ---------------------------------------------------------------------- */
let activeProjectFilter = 'All';

/* stack may be written as a string or an array in data.js — both work */
function stackText(stack){
  if (!stack) return '';
  return Array.isArray(stack) ? stack.join(', ') : stack;
}

function renderFilterRow(){
  safe(() => {
    const row = $('filterRow');
    if (!row || typeof PROJECTS === 'undefined') return;
    const cats = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];
    row.innerHTML = cats.map(c => `<button class="filter-chip ${c === activeProjectFilter ? 'active' : ''}" data-filter="${c}">${c}</button>`).join('');
    row.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => { activeProjectFilter = btn.dataset.filter; renderFilterRow(); renderProjects(); });
    });
  }, 'project-filters');
}

function renderProjects(){
  safe(() => {
    const grid = $('projGrid');
    if (!grid || typeof PROJECTS === 'undefined') return;
    const list = activeProjectFilter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeProjectFilter);
    grid.innerHTML = list.map(p => {
      const hasImg = p.images && p.images.length > 0;
      return `
      <div class="proj-card reveal" data-id="${p.id}">
        <div class="proj-thumb ${hasImg ? 'has-img' : ''}" ${hasImg ? `style="background-image:url('${p.images[0]}');"` : ''}>
          ${hasImg ? '' : `<span class="icon" style="font-size:38px;">${p.emoji}</span>`}
          <span class="status">${p.status}</span>
          ${p.featured ? '<span class="proj-featured-badge">Featured</span>' : ''}
        </div>
        <div class="proj-body">
          <span class="proj-cat">${p.category}${p.researchTag ? ' · Research' : ''}</span>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="badge-row">${p.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}</div>
          <div class="proj-footer"><a href="#" data-open="${p.id}">Full write-up →</a></div>
        </div>
      </div>
    `;
    }).join('');
    grid.querySelectorAll('[data-open]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openProjectModal(a.dataset.open); }));
    grid.querySelectorAll('.proj-card').forEach(card => card.addEventListener('click', e => { if (!e.target.closest('[data-open]')) openProjectModal(card.dataset.id); }));
    observeReveals(grid);
  }, 'projects-grid');
}

/* ---------------------------------------------------------------------- */
/* PROJECT IMAGE SLIDER (manual — click/arrow keys only)                   */
/* ---------------------------------------------------------------------- */
let sliderKeyHandler = null;

function sliderHtml(images){
  if (!images || !images.length) return '';
  const slides = images.map(src => `<div class="ps-slide"><img src="${src}" alt="" loading="lazy"></div>`).join('');
  const nav = images.length > 1 ? `
    <button class="ps-nav prev" id="psPrev" aria-label="Previous image">‹</button>
    <button class="ps-nav next" id="psNext" aria-label="Next image">›</button>
    <div class="ps-dots" id="psDots">${images.map((_, i) => `<button class="ps-dot ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-label="Go to image ${i + 1}"></button>`).join('')}</div>
  ` : '';
  return `<div class="proj-slider" id="projSlider"><div class="ps-viewport"><div class="ps-track" id="psTrack">${slides}</div></div>${nav}</div>`;
}
function wireSlider(images){
  if (!images || images.length < 2) return;
  const track = $('psTrack'), prev = $('psPrev'), next = $('psNext'), dotsWrap = $('psDots');
  if (!track) return;
  const n = images.length;
  let idx = 0;

  // Exact widths so each slide is precisely one viewport wide
  track.style.width = (n * 100) + '%';
  track.querySelectorAll('.ps-slide').forEach(s => { s.style.width = (100 / n) + '%'; });

  function render(){
    track.style.transform = `translateX(-${idx * (100 / n)}%)`;
    if (dotsWrap) dotsWrap.querySelectorAll('.ps-dot').forEach((d, di) => d.classList.toggle('active', di === idx));
  }
  function go(i){ idx = (i + n) % n; render(); }
  render();

  if (prev) prev.addEventListener('click', () => go(idx - 1));
  if (next) next.addEventListener('click', () => go(idx + 1));
  if (dotsWrap) dotsWrap.querySelectorAll('.ps-dot').forEach(d => d.addEventListener('click', () => go(+d.dataset.idx)));

  sliderKeyHandler = (e) => {
    if (e.key === 'ArrowLeft') go(idx - 1);
    if (e.key === 'ArrowRight') go(idx + 1);
  };
  document.addEventListener('keydown', sliderKeyHandler);
}
function unwireSlider(){
  if (sliderKeyHandler) { document.removeEventListener('keydown', sliderKeyHandler); sliderKeyHandler = null; }
}

/* ---------------------------------------------------------------------- */
/* PROJECT MODAL                                                           */
/* ---------------------------------------------------------------------- */
function openProjectModal(id){
  safe(() => {
    const p = PROJECTS.find(x => x.id === id);
    const overlay = $('projModalOverlay'), panel = $('projModalPanel');
    if (!p || !overlay || !panel) return;
    unwireSlider();
    panel.innerHTML = `
      <div class="modal-head">
        <div><span class="proj-cat">${p.category}${p.researchTag ? ' · Research' : ''}</span><h3 style="margin-top:6px;">${p.emoji} ${p.title}</h3></div>
        <button class="modal-close" id="projModalClose" aria-label="Close">✕</button>
      </div>
      ${sliderHtml(p.images)}
      <div class="modal-body">
        <h4>Overview</h4><p>${p.overview}</p>
        <h4>Contributions</h4><ul>${p.contributions.map(c => `<li>${c}</li>`).join('')}</ul>
        <h4>Stack</h4><p>${stackText(p.stack)}</p>
      </div>
      <div class="modal-links">
        ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="btn btn-outline">${p.linkLabel || 'Open link →'}</a>` : `<span class="mono" style="font-size:12.5px; color:var(--ink-faint);">No public repository — happy to walk through it directly.</span>`}
      </div>
    `;
    const closeBtn = $('projModalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
    wireSlider(p.images);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }, 'open-project-modal');
}
function closeProjectModal(){
  safe(() => {
    unwireSlider();
    const o = $('projModalOverlay');
    if (o) o.classList.remove('open');
    document.body.style.overflow = '';
  }, 'close-project-modal');
}
safe(() => { const o = $('projModalOverlay'); if (o) o.addEventListener('click', e => { if (e.target === e.currentTarget) closeProjectModal(); }); }, 'project-modal-overlay-click');

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeProjectModal(); closeCmdk(); } });

/* ---------------------------------------------------------------------- */
/* LINKS ROW                                                               */
/* ---------------------------------------------------------------------- */
safe(() => {
  const el = $('linksRow');
  if (!el || typeof LINKS_ROW === 'undefined') return;
  el.innerHTML = LINKS_ROW.map(l => `
    <a class="link-chip" href="${l.url}" ${l.download ? 'download' : 'target="_blank" rel="noopener"'}>
      <span class="lc-icon">${iconSvg(l.icon)}</span>
      <span class="lc-name">${l.name}</span>
    </a>
  `).join('');
}, 'links-row');

/* ---------------------------------------------------------------------- */
/* COMMAND PALETTE                                                         */
/* ---------------------------------------------------------------------- */
const cmdkOverlay = $('cmdkOverlay');
const cmdkInput = $('cmdkInput');
const cmdkList = $('cmdkList');
let cmdkSel = 0;

safe(() => {
  const k = $('cmdkKey');
  if (k && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) k.textContent = '⌘K';
}, 'cmdk-key-label');

function cmdkItems(){
  const items = [];
  safe(() => sections.forEach(s => items.push({ label: s.id.charAt(0).toUpperCase() + s.id.slice(1), sub: 'Section', href: '#' + s.id })), 'cmdk-sections');
  safe(() => { if (typeof PROJECTS !== 'undefined') PROJECTS.forEach(p => items.push({ label: p.title, sub: 'Project', href: '#projects', onSelect: () => openProjectModal(p.id) })); }, 'cmdk-projects');
  return items;
}
function renderCmdk(term){
  if (!cmdkList) return;
  const t = (term || '').toLowerCase();
  const items = cmdkItems().filter(i => i.label.toLowerCase().includes(t)).slice(0, 8);
  cmdkSel = 0;
  cmdkList.innerHTML = items.map((i, idx) => `<div class="cmdk-item ${idx === 0 ? 'sel' : ''}" data-idx="${idx}"><span>${i.label}</span><span class="k">${i.sub}</span></div>`).join('') || `<div class="cmdk-item">No matches</div>`;
  cmdkList.querySelectorAll('.cmdk-item[data-idx]').forEach(elm => elm.addEventListener('click', () => selectCmdk(items[+elm.dataset.idx])));
  cmdkList._items = items;
}
function selectCmdk(item){
  if (!item) return;
  closeCmdk();
  const target = document.querySelector(item.href);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
  if (item.onSelect) setTimeout(item.onSelect, 400);
}
function openCmdk(){
  if (!cmdkOverlay || !cmdkInput) return;
  cmdkOverlay.classList.add('open');
  cmdkInput.value = '';
  renderCmdk('');
  setTimeout(() => cmdkInput.focus(), 30);
}
function closeCmdk(){ if (cmdkOverlay) cmdkOverlay.classList.remove('open'); }

safe(() => {
  const openBtn = $('openCmdk');
  if (openBtn) openBtn.addEventListener('click', openCmdk);
  if (cmdkOverlay) cmdkOverlay.addEventListener('click', e => { if (e.target === e.currentTarget) closeCmdk(); });
  if (cmdkInput) {
    cmdkInput.addEventListener('input', e => renderCmdk(e.target.value));
    cmdkInput.addEventListener('keydown', e => {
      const items = (cmdkList && cmdkList._items) || [];
      if (e.key === 'ArrowDown') { e.preventDefault(); cmdkSel = Math.min(cmdkSel + 1, items.length - 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); cmdkSel = Math.max(cmdkSel - 1, 0); }
      else if (e.key === 'Enter') { e.preventDefault(); selectCmdk(items[cmdkSel]); return; }
      else return;
      cmdkList.querySelectorAll('.cmdk-item').forEach((elm, idx) => elm.classList.toggle('sel', idx === cmdkSel));
    });
  }
  document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCmdk(); } });
}, 'command-palette');

/* ---------------------------------------------------------------------- */
/* INITIAL RENDER                                                          */
/* ---------------------------------------------------------------------- */
renderFilterRow();
renderProjects();
observeReveals(document);