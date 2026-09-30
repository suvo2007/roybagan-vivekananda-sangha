(function () {
  var d = document, h = d.querySelector('header'), b = d.querySelector('.burger'), sh = d.getElementById('shade');
  if (b) {
    function tog(v) { h.classList[v ? 'add' : 'remove']('open'); d.body.style.overflow = v ? 'hidden' : ''; b.setAttribute('aria-expanded', v); }
    b.addEventListener('click', function () { tog(!h.classList.contains('open')); });
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
