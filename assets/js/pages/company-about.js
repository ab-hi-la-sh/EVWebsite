/* company/about.html — page-scoped behaviour */

/* Hero sonar grid: a quiet dot field that emits slow expanding rings.
   Vanilla port of the SonarGrid canvas component, tuned to the brand's
   "engineered calm": Mineral Blue dots (from the canvas's CSS color), slow
   sparse pings, no cursor change. Idles between rings, pauses off-screen and
   in hidden tabs, and draws a still grid under prefers-reduced-motion. */
(function(){
  var canvas = document.querySelector('.ab-sonar');
  if (!canvas) return;
  var host = canvas.parentElement;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var o = {
    spacing: 26,        // px between dots
    dotRadius: 1.5,     // resting radius
    baseOpacity: 0.3,   // resting alpha
    pingEvery: 4,       // seconds between ambient pings
    speed: 190,         // wavefront px/s
    ringWidth: 90,      // wavefront thickness
    amplitude: 2.0,     // growth at the peak
    maxRings: 4,
    pingArea: [0.12, 0.2, 0.88, 0.8]
  };
  var TAU = Math.PI * 2;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var rings = [];
  var width = 0, height = 0, raf = 0, timer = 0, visible = true, seeded = false;
  var fill = getComputedStyle(canvas).color;
  var nextPing = performance.now() + o.pingEvery * 1000;

  function addRing(x, y, born){
    rings.push({x: x, y: y, born: born});
    while (rings.length > o.maxRings) rings.shift();
  }

  function draw(now){
    var lifetime = (Math.hypot(width, height) + o.ringWidth) / o.speed;
    rings = rings.filter(function(r){ return (now - r.born) / 1000 < lifetime; });
    var live = rings.map(function(r){
      var age = (now - r.born) / 1000, radius = age * o.speed;
      return {x: r.x, y: r.y, radius: radius, reach: radius + o.ringWidth, fade: 1 - age / lifetime};
    });

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = fill;
    var cols = Math.ceil(width / o.spacing) + 1, rows = Math.ceil(height / o.spacing) + 1;
    var offX = (width - (cols - 1) * o.spacing) / 2, offY = (height - (rows - 1) * o.spacing) / 2;

    // Pass 1: every resting dot in one path.
    var hot = [];
    ctx.globalAlpha = o.baseOpacity;
    ctx.beginPath();
    for (var i = 0; i < cols; i++){
      var cx = offX + i * o.spacing;
      for (var j = 0; j < rows; j++){
        var cy = offY + j * o.spacing, energy = 0;
        for (var n = 0; n < live.length; n++){
          var r = live[n];
          if (Math.abs(cx - r.x) > r.reach || Math.abs(cy - r.y) > r.reach) continue;
          var d = Math.abs(Math.hypot(cx - r.x, cy - r.y) - r.radius);
          if (d >= o.ringWidth) continue;
          var t = 1 - d / o.ringWidth, k = t * t * (3 - 2 * t) * r.fade;
          if (k > energy) energy = k;
        }
        if (energy < 0.01){ ctx.moveTo(cx + o.dotRadius, cy); ctx.arc(cx, cy, o.dotRadius, 0, TAU); }
        else hot.push(cx, cy, energy);
      }
    }
    ctx.fill();

    // Pass 2: dots on a wavefront get their own alpha and size.
    for (var h = 0; h < hot.length; h += 3){
      var e = hot[h + 2];
      ctx.globalAlpha = o.baseOpacity + (1 - o.baseOpacity) * e;
      ctx.beginPath();
      ctx.arc(hot[h], hot[h + 1], o.dotRadius * (1 + o.amplitude * e), 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function resize(){
    var rect = host.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!seeded){
      // One ring already mid-expansion so the first paint shows the idea.
      seeded = true;
      var a = o.pingArea;
      if (!reduce.matches) addRing(width * (a[0] + (a[2] - a[0]) * 0.68), height * (a[1] + (a[3] - a[1]) * 0.34), performance.now() - 500);
    }
    draw(performance.now());
  }

  function scheduleIdle(delay){
    clearTimeout(timer);
    timer = setTimeout(function(){ tick(performance.now()); }, Math.max(16, delay));
  }

  function tick(now){
    raf = 0;
    if (!visible || document.hidden) return;
    if (reduce.matches){ rings = []; draw(now); return; }
    if (now >= nextPing){
      var a = o.pingArea;
      addRing(width * (a[0] + Math.random() * (a[2] - a[0])), height * (a[1] + Math.random() * (a[3] - a[1])), now);
      nextPing = now + o.pingEvery * 1000;
    }
    draw(now);
    if (rings.length) raf = requestAnimationFrame(tick);
    else scheduleIdle(nextPing - now);
  }

  function wake(){
    if (!raf){ clearTimeout(timer); raf = requestAnimationFrame(tick); }
  }

  host.addEventListener('pointerdown', function(e){
    if (reduce.matches) return;
    var rect = host.getBoundingClientRect();
    addRing(e.clientX - rect.left, e.clientY - rect.top, performance.now());
    wake();
  });
  document.addEventListener('visibilitychange', function(){ if (!document.hidden) wake(); });
  if (reduce.addEventListener) reduce.addEventListener('change', wake);
  new ResizeObserver(resize).observe(host);
  new IntersectionObserver(function(entries){
    visible = entries[0] ? entries[0].isIntersecting : true;
    if (visible) wake();
  }).observe(host);

  resize();
  wake();
})();
