/* =========================================================================
   RENDERING & INTERACTION LOGIC
   You shouldn't need to edit this file for normal content changes —
   see data.js for that. Every block below is wrapped in safe() so that
   removing a section's HTML (or a data.js list) only skips that one
   feature instead of breaking the whole page.
   ========================================================================= */

function safe(fn, label){
  try { fn(); } catch (err) { console.warn('[site] skipped "' + (label || fn.name || 'block') + '":', err); }
}
function $(id){ return document.getElementById(id); }

const ICONS = {
  linkedin:
    '<path d="M6.94 8.5H3.56V21h3.38V8.5zM5.25 3a1.94 1.94 0 1 0 0 3.88A1.94 1.94 0 0 0 5.25 3zM21 21v-7.02c0-3.75-2-5.5-4.67-5.5-2.15 0-3.12 1.19-3.65 2.02V8.5H9.3c.05 1.02 0 12.5 0 12.5h3.38v-6.98c0-.37.03-.75.14-1.02.3-.75 1-1.53 2.15-1.53 1.52 0 2.13 1.16 2.13 2.86V21H21z"/>',
  email:
    '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="m3 7 9 6 9-6" fill="none" stroke="currentColor" stroke-width="2"/>',
  whatsapp:
    '<path d="M20.5 3.5a11 11 0 0 0-17.4 13.2L2 21l4.4-1.1A11 11 0 1 0 20.5 3.5z"/><path d="M8.5 8.3c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.8s0 .3-.2.5c-.2.2-.3.3-.5.5-.2.2-.4.4-.2.7.2.4.9 1.4 1.9 2.3 1.3 1.1 2.4 1.5 2.7 1.7.3.2.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.5-.2.8-.1.3.1 2 1 2.4 1.1.4.2.6.3.7.4.1.2-.1.9-.2 1.7-.3.8-1.7 1.6-2.4 1.7-.6.1-1.4.2-4.5-1s-5.1-4.5-5.3-4.7c-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2 1-2.3z"/>',
  instagram:
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5-3a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 17 6z"/>',
  github:
    '<path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5 0 0 .38.72.86 1.04.54.38 1.26.5 1.97.5s1.43-.12 1.97-.5c.48-.32.86-1.04.86-1.04C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>',
  cv:
    '<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 15h6M9 18h4" fill="none" stroke="currentColor" stroke-width="1.5"/>'
};
function iconSvg(name){
  const body = ICONS[name] || ICONS.email;

  return `
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      ${body}
    </svg>
  `;
}

/* ---------------------------------------------------------------------- */
safe(() => { $('yr').textContent = new Date().getFullYear(); }, 'year');

