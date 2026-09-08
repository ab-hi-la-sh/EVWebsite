/* company/about.html — page-scoped behaviour */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var box = document.querySelector('.ab-grid__beams');
  if (!box || reduce) return;
  for (var i = 0; i < 34; i++){
    var b = document.createElement('div');
    b.className = 'ab-beam' + (Math.random() < 0.15 ? ' is-accent' : '');
    var dur = (Math.random()*3 + 5).toFixed(2);
    b.style.left = (Math.random()*100).toFixed(2) + '%';
    b.style.width = (Math.floor(Math.random()*2) + 1) + 'px';
    b.style.height = (28 + Math.random()*26).toFixed(0) + '%';
    b.style.setProperty('--d', dur + 's');
    b.style.setProperty('--delay', '-' + (Math.random()*dur).toFixed(2) + 's');
    box.appendChild(b);
  }
})();
