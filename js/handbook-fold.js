/* ============================================================
   HANDBOOK PAGE FOLD — the ONLY JavaScript on this page.
   Without it the book still turns by clicking (pure CSS).

   How the fold works (real paper-fold geometry):
   1. You grab the free edge of a page at some height (y0).
   2. As you drag, the grabbed point moves to the pointer.
   3. The fold line is the perpendicular bisector between where
      the point started and where it is now.
   4. Everything beyond the fold line is mirrored across it and
      drawn as the flap (the back of the page), with a crease
      shadow. The rest of the page stays flat.
   5. The page stays pinned to the spine, so the grabbed point
      can only travel inside the "lens" where both spine ends
      keep their distance (a rigid sheet of paper).
   Grab a corner for a diagonal fold, the middle for a straight one.
   ============================================================ */
(function () {
  var hb = document.querySelector('.handbook');
  if (!hb || !window.PointerEvent) return;
  var book = hb.querySelector('.book'), stage = hb.querySelector('.stage');
  var drag = null, busy = false, suppress = false, THRESHOLD = 6;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function div(css) { var e = document.createElement('div'); e.style.cssText = css; return e; }

  /* the book slides sideways when the cover or back cover moves (fraction of a page width) */
  function bookShift(idx, tau) {
    if (idx === 1) return 0.5 * tau;
    if (idx === 6) return 0.5 + 0.5 * tau;
    return null;
  }
  function restShift() {
    return document.getElementById('p6').checked ? 1 : document.getElementById('p1').checked ? 0.5 : 0;
  }

  /* 2x3 affine matrices [a,b,c,d,e,f] exactly like CSS matrix(); mul(A,B) applies B first */
  function mul(A, B) {
    return [A[0]*B[0]+A[2]*B[1], A[1]*B[0]+A[3]*B[1], A[0]*B[2]+A[2]*B[3],
            A[1]*B[2]+A[3]*B[3], A[0]*B[4]+A[2]*B[5]+A[4], A[1]*B[4]+A[3]*B[5]+A[5]];
  }
  function m2s(M) { return 'matrix(' + M.map(function (n) { return n.toFixed(5); }).join(',') + ')'; }

  /* keep the part of a polygon on one side of the fold line (Sutherland-Hodgman) */
  function clipHalf(poly, mx, my, Fx, Fy, s) {
    var out = [], n = poly.length;
    for (var i = 0; i < n; i++) {
      var a = poly[i], b = poly[(i + 1) % n];
      var da = s * ((a[0] - Fx) * mx + (a[1] - Fy) * my);
      var db = s * ((b[0] - Fx) * mx + (b[1] - Fy) * my);
      if (da >= 0) out.push(a);
      if ((da >= 0) !== (db >= 0)) {
        var t = da / (da - db);
        out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      }
    }
    return out;
  }
  function proj(p, cx, cy, r) {
    var dx = p.x - cx, dy = p.y - cy, L = Math.hypot(dx, dy);
    if (L > r && L > 0) { p.x = cx + dx * r / L; p.y = cy + dy * r / L; }
  }

  /* a copy of one face of the page, without its click target */
  function face(src, W, H) {
    var c = src.cloneNode(true), t = c.querySelectorAll('.turn');
    for (var i = 0; i < t.length; i++) t[i].remove();
    c.style.cssText = 'position:absolute;left:0;top:0;right:auto;bottom:auto;width:' + W + 'px;height:' + H +
      'px;transform-origin:0 0;backface-visibility:visible;-webkit-backface-visibility:visible';
    return c;
  }

  /* build the temporary folding layers on top of the book */
  function build(d) {
    var W = d.W, H = d.H;
    d.OX = 2 * W; d.OY = H;
    var OW = 5 * W, OH = 3 * H;
    var full = 'position:absolute;left:0;top:0;width:' + OW + 'px;height:' + OH + 'px;';
    var ov = div('position:absolute;pointer-events:none;z-index:30;left:' + (-d.OX) + 'px;top:' + (-d.OY) +
                 'px;width:' + OW + 'px;height:' + OH + 'px');
    var front = d.leaf.querySelector('.hpage.front'), back = d.leaf.querySelector('.hpage.back');
    d.revealW = div(full);
    d.reveal = div('position:absolute;transform-origin:0 50%;background:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,.18) 35%,rgba(0,0,0,0))');
    d.revealW.appendChild(d.reveal);
    d.baseW = div(full);
    d.base = face(d.flipped ? back : front, W, H);
    d.baseW.appendChild(d.base);
    d.flapG = div(full + 'filter:drop-shadow(-3px 4px 7px rgba(0,0,0,.45))');
    d.flapW = div(full);
    d.flap = face(d.flipped ? front : back, W, H);
    d.flapShade = div('position:absolute;transform-origin:0 50%;background:linear-gradient(to right,rgba(0,0,0,.4) 0%,rgba(255,246,220,.3) 22%,rgba(0,0,0,.1) 70%,rgba(0,0,0,0))');
    d.flapW.appendChild(d.flap); d.flapW.appendChild(d.flapShade); d.flapG.appendChild(d.flapW);
    ov.appendChild(d.revealW); ov.appendChild(d.baseW); ov.appendChild(d.flapG);
    book.appendChild(ov);
    d.ov = ov;
  }

  function place(el, fo, ang, depth, W, H) {
    var LL = 3 * (W + H);
    el.style.left = fo[0] + 'px'; el.style.top = (fo[1] - LL / 2) + 'px';
    el.style.width = depth + 'px'; el.style.height = LL + 'px';
    el.style.transform = 'rotate(' + ang + 'rad)';
  }

  /* draw one frame. (px,py) = where the grabbed point of the page should be, in page
     coordinates: x measured from the spine along the page (flip-independent), y down. */
  function render(d, px, py) {
    var W = d.W, H = d.H, s = d.sigma, x0 = W, y0 = d.y0, OX = d.OX, OY = d.OY;
    var p = { x: Math.min(px, W), y: py };
    var r0 = Math.hypot(W, y0), r1 = Math.hypot(W, H - y0);          /* page is pinned to the spine */
    for (var i = 0; i < 12; i++) { proj(p, 0, 0, r0); proj(p, 0, H, r1); }
    d.p = p;

    var tauTurn = clamp((W - p.x) / (2 * W), 0, 1);
    var sh = bookShift(d.idx, d.flipped ? 1 - tauTurn : tauTurn);
    if (sh !== null) { book.style.transform = 'translateX(' + (sh * 100) + '%)'; d.shiftPx = sh * W; }

    var SO = [s, 0, 0, 1, OX, OY];
    var Mb = d.flipped ? [-1, 0, 0, 1, W, 0] : [1, 0, 0, 1, 0, 0];
    var Mf = d.flipped ? [1, 0, 0, 1, 0, 0] : [-1, 0, 0, 1, W, 0];
    d.base.style.transform = m2s(mul(SO, Mb));

    var dx = x0 - p.x, dy = y0 - p.y, L = Math.hypot(dx, dy);
    if (L < 0.8) {                                                    /* not folded yet */
      d.baseW.style.display = 'block'; d.baseW.style.clipPath = 'none';
      d.flapG.style.display = 'none'; d.revealW.style.display = 'none';
      return;
    }
    var mx = dx / L, my = dy / L;                                     /* points from pointer back to the grab point */
    var Fx = (x0 + p.x) / 2, Fy = (y0 + p.y) / 2, Fm = Fx * mx + Fy * my;
    var rect = [[0, 0], [W, 0], [W, H], [0, H]];
    var near = clipHalf(rect, mx, my, Fx, Fy, -1);                    /* stays flat */
    var far = clipHalf(rect, mx, my, Fx, Fy, 1);                      /* gets folded over */
    function toO(q) { return (s * q[0] + OX).toFixed(1) + 'px ' + (q[1] + OY).toFixed(1) + 'px'; }

    d.baseW.style.display = near.length > 2 ? 'block' : 'none';
    if (near.length > 2) d.baseW.style.clipPath = 'polygon(' + near.map(toO).join(',') + ')';

    var on = far.length > 2;
    d.flapG.style.display = on ? 'block' : 'none';
    d.revealW.style.display = on ? 'block' : 'none';
    if (!on) return;
    var refl = far.map(function (q) {
      var k = 2 * (q[0] * mx + q[1] * my - Fm);
      return [q[0] - k * mx, q[1] - k * my];
    });
    d.flapW.style.clipPath = 'polygon(' + refl.map(toO).join(',') + ')';
    var Rm = [1 - 2*mx*mx, -2*mx*my, -2*mx*my, 1 - 2*my*my, 2*Fm*mx, 2*Fm*my];
    d.flap.style.transform = m2s(mul(SO, mul(Rm, Mf)));
    d.revealW.style.clipPath = 'polygon(' + far.map(toO).join(',') + ')';
    var fo = [s * Fx + OX, Fy + OY];
    place(d.reveal, fo, Math.atan2(my, s * mx), 0.22 * W, W, H);
    place(d.flapShade, fo, Math.atan2(-my, -s * mx), 0.30 * W, W, H);
  }

  hb.addEventListener('pointerdown', function (e) {
    if (busy || (e.pointerType === 'mouse' && e.button !== 0)) return;
    var t = e.target.closest('.turn');
    if (!t) return;
    var leaf = t.closest('.leaf');
    var idx = +leaf.className.match(/\bl(\d)\b/)[1];
    var box = document.getElementById('p' + idx);
    var br = book.getBoundingClientRect(), sr = stage.getBoundingClientRect();
    var W = br.width, H = br.height, flipped = box.checked, sigma = flipped ? -1 : 1;
    var baseLeft = sr.left + (sr.width - W) / 2;                      /* book position with no sliding */
    var shift0 = restShift() * W;
    var xs0 = e.clientX - (baseLeft + shift0);
    var y0 = clamp(e.clientY - br.top, 0, H);
    drag = {
      id: e.pointerId, el: t, leaf: leaf, idx: idx, box: box, flipped: flipped, sigma: sigma,
      W: W, H: H, top: br.top, baseLeft: baseLeft, shiftPx: shift0,
      y0: y0, gx: sigma * W - xs0, gy: y0 - (e.clientY - br.top),
      sx: e.clientX, sy: e.clientY, lx: e.clientX, lt: performance.now(), vx: 0, on: false, p: { x: W, y: y0 }
    };
  });

  hb.addEventListener('pointermove', function (e) {
    var d = drag;
    if (!d || e.pointerId !== d.id) return;
    if (!d.on) {
      if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < THRESHOLD) return;
      d.on = true; suppress = true;
      try { d.el.setPointerCapture(e.pointerId); } catch (_) {}
      build(d);
      d.leaf.style.opacity = '0';                                     /* the fold layers replace the leaf while dragging */
      if (bookShift(d.idx, 0) !== null) book.style.transition = 'none';
      hb.classList.add('is-dragging');
    }
    var now = performance.now();
    d.vx = (e.clientX - d.lx) / Math.max(1, now - d.lt);
    d.lx = e.clientX; d.lt = now;
    var lx = e.clientX - (d.baseLeft + d.shiftPx), ly = e.clientY - d.top;
    render(d, d.sigma * (lx + d.gx), ly + d.gy);
  });

  function finish(d, flipped) {
    d.leaf.style.transition = 'none'; book.style.transition = 'none';
    d.box.checked = flipped;                                          /* CSS now shows the same picture, so nothing jumps */
    d.leaf.style.opacity = '';
    book.style.transform = '';
    d.ov.remove();
    void d.leaf.offsetWidth;
    d.leaf.style.transition = ''; book.style.transition = '';
    hb.classList.remove('is-dragging');
    busy = false;
    setTimeout(function () { suppress = false; }, 60);
  }

  function end(e) {
    var d = drag;
    if (!d || e.pointerId !== d.id) return;
    drag = null;
    if (!d.on) return;                                                /* plain click: CSS handles it */
    busy = true;
    var turn = clamp((d.W - d.p.x) / (2 * d.W), 0, 1);
    var complete = turn > 0.5 || (d.sigma * d.vx < -0.4 && turn > 0.12);
    var target = { x: complete ? -d.W : d.W, y: d.y0 };
    var from = { x: d.p.x, y: d.p.y }, t0 = performance.now();
    var dur = 240 + 380 * Math.hypot(target.x - from.x, target.y - from.y) / (2 * d.W);
    (function step(now) {
      var k = clamp((now - t0) / dur, 0, 1);
      var ease = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      render(d, from.x + (target.x - from.x) * ease, from.y + (target.y - from.y) * ease);
      if (k < 1) requestAnimationFrame(step);
      else finish(d, complete ? !d.flipped : d.flipped);
    })(t0);
  }
  hb.addEventListener('pointerup', end);
  hb.addEventListener('pointercancel', end);

  /* a drag must not also count as a click */
  document.addEventListener('click', function (e) {
    if (suppress || busy) { e.preventDefault(); e.stopPropagation(); suppress = false; }
  }, true);
})();
