/* Copy button for every code panel on the site.
   A code panel is any element with a "*-code" class that has a "*-code__bar"
   title bar and one or more <pre> blocks (vp-code, np-code, uc2-code, bl-code).
   The button copies the text of all <pre> blocks in the panel, in order. */
(function(){
  var COPY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
  var DONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  function writeText(text){
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function(resolve, reject){
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  var bars = document.querySelectorAll('[class$="-code__bar"], [class*="-code__bar "]');
  Array.prototype.forEach.call(bars, function(bar){
    var panel = bar.parentElement;
    var pres = panel ? panel.querySelectorAll('pre') : [];
    if (!pres.length || bar.querySelector('.code-copy')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = COPY + '<span>Copy</span>';
    bar.appendChild(btn);

    var timer;
    btn.addEventListener('click', function(){
      var text = Array.prototype.map.call(pres, function(p){ return p.innerText.replace(/\s+$/, ''); }).join('\n\n');
      writeText(text).then(function(){
        btn.classList.add('is-done');
        btn.innerHTML = DONE + '<span>Copied</span>';
        btn.setAttribute('aria-label', 'Code copied');
        clearTimeout(timer);
        timer = setTimeout(function(){
          btn.classList.remove('is-done');
          btn.innerHTML = COPY + '<span>Copy</span>';
          btn.setAttribute('aria-label', 'Copy code');
        }, 1800);
      });
    });
  });
})();
