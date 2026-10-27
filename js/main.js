// ============================================================
//  Windows & Doors editorial — ranking page interactions
//  "View full profile" + company name -> company-profile-window.html?company=<key>
// ============================================================

// ---------- "View full profile" + clickable company name -> profile page ----------
document.querySelectorAll('.entry').forEach(function (entry) {
  var key = entry.getAttribute('data-company');
  if (!key) return;
  var href = 'company-profile-window.html?company=' + encodeURIComponent(key);

  var link = entry.querySelector('.viewp');
  if (link) link.setAttribute('href', href);

  // wrap the company name text in a link to the profile
  var h3 = entry.querySelector('h3');
  if (h3) {
    var flag = h3.querySelector('.pick-flag');
    var a = document.createElement('a');
    a.href = href;
    // move all text nodes (the company name) into the link, keep the pick-flag outside
    var nodes = Array.prototype.slice.call(h3.childNodes);
    nodes.forEach(function (n) {
      if (n === flag) return;
      a.appendChild(n);
    });
    h3.insertBefore(a, flag || null);
  }
});

// ---------- Animated score bars (0–5 scale) ----------
(function () {
  document.querySelectorAll('.scoreblock').forEach(function (block) {
    var numEl = block.querySelector('.num');
    if (!numEl) return;
    var val = parseFloat(numEl.textContent);
    if (isNaN(val)) return;
    var bar = document.createElement('div');
    bar.className = 'bar';
    var fill = document.createElement('span');
    bar.appendChild(fill);
    block.appendChild(bar);
    block._fill = fill;
    block._pct = Math.max(0, Math.min(100, (val / 5) * 100));
  });

  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var b = e.target;
        if (b._fill) b._fill.style.width = b._pct + '%';
        io.unobserve(b);
      }
    });
  }, { threshold: 0.3 }) : null;

  document.querySelectorAll('.scoreblock').forEach(function (b) {
    if (io) io.observe(b);
    else if (b._fill) b._fill.style.width = b._pct + '%';
  });
})();

// ---------- Add arrow class to footer/cta icons for hover nudge ----------
document.querySelectorAll('.foot .uil-arrow-up-right, .foot .uil-arrow-right').forEach(function (i) {
  i.classList.add('arrow');
});

// VISIT SITE for OWN company (#1)
document.querySelectorAll('.entry button.visit[data-site]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var url = btn.getAttribute('data-site');
    if (url) window.open(url, '_blank', 'noopener');
  });
});

// GET STARTED (promo)
var gs = document.getElementById('getStarted');
if (gs) gs.addEventListener('click', function () { window.open('https://www.windowscanada.com/', '_blank', 'noopener'); });

// Jump links -> scroll to the ranking
var rows = document.querySelector('.rows');
document.querySelectorAll('.jump').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    if (rows) rows.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Service tags -> active toggle
document.querySelectorAll('.entry .tags .t').forEach(function (t) {
  t.addEventListener('click', function () { t.classList.toggle('active'); });
});
