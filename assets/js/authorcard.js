/* Byline author card: a fixed popover shown near its trigger on hover/focus.
   Each popover is relocated to <body> on init so it escapes the article
   hero's stacking context and overflow:hidden.

   Hiding rule: the card closes as soon as the pointer is over neither the
   author name nor the card itself. A small invisible bridge (.bl-acard__pop
   ::before, in CSS) spans the gap so the card stays reachable for clicking
   LinkedIn / Full profile. Progressive enhancement -- the byline is a plain
   link without JS. */
(function () {
  if (window.__evAuthorCard) return;
  window.__evAuthorCard = true;

  var GAP = 8, MARGIN = 12;
  var openCard = null;

  function place(card) {
    var pop = card._pop;
    if (!pop) return;
    // The card always has layout (hidden via opacity/visibility, not display),
    // so it can be measured without any inline-style toggling.
    var r = card.getBoundingClientRect();
    var pw = pop.offsetWidth, ph = pop.offsetHeight;
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;

    var left = r.left;
    if (left + pw > vw - MARGIN) left = vw - MARGIN - pw;
    if (left < MARGIN) left = MARGIN;

    var top = r.bottom + GAP;
    if (top + ph > vh - MARGIN && r.top - GAP - ph > MARGIN) top = r.top - GAP - ph;

    pop.style.left = Math.round(left) + 'px';
    pop.style.top = Math.round(top) + 'px';
  }

  function show(card) {
    if (openCard && openCard !== card) close(openCard);
    openCard = card;
    card._pop.classList.add('is-open');
    card._pop.setAttribute('aria-hidden', 'false');
    place(card);
  }

  function close(card) {
    if (!card) return;
    card._pop.classList.remove('is-open');
    card._pop.setAttribute('aria-hidden', 'true');
    if (openCard === card) openCard = null;
  }

  function overOpen(node) {
    return openCard && (openCard.contains(node) || openCard._pop.contains(node));
  }

  var cards = document.querySelectorAll('.bl-acard');
  for (var i = 0; i < cards.length; i++) {
    (function (card) {
      var pop = card.querySelector('.bl-acard__pop');
      if (!pop) return;
      document.body.appendChild(pop); // escape hero stacking context / overflow
      card._pop = pop;

      card.addEventListener('mouseenter', function () { show(card); });
      card.addEventListener('focusin', function () { show(card); });
      card.addEventListener('focusout', function (e) {
        if (!card.contains(e.relatedTarget) && !pop.contains(e.relatedTarget)) close(card);
      });
    })(cards[i]);
  }

  // The pointer left both the name and the card -> hide immediately.
  document.addEventListener('mousemove', function (e) {
    if (openCard && !overOpen(e.target)) close(openCard);
  });
  // Pointer left the document entirely.
  document.addEventListener('mouseleave', function () { if (openCard) close(openCard); });

  window.addEventListener('scroll', function () { if (openCard) place(openCard); }, true);
  window.addEventListener('resize', function () { if (openCard) place(openCard); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openCard) close(openCard);
  });
})();
