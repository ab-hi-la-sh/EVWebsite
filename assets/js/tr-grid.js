/* Triplets — kinetic grid background.
   Warps toward the pointer, ripples on click. Brand palette: ink surface,
   hairline white grid, mineral-tint activation. Static fallback when the
   user prefers reduced motion. Mounts into any [data-tr-grid] element. */
(function () {
  var CELL = 64, INFLUENCE = 260, MAX_WARP = 22, DOT_SPACING = 32, LERP = 0.08;
  var LINE_BASE = { r: 255, g: 255, b: 255, a: 0.075 };
  var LINE_ON = { r: 159, g: 196, b: 214, a: 0.72 };
  var NODE_BASE = { r: 226, g: 230, b: 235, a: 0.14 };
  var NODE_ON = { r: 200, g: 226, b: 240, a: 0.95 };
  var GLOW = '159,196,214', RIPPLE = '159,196,214';
  var R_MIN = 1.3, R_MAX = 2.9;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ln(a, b, t) { return a + (b - a) * t; }
  function lc(base, on, t) {
    return 'rgba(' + Math.round(ln(base.r, on.r, t)) + ',' + Math.round(ln(base.g, on.g, t)) + ',' +
      Math.round(ln(base.b, on.b, t)) + ',' + ln(base.a, on.a, t).toFixed(3) + ')';
  }

  function mount(host) {
    var canvas = document.createElement('canvas');
    canvas.className = 'tr-grid__canvas';
    canvas.setAttribute('aria-hidden', 'true');
    host.insertBefore(canvas, host.firstChild);
    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var mouse = { x: -9999, y: -9999 }, target = { x: -9999, y: -9999 };
    var ripples = [], raf = 0, running = false;

    function size() {
      var r = host.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function warp(gx, gy, col, row, cols, rows) {
      var m = 1.5;
      var cp = Math.min(col / m, (cols - 1 - col) / m, 1);
      var rp = Math.min(row / m, (rows - 1 - row) / m, 1);
      var pin = cp * cp * rp * rp;
      var dx = gx - mouse.x, dy = gy - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var prox = Math.max(0, 1 - dist / INFLUENCE) * pin;
      var rx = 0, ry = 0, i, r, rdx, rdy, rdist, diff, strength, angle, sign;
      for (i = 0; i < ripples.length; i++) {
        r = ripples[i];
        rdx = gx - r.x; rdy = gy - r.y;
        rdist = Math.sqrt(rdx * rdx + rdy * rdy);
        diff = rdist - r.radius;
        if (Math.abs(diff) < 55) {
          strength = (1 - Math.abs(diff) / 55) * r.opacity * 16 * pin;
          angle = Math.atan2(rdy, rdx);
          sign = diff < 0 ? -1 : 1;
          rx += Math.cos(angle) * strength * sign * -1;
          ry += Math.sin(angle) * strength * sign * -1;
        }
      }
      if (dist < INFLUENCE && dist > 0 && pin > 0) {
        var t = dist / INFLUENCE;
        var eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
        var amt = eased * MAX_WARP * pin;
        var a2 = Math.atan2(dy, dx);
        return { x: gx - Math.cos(a2) * amt + rx, y: gy - Math.sin(a2) * amt + ry, p: prox };
      }
      return { x: gx + rx, y: gy + ry, p: prox };
    }

    function draw(now) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(255,255,255,0.035)';
      for (var dx2 = DOT_SPACING / 2; dx2 < W; dx2 += DOT_SPACING) {
        for (var dy2 = DOT_SPACING / 2; dy2 < H; dy2 += DOT_SPACING) {
          ctx.beginPath(); ctx.arc(dx2, dy2, 0.7, 0, 6.2832); ctx.fill();
        }
      }
      for (var i = ripples.length - 1; i >= 0; i--) {
        var age = (now - ripples[i].born) / 1000;
        ripples[i].radius = Math.max(0, age * 380);
        ripples[i].opacity = Math.max(0, 1 - age * 1.2);
        if (ripples[i].opacity <= 0) ripples.splice(i, 1);
      }
      var cols = Math.max(2, Math.ceil(W / CELL)) + 1, rows = Math.max(2, Math.ceil(H / CELL)) + 1;
      var cw = W / (cols - 1), ch = H / (rows - 1);
      var pts = [], row, col;
      for (row = 0; row < rows; row++) {
        pts[row] = [];
        for (col = 0; col < cols; col++) pts[row][col] = warp(col * cw, row * ch, col, row, cols, rows);
      }
      function seg(a, b) {
        var avg = (a.p + b.p) / 2, t = avg * avg * (3 - 2 * avg);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = lc(LINE_BASE, LINE_ON, t);
        ctx.lineWidth = ln(0.75, 1.35, t); ctx.stroke();
      }
      for (row = 0; row < rows; row++) for (col = 0; col < cols - 1; col++) seg(pts[row][col], pts[row][col + 1]);
      for (col = 0; col < cols; col++) for (row = 0; row < rows - 1; row++) seg(pts[row][col], pts[row + 1][col]);
      for (row = 0; row < rows; row++) {
        for (col = 0; col < cols; col++) {
          var p = pts[row][col], t2 = p.p * p.p * (3 - 2 * p.p), rr = ln(R_MIN, R_MAX, t2);
          if (t2 > 0.3) {
            var gr = rr + ln(0, 6, (t2 - 0.3) / 0.7);
            var grd = ctx.createRadialGradient(p.x, p.y, rr * 0.5, p.x, p.y, gr);
            grd.addColorStop(0, 'rgba(' + GLOW + ',' + (t2 * 0.26).toFixed(3) + ')');
            grd.addColorStop(1, 'rgba(' + GLOW + ',0)');
            ctx.beginPath(); ctx.arc(p.x, p.y, gr, 0, 6.2832); ctx.fillStyle = grd; ctx.fill();
          }
          ctx.beginPath(); ctx.arc(p.x, p.y, rr, 0, 6.2832);
          ctx.fillStyle = lc(NODE_BASE, NODE_ON, t2); ctx.fill();
        }
      }
      for (var k = 0; k < ripples.length; k++) {
        ctx.beginPath(); ctx.arc(ripples[k].x, ripples[k].y, Math.max(0, ripples[k].radius), 0, 6.2832);
        ctx.strokeStyle = 'rgba(' + RIPPLE + ',' + (ripples[k].opacity * 0.26).toFixed(3) + ')';
        ctx.lineWidth = 1.2; ctx.stroke();
      }
    }

    function frame(now) {
      mouse.x = ln(mouse.x, target.x, LERP);
      mouse.y = ln(mouse.y, target.y, LERP);
      draw(now);
      raf = requestAnimationFrame(frame);
    }
    function start() { if (running || reduce) return; running = true; raf = requestAnimationFrame(frame); }
    function stop() { if (!running) return; running = false; cancelAnimationFrame(raf); }

    size();
    if (reduce) { draw(0); }
    else {
      host.addEventListener('pointermove', function (e) {
        var r = host.getBoundingClientRect();
        target.x = e.clientX - r.left; target.y = e.clientY - r.top;
        if (mouse.x === -9999) { mouse.x = target.x; mouse.y = target.y; }
      });
      host.addEventListener('pointerleave', function () { target.x = -9999; target.y = -9999; });
      host.addEventListener('pointerdown', function (e) {
        var r = host.getBoundingClientRect();
        ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, radius: 0, opacity: 1, born: performance.now() });
      });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) { es[0].isIntersecting ? start() : stop(); }, { threshold: 0 }).observe(host);
      } else start();
    }
    window.addEventListener('resize', function () { size(); if (reduce) draw(0); });
  }

  function init() {
    [].slice.call(document.querySelectorAll('[data-tr-grid]')).forEach(mount);
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
