/* Interaksi situs: pengaturan baca, mode fokus, progres, pencarian, animasi, dan pengingat istirahat. */
(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var siteRoot = body.getAttribute('data-root') || '';
  var kind = body.getAttribute('data-kind') || '';
  var pagePath = body.getAttribute('data-page') || '';
  var pageTitle = body.getAttribute('data-title') || document.title;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = function () { return window.innerWidth <= 860; };

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* abaikan */ } }
  };
  var $ = function (id) { return document.getElementById(id); };
  var qsa = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var isDone = function (p) { return store.get('sea-done:' + p) === '1'; };

  /* ======================================================
     Preferensi baca
     ====================================================== */
  var DEFAULTS = { fs: '3', lh: 'normal', font: 'sans', width: 'normal', focus: false, rest: true };
  var prefs = (function () {
    var p = {};
    try { p = JSON.parse(store.get('sea-prefs') || '{}'); } catch (e) { p = {}; }
    for (var k in DEFAULTS) { if (p[k] === undefined) p[k] = DEFAULTS[k]; }
    return p;
  })();
  var theme = store.get('sea-theme') || 'auto';

  function savePrefs() { store.set('sea-prefs', JSON.stringify(prefs)); }
  function applyPrefs() {
    ['fs', 'lh', 'font', 'width'].forEach(function (k) {
      if (prefs[k] === DEFAULTS[k]) root.removeAttribute('data-' + k); else root.setAttribute('data-' + k, prefs[k]);
    });
    if (prefs.focus && !isMobile()) root.setAttribute('data-focus', '1'); else root.removeAttribute('data-focus');
    if (theme === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', theme);

    var fv = $('fs-val'); if (fv) fv.textContent = prefs.fs + '/5';
    qsa('[data-pref]').forEach(function (b) {
      var key = b.getAttribute('data-pref'), val = b.getAttribute('data-val');
      var cur = key === 'theme' ? theme : prefs[key];
      b.setAttribute('aria-pressed', String(cur === val));
    });
    var pf = $('pref-focus'); if (pf) pf.checked = !!prefs.focus;
    var pb = $('pref-break'); if (pb) pb.checked = !!prefs.rest;
    var fb = $('focus-btn'); if (fb) fb.setAttribute('aria-pressed', String(!!prefs.focus));
  }

  var prefsPanel = $('prefs');
  var aaBtn = $('aa-btn');
  function setPrefsOpen(open) {
    if (!prefsPanel) return;
    prefsPanel.hidden = !open;
    if (aaBtn) aaBtn.setAttribute('aria-expanded', String(open));
  }
  if (aaBtn) aaBtn.addEventListener('click', function (e) { e.stopPropagation(); setPrefsOpen(prefsPanel.hidden); });
  if ($('prefs-close')) $('prefs-close').addEventListener('click', function () { setPrefsOpen(false); });
  document.addEventListener('click', function (e) {
    if (prefsPanel && !prefsPanel.hidden && !prefsPanel.contains(e.target) && !(aaBtn && aaBtn.contains(e.target))) setPrefsOpen(false);
  });

  qsa('[data-pref]').forEach(function (b) {
    b.addEventListener('click', function () {
      var key = b.getAttribute('data-pref'), val = b.getAttribute('data-val');
      if (key === 'theme') { theme = val; store.set('sea-theme', val); } else { prefs[key] = val; savePrefs(); }
      applyPrefs();
    });
  });
  function stepFs(d) {
    var n = Math.min(5, Math.max(1, parseInt(prefs.fs, 10) + d));
    prefs.fs = String(n); savePrefs(); applyPrefs();
  }
  if ($('fs-down')) $('fs-down').addEventListener('click', function () { stepFs(-1); });
  if ($('fs-up')) $('fs-up').addEventListener('click', function () { stepFs(1); });
  if ($('pref-focus')) $('pref-focus').addEventListener('change', function (e) { prefs.focus = e.target.checked; savePrefs(); applyPrefs(); });
  if ($('pref-break')) $('pref-break').addEventListener('change', function (e) { prefs.rest = e.target.checked; savePrefs(); });
  if ($('focus-btn')) $('focus-btn').addEventListener('click', function () { prefs.focus = !prefs.focus; savePrefs(); applyPrefs(); });
  if ($('prefs-reset')) $('prefs-reset').addEventListener('click', function () {
    prefs = JSON.parse(JSON.stringify(DEFAULTS)); theme = 'auto';
    savePrefs(); store.set('sea-theme', 'auto'); applyPrefs();
  });
  window.addEventListener('resize', applyPrefs);
  applyPrefs();

  /* ======================================================
     Toast & konfeti
     ====================================================== */
  function toast(message, actionLabel, onAction, ttl) {
    var wrap = $('toasts'); if (!wrap) return;
    var t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<p></p>';
    t.firstChild.textContent = message;
    function close() { t.classList.add('out'); setTimeout(function () { t.remove(); }, 260); }
    if (actionLabel) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = actionLabel;
      b.addEventListener('click', function () { if (onAction) onAction(); close(); });
      t.appendChild(b);
    }
    wrap.appendChild(t);
    setTimeout(close, ttl || 5000);
  }

  function confetti() {
    if (reduced) return;
    var layer = document.createElement('div');
    layer.className = 'confetti';
    var colors = ['#ee4d2d', '#ff7a3d', '#ffb347', '#ffd29a', '#d92e12', '#ffffff'];
    for (var i = 0; i < 46; i++) {
      var p = document.createElement('i');
      p.style.left = (Math.random() * 100) + '%';
      p.style.background = colors[i % colors.length];
      p.style.setProperty('--x', ((Math.random() - .5) * 240) + 'px');
      p.style.setProperty('--r', (Math.random() * 360) + 'deg');
      p.style.setProperty('--d', (1.6 + Math.random() * 1.4) + 's');
      p.style.animationDelay = (Math.random() * .25) + 's';
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
    setTimeout(function () { layer.remove(); }, 3400);
  }

  /* ======================================================
     Menu (drawer)
     ====================================================== */
  var menuBtn = $('menu-btn');
  var bnMenu = $('bn-menu');
  var sidebar = $('sidebar');
  var scrim = $('scrim');
  function setMenu(open) {
    if (!sidebar) return;
    sidebar.classList.toggle('open', open);
    if (scrim) scrim.hidden = !open;
    body.classList.toggle('lock', open && (isMobile() || !!root.getAttribute('data-focus')));
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
  }
  function toggleMenu() { setMenu(!sidebar.classList.contains('open')); }
  if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
  if (bnMenu) bnMenu.addEventListener('click', toggleMenu);
  if (scrim) scrim.addEventListener('click', function () { setMenu(false); });
  if (sidebar) sidebar.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  window.addEventListener('resize', function () { if (!isMobile() && !root.getAttribute('data-focus')) setMenu(false); });

  var currentLink = document.querySelector('.sidebar a[aria-current="page"]');
  if (currentLink && currentLink.scrollIntoView) { currentLink.scrollIntoView({ block: 'center' }); }

  // geser dari tepi kiri untuk membuka menu, geser ke kiri untuk menutup
  (function () {
    var sx = null, sy = null, fromEdge = false;
    document.addEventListener('touchstart', function (e) {
      var t = e.touches[0]; sx = t.clientX; sy = t.clientY; fromEdge = sx < 22;
    }, { passive: true });
    document.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = Math.abs(t.clientY - sy);
      if (fromEdge && dx > 70 && dy < 60 && sidebar && !sidebar.classList.contains('open')) setMenu(true);
      else if (dx < -70 && dy < 60 && sidebar && sidebar.classList.contains('open')) setMenu(false);
      sx = null;
    }, { passive: true });
  })();

  /* ======================================================
     Checklist + progres per daftar
     ====================================================== */
  qsa('li.task input[type="checkbox"]').forEach(function (box) {
    var key = 'sea-cb:' + box.getAttribute('data-key');
    var saved = store.get(key);
    if (saved !== null) box.checked = saved === '1';
    box.addEventListener('change', function () { store.set(key, box.checked ? '1' : '0'); });
  });
  qsa('ul, ol').forEach(function (list) {
    var tasks = qsa(':scope > li.task', list);
    if (tasks.length < 2) return;
    var head = document.createElement('div');
    head.className = 'cl-progress';
    head.innerHTML = '<span class="cl-text"></span><span class="cl-bar"><i></i></span>';
    list.parentNode.insertBefore(head, list);
    var update = function (celebrate) {
      var n = tasks.filter(function (li) { return li.querySelector('input').checked; }).length;
      head.querySelector('.cl-text').textContent = n + '/' + tasks.length + ' selesai';
      head.querySelector('i').style.width = Math.round(n / tasks.length * 100) + '%';
      if (celebrate && n === tasks.length) toast('Satu checklist selesai. Kerja bagus!');
    };
    tasks.forEach(function (li) { li.querySelector('input').addEventListener('change', function () { update(true); }); });
    update(false);
  });

  /* ======================================================
     Progres belajar
     ====================================================== */
  qsa('.sidebar a[data-page], .link-card[data-page]').forEach(function (a) {
    if (isDone(a.getAttribute('data-page'))) a.classList.add('done');
  });

  function refreshProgress() {
    qsa('.nav-level[data-mods]').forEach(function (d) {
      var list = d.getAttribute('data-mods').split(',').filter(Boolean);
      var n = list.filter(isDone).length;
      var c = d.querySelector('.lv-count'); if (c) c.textContent = n + '/' + list.length;
    });
    var pc = document.querySelector('.progress-card');
    if (pc) {
      var mods = pc.getAttribute('data-modules').split(',').filter(Boolean);
      var n = mods.filter(isDone).length;
      pc.querySelector('.pc-text').textContent = n + ' dari ' + mods.length + ' modul selesai';
      pc.querySelector('.pc-bar i').style.width = Math.round(n / mods.length * 100) + '%';
    }
    qsa('.card[data-mods]').forEach(function (card) {
      var list = card.getAttribute('data-mods').split(',').filter(Boolean);
      var d = list.filter(isDone).length;
      var em = card.querySelector('.cm-done'); if (em) em.textContent = d;
      var bar = card.querySelector('.card-bar i'); if (bar) bar.style.width = Math.round(d / list.length * 100) + '%';
    });
  }
  refreshProgress();

  var doneBtn = $('mark-done');
  if (doneBtn) {
    var page = doneBtn.getAttribute('data-page');
    var render = function () {
      var done = isDone(page);
      doneBtn.classList.toggle('is-done', done);
      doneBtn.textContent = done ? 'Modul selesai ✓ (ketuk untuk batal)' : 'Tandai modul ini selesai';
      var link = document.querySelector('.sidebar a[data-page="' + page + '"]');
      if (link) link.classList.toggle('done', done);
      refreshProgress();
    };
    doneBtn.addEventListener('click', function () {
      var now = !isDone(page);
      store.set('sea-done:' + page, now ? '1' : '0');
      render();
      if (now) {
        confetti();
        var next = document.querySelector('.pager .next');
        toast('Modul selesai. Selamat!', next ? 'Lanjut' : null, function () { if (next) location.href = next.href; }, 6500);
      }
    });
    render();
  }

  /* ======================================================
     Hitung naik (statistik hero)
     ====================================================== */
  qsa('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduced || !target) return;
    var start = null;
    el.textContent = '0';
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / 900);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  /* ======================================================
     Muncul saat digulir (reveal) + bagian aktif
     ====================================================== */
  var reveals = qsa('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); rio.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    reveals.forEach(function (el, i) {
      // jeda kecil agar kartu yang tampil bersamaan muncul bergantian
      if (el.classList.contains('card') || el.classList.contains('link-card')) el.style.transitionDelay = (i % 5) * 70 + 'ms';
      rio.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
  // pengaman: elemen yang sudah terlihat tidak boleh tertahan tersembunyi
  setTimeout(function () {
    reveals.forEach(function (el) {
      if (el.classList.contains('in')) return;
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.1 && r.bottom > 0) el.classList.add('in');
    });
  }, 1500);

  var subbar = $('subbar');
  var sbTitle = subbar ? subbar.querySelector('.sb-title') : null;
  var sbPct = subbar ? subbar.querySelector('.sb-pct') : null;
  var baseTitle = (function () {
    if (kind === 'modul') { var m = pageTitle.match(/Modul\s+(\d+)/i); return m ? 'Modul ' + m[1] : pageTitle; }
    return pageTitle;
  })();
  var sections = qsa('.sec');
  var currentHeading = '';
  if ('IntersectionObserver' in window && sections.length) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          sections.forEach(function (s) { s.classList.remove('current'); });
          en.target.classList.add('current');
          var h = en.target.querySelector('h2 .h-text');
          currentHeading = h ? h.textContent : '';
        }
      });
    }, { rootMargin: '-38% 0px -58% 0px' });
    sections.forEach(function (s) { sio.observe(s); });
  }

  /* ======================================================
     Scroll: progres baca, bar atas, hide-on-scroll, ke atas, simpan posisi
     ====================================================== */
  var bar = $('read-progress');
  var toTop = $('to-top');
  var lastY = window.scrollY, ticking = false, lastSave = 0;

  function overlayOpen() {
    return body.classList.contains('search-open') || (sidebar && sidebar.classList.contains('open')) || (prefsPanel && !prefsPanel.hidden);
  }
  function onScroll() {
    var h = document.documentElement;
    var y = h.scrollTop;
    var max = h.scrollHeight - h.clientHeight;
    var p = max > 0 ? Math.min(1, y / max) : 0;
    if (bar) bar.style.transform = 'scaleX(' + p + ')';
    if (toTop) toTop.hidden = y < 700;

    if (subbar) {
      var show = y > 260 && kind !== 'index';
      subbar.classList.toggle('show', show);
      if (show) {
        if (sbTitle) sbTitle.textContent = baseTitle + (currentHeading ? ' · ' + currentHeading.replace(/^\d+\.\s*/, '') : '');
        if (sbPct) sbPct.textContent = Math.round(p * 100) + '%';
      }
    }

    var dy = y - lastY;
    if (!overlayOpen()) {
      if (dy > 10 && y > 140) body.classList.add('nav-hidden');
      else if (dy < -6 || y < 100 || (max - y) < 60) body.classList.remove('nav-hidden');
    }
    lastY = y;

    // simpan posisi baca (untuk "Lanjutkan membaca")
    var now = Date.now();
    if (kind !== 'index' && now - lastSave > 1200 && p > 0.03 && p < 0.97) {
      lastSave = now;
      store.set('sea-last', JSON.stringify({ page: pagePath, title: pageTitle, y: Math.round(p * 1000) / 1000, t: now }));
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); });

  // lanjutkan membaca
  var resume = $('resume');
  if (resume) {
    var last = null;
    try { last = JSON.parse(store.get('sea-last') || 'null'); } catch (e) { last = null; }
    if (last && last.page) {
      resume.hidden = false;
      resume.href = siteRoot + last.page + '#lanjut';
      resume.querySelector('.rc-title').textContent = last.title;
      resume.querySelector('.rc-meta').textContent = 'Terakhir dibaca sampai sekitar ' + Math.round(last.y * 100) + '%';
    }
  }
  if (location.hash === '#lanjut') {
    var saved = null;
    try { saved = JSON.parse(store.get('sea-last') || 'null'); } catch (e) { saved = null; }
    if (saved && saved.page === pagePath) {
      var target = saved.y * (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      window.scrollTo({ top: target, behavior: 'auto' });
      toast('Kembali ke posisi terakhirmu.', null, null, 2800);
    }
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
  }

  /* ======================================================
     Daftar isi aktif
     ====================================================== */
  var tocLinks = qsa('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove('active'); });
          var a = map[en.target.id];
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var h = $(id); if (h) io.observe(h); });
  }
  var tocMobile = document.querySelector('.toc-mobile');
  if (tocMobile) tocMobile.addEventListener('click', function (e) { if (e.target.closest('a')) tocMobile.open = false; });

  /* ======================================================
     Tombol salin pada blok rumus + buka semua jawaban
     ====================================================== */
  qsa('.prose pre').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'copy-btn'; btn.textContent = 'Salin';
    btn.addEventListener('click', function () {
      var text = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText;
      var done = function () { btn.textContent = 'Tersalin'; setTimeout(function () { btn.textContent = 'Salin'; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done); else done();
    });
    pre.appendChild(btn);
  });
  qsa('.sec-latihan').forEach(function (sec) {
    var answers = qsa('details.ans', sec);
    if (answers.length < 2) return;
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'btn-mini'; btn.textContent = 'Buka semua jawaban';
    var open = false;
    btn.addEventListener('click', function () {
      open = !open;
      answers.forEach(function (d) { d.open = open; });
      btn.textContent = open ? 'Tutup semua jawaban' : 'Buka semua jawaban';
    });
    var h2 = sec.querySelector('h2');
    if (h2 && h2.nextSibling) h2.parentNode.insertBefore(btn, h2.nextSibling);
  });

  /* ======================================================
     Pencarian
     ====================================================== */
  var input = $('search-input');
  var box = $('search-results');
  var closeBtn = $('search-close');
  var bnSearch = $('bn-search');

  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function closeResults() { if (box) box.hidden = true; }
  function openSearch() { body.classList.add('search-open'); body.classList.add('lock'); body.classList.remove('nav-hidden'); if (input) input.focus(); }
  function closeSearch() {
    body.classList.remove('search-open');
    body.classList.toggle('lock', !!(sidebar && sidebar.classList.contains('open')) && isMobile());
    closeResults();
    if (input) input.value = '';
  }
  function mark(text, terms) {
    var out = esc(text);
    terms.forEach(function (t) {
      if (!t) return;
      out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
    });
    return out;
  }
  function snippet(text, terms) {
    var low = text.toLowerCase(), pos = -1;
    for (var i = 0; i < terms.length && pos < 0; i++) pos = low.indexOf(terms[i]);
    if (pos < 0) pos = 0;
    var start = Math.max(0, pos - 40);
    return (start ? '…' : '') + text.slice(start, start + 120) + '…';
  }
  function search(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length || !window.SEARCH_INDEX) return [];
    var res = [];
    window.SEARCH_INDEX.forEach(function (e) {
      var h = e.h.toLowerCase(), p = e.p.toLowerCase(), x = e.x.toLowerCase(), score = 0, ok = true;
      terms.forEach(function (t) {
        var s = 0;
        if (h.indexOf(t) > -1) s += 8;
        if (p.indexOf(t) > -1) s += 3;
        if (x.indexOf(t) > -1) s += 1;
        if (!s) ok = false;
        score += s;
      });
      if (ok) res.push({ e: e, s: score });
    });
    res.sort(function (a, b) { return b.s - a.s; });
    return res.slice(0, 8);
  }

  if (bnSearch) bnSearch.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  if (input && box) {
    input.addEventListener('input', function () {
      var q = input.value.trim();
      if (q.length < 2) { closeResults(); return; }
      var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      var res = search(q);
      if (!res.length) {
        box.innerHTML = '<div class="search-empty">Tidak ada hasil untuk "' + esc(q) + '".</div>';
      } else {
        box.innerHTML = res.map(function (r) {
          return '<a href="' + siteRoot + r.e.u + '"><b>' + mark(r.e.h, terms) + '</b><small>' + esc(r.e.p) +
            '</small><small>' + mark(snippet(r.e.x, terms), terms) + '</small></a>';
        }).join('');
      }
      box.hidden = false;
    });
    document.addEventListener('click', function (e) {
      if (body.classList.contains('search-open')) return;
      if (!box.contains(e.target) && e.target !== input) closeResults();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setMenu(false); closeSearch(); setPrefsOpen(false); }
  });

  /* ======================================================
     Pengingat istirahat (tiap 25 menit membaca aktif)
     ====================================================== */
  var activeSeconds = 0;
  setInterval(function () {
    if (document.visibilityState !== 'visible' || !prefs.rest || kind === 'index') return;
    activeSeconds++;
    if (activeSeconds >= 25 * 60) {
      activeSeconds = 0;
      toast('Sudah sekitar 25 menit membaca. Istirahat sebentar: berdiri, minum, dan regangkan badan.', 'Oke', null, 12000);
    }
  }, 1000);
})();
