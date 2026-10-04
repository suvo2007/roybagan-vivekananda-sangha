(function () {
  // Google Translate sometimes injects its own notification banner at the
  // top of the page and pushes everything down — this keeps undoing that,
  // so the layout never looks broken/boxed because of it.
  (function killGTBanner() {
    var fix = function () {
      document.body.style.setProperty('top', '0px', 'important');
      document.documentElement.style.setProperty('top', '0px', 'important');
      var f = document.querySelector('iframe.goog-te-banner-frame, .goog-te-banner-frame');
      if (f) {
        f.style.setProperty('display', 'none', 'important');
        f.style.setProperty('visibility', 'hidden', 'important');
        f.style.setProperty('height', '0', 'important');
      }
    };
    setInterval(fix, 400);
    fix();
  })();

  // the menu already opens/closes with pure CSS via the hidden checkbox +
  // its label (works even if this script never loads). here we just sync
  // the checkbox state so the dimmed backdrop and auto-close-on-tap work too.
  var d = document, h = d.querySelector('header'), cb = d.getElementById('menuToggle'), sh = d.getElementById('shade');
  if (cb) {
    function tog(v) { cb.checked = v; h.classList[v ? 'add' : 'remove']('open'); d.body.style.overflow = v ? 'hidden' : ''; }
    cb.addEventListener('change', function () { tog(cb.checked); });
    if (sh) sh.addEventListener('click', function () { tog(false); });
    d.querySelectorAll('#menu a').forEach(function (a) { a.addEventListener('click', function () { tog(false); }); });
  }

  // hero slideshow
  var slides = d.querySelectorAll('.slide'), dots = d.getElementById('dots'), i = 0, t;
  if (slides.length) {
    slides.forEach(function (s, k) {
      var x = d.createElement('button'); x.type = 'button'; x.setAttribute('aria-label', 'ছবি ' + (k + 1));
      if (!k) x.className = 'on'; x.onclick = function () { go(k); }; dots.appendChild(x);
    });
    var db = dots.children;
    function go(n) { slides[i].classList.remove('on'); db[i].classList.remove('on'); i = n; slides[i].classList.add('on'); db[i].classList.add('on'); run(); }
    function run() { clearInterval(t); if (slides.length > 1 && !matchMedia('(prefers-reduced-motion:reduce)').matches) t = setInterval(function () { go((i + 1) % slides.length); }, 5000); }
    run();
  }

  // scroll reveal — content is visible by default in CSS; JS only adds the
  // "reveal-pre" class here (so if this script ever fails to load, every
  // section simply stays fully visible instead of disappearing).
  var els = d.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && els.length) {
    els.forEach(function (e) { e.classList.add('reveal-pre'); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('reveal-show'); io.unobserve(e.target); } });
    }, { threshold: .15 });
    els.forEach(function (e) { io.observe(e); });
  }
})();