/* ---------------------------------------------------------------------- */
/* THEME TOGGLE                                                            */
/* ---------------------------------------------------------------------- */
safe(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
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
    if (isDark) { root.removeAttribute('data-theme'); localStorage.setItem('theme', 'light'); }
    else { root.setAttribute('data-theme', 'dark'); localStorage.setItem('theme', 'dark'); }
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
/* SCROLL PROGRESS + NAV ACTIVE STATE + BACK TO TOP                        */
/* ---------------------------------------------------------------------- */
let sections = [];
safe(() => {
  const progressBar = $('reading-progress');
  const backToTop = $('backtotop');
  const navLinks = Array.from(document.querySelectorAll('#navlinks a'));
  sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function onScroll(){
    safe(() => {
      if (!progressBar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
    }, 'progress-bar');

    safe(() => {
      if (!backToTop) return;
      backToTop.classList.toggle('show', window.scrollY > 600);
    }, 'back-to-top-visibility');

    safe(() => {
      if (!sections.length) return;
      let currentId = sections[0].id;
      for (const sec of sections) { if (sec.getBoundingClientRect().top - 120 <= 0) currentId = sec.id; }
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + currentId));
    }, 'nav-active-state');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  onScroll();
}, 'scroll-tracking');

/* ---------------------------------------------------------------------- */
/* 1. PROFILE PHOTO                                                        */
/* ---------------------------------------------------------------------- */
safe(() => {
  const el = $('portraitPh');
  if (!el || typeof PROFILE_PHOTO === 'undefined' || !PROFILE_PHOTO) return;
  el.classList.add('has-photo');
  el.innerHTML = `<img src="${PROFILE_PHOTO}" alt="Shendi Moses Ginting">`;
}, 'profile-photo');

/* ---------------------------------------------------------------------- */
/* 4. PATH-SPECIFIC TAGS                                                   */
/* ---------------------------------------------------------------------- */
safe(() => {
  const el = $('pathTags');
  if (!el || typeof PATH_TAGS === 'undefined') return;
  el.innerHTML = PATH_TAGS.map(t => `<span class="field-tag">${t}</span>`).join('');
}, 'path-tags');

/* ---------------------------------------------------------------------- */
/* 5. STACK BADGES                                                         */
/* ---------------------------------------------------------------------- */
safe(() => {
  const el = $('stackBadges');
  if (!el || typeof STACK_BADGES === 'undefined') return;
  el.innerHTML = STACK_BADGES.map(b => {
    const logo = b.logo ? `&logo=${b.logo}&logoColor=white` : '';
    const alt = b.label.replace(/_/g, ' ').replace(/--/g, '-');
    return `<img src="https://img.shields.io/badge/${b.label}-${b.color}?style=flat-square${logo}" alt="${alt}" loading="lazy">`;
  }).join('');
}, 'stack-badges');

/* ---------------------------------------------------------------------- */
/* 3. SOCIAL ROW                                                           */
/* ---------------------------------------------------------------------- */
safe(() => {
  const el = $('socialRow');
  if (!el || typeof SOCIAL_LINKS === 'undefined') return;
  el.innerHTML = SOCIAL_LINKS.map(s => `
    <a href="${s.url}" aria-label="${s.label}" target="_blank" rel="noopener">${iconSvg(s.icon, s.icon !== 'email')}</a>
  `).join('');
}, 'social-row');

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
  const overlay = $('projModalOverlay');
  const slider = $('projSlider'), track = $('psTrack'), prev = $('psPrev'), next = $('psNext'), dotsWrap = $('psDots');
  if (!track || !slider) return;
  const n = images.length;
  let idx = 0;

  // Give the track and each slide an exact, unambiguous width instead of
  // relying on flex "min-width:100%" (which is what caused the old
  // half-slide glitch — the track had no defined width to be 100% of).
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

  // optional: left/right arrow keys while the modal is open (still user-triggered, nothing auto-advances)
  const onKey = (e) => {
    if (!overlay || !overlay.classList.contains('open')) { document.removeEventListener('keydown', onKey); return; }
    if (e.key === 'ArrowLeft') go(idx - 1);
    if (e.key === 'ArrowRight') go(idx + 1);
  };
  document.addEventListener('keydown', onKey);
}

function openProjectModal(id){
  safe(() => {
    const p = PROJECTS.find(x => x.id === id);
    const overlay = $('projModalOverlay'), panel = $('projModalPanel');
    if (!p || !overlay || !panel) return;
    panel.innerHTML = `
      <div class="modal-head">
        <div><span class="proj-cat">${p.category}${p.researchTag ? ' · Research' : ''}</span><h3 style="margin-top:6px;">${p.emoji} ${p.title}</h3></div>
        <button class="modal-close" id="projModalClose" aria-label="Close">✕</button>
      </div>
      ${sliderHtml(p.images)}
      <div class="modal-body">
        <h4>Overview</h4><p>${p.overview}</p>
        <h4>Contributions</h4><ul>${p.contributions.map(c => `<li>${c}</li>`).join('')}</ul>
        <h4>Stack</h4><p>${p.stack}</p>
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
  safe(() => { const o = $('projModalOverlay'); if (o) o.classList.remove('open'); document.body.style.overflow = ''; }, 'close-project-modal');
}
safe(() => { const o = $('projModalOverlay'); if (o) o.addEventListener('click', e => { if (e.target === e.currentTarget) closeProjectModal(); }); }, 'project-modal-overlay-click');

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeProjectModal(); closeCmdk(); } });

/* ---------------------------------------------------------------------- */
/* LINKS ROW (9 & 10)                                                      */
/* ---------------------------------------------------------------------- */
safe(() => {
  const el = $('linksRow');
  if (!el || typeof LINKS_ROW === 'undefined') return;
  el.innerHTML = LINKS_ROW.map(l => `
    <a class="link-chip" href="${l.url}" ${l.download ? 'download' : 'target="_blank" rel="noopener"'}>
      <span class="lc-icon">${iconSvg(l.icon, l.icon !== 'email')}</span>
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