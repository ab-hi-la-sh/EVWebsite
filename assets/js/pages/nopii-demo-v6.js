/* NoPII demo page: "Through the proxy" walkthrough, "In the browser" iframe, tab switching.
   Ported from nopii.co's #demo section. Detection runs locally on built-in patterns
   unless the section declares data-api (see below), so visitor text stays in the browser. */
(function () {
  var root = document.getElementById('demo');
  if (!root) return;

  var SAMPLES = [
    { label: 'Healthcare Claim', icon: '🏥', text: 'Patient John Smith (DOB: 03/15/1985, SSN: 423-58-7194) was seen at Springfield Medical Center. Contact: john.smith@email.com, phone: (555) 234-5678.' },
    { label: 'Financial Summary', icon: '💳', text: 'Account holder Sarah Johnson, SSN: 219-09-9999. Credit card 4111111111111111 shows recent charges. Email: sarah.j@company.com, phone: (555) 876-5432.' },
    { label: 'Legal Document', icon: '⚖️', text: 'Plaintiff: Michael Chen (DOB: 07/22/1990) residing at 456 Oak Avenue, San Francisco, CA 94102. Counsel: Attorney Lisa Park, email: lpark@lawfirm.com, phone: (555) 345-6789.' },
    { label: 'API Credentials', icon: '🔑', text: 'DevOps engineer Alex Rivera (alex.rivera@acme.io) submitted a config review. The staging environment uses OpenAI key sk-proj-Rf8kP2xN4mQ7vL3jT9wB5yH6 and Stripe key sk_test_51ABC123def456ghi789. Slack alerts go to xoxb-1234567890-abcdefghij.' }
  ];
  var STEP_NAMES = ['Original', 'Tokenized', 'LLM Response', 'Detokenized'];
  var STEP_DESC = ['PII entities detected in the input text', 'Sensitive data replaced with secure tokens', 'LLM processes the tokenized (safe) text', 'Tokens restored with original PII values'];
  var COLORS = { PERSON: '#2563EB', US_SSN: '#DC2626', EMAIL_ADDRESS: '#059669', PHONE_NUMBER: '#D97706', CREDIT_CARD: '#7C3AED', LOCATION: '#DB2777', CREDENTIAL: '#EA580C', DATE_TIME: '#0D9488', ACCOUNT_ID: '#0891B2' };
  var color = function (t) { return COLORS[t] || '#6B7280'; };

  /* ---- tiny DOM helper ------------------------------------------------ */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'style') n.style.cssText = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c != null) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }

  /* ---- local detection + simulated pipeline (same shape as the live API) */
  var RULES = [
    { type: 'EMAIL_ADDRESS', re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, score: 0.99 },
    { type: 'CREDENTIAL', re: /\b(?:sk-[A-Za-z0-9_-]{16,}|sk_(?:test|live)_[A-Za-z0-9]{10,}|xox[bap]-[A-Za-z0-9-]{10,})/g, score: 0.97 },
    { type: 'US_SSN', re: /\b\d{3}-\d{2}-\d{4}\b/g, score: 0.95 },
    { type: 'CREDIT_CARD', re: /\b\d{13,16}\b/g, score: 0.93 },
    { type: 'PHONE_NUMBER', re: /\(\d{3}\)\s?\d{3}-\d{4}|\b\d{3}-\d{3}-\d{4}\b/g, score: 0.9 },
    { type: 'DATE_TIME', re: /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g, score: 0.85 },
    { type: 'LOCATION', re: /\b\d+ [A-Z][a-z]+(?: [A-Z][a-z]+)* (?:Avenue|Ave|Street|St|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln)\b(?:, [A-Z][a-z]+(?: [A-Z][a-z]+)*, [A-Z]{2} \d{5})?/g, score: 0.8 },
    { type: 'ACCOUNT_ID', re: /\b(?:MRN|Member\s+ID|Group\s+ID|Patient\s+ID|Account(?:\s+(?:number|no\.?|#))?|Policy(?:\s+(?:number|no\.?|#))?)\s*[:#]?\s*((?:[A-Z]{2,5}-)?[A-Z]*\d[A-Z0-9-]{3,})/gi, group: 1, score: 0.8 },
    { type: 'LOCATION', re: /\b(?:of|in|from)\s+(Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming)\b/g, group: 1, score: 0.75 },
    { type: 'PERSON', re: /\b(?:[Pp]atient|[Pp]laintiff|[Dd]efendant|holder|[Ee]ngineer|[Aa]ttorney|[Cc]ounsel|[Cc]lient|[Cc]ustomer|[Ee]mployee|Mr\.|Ms\.|Mrs\.|Dr\.)[:]?\s+([A-Z][a-z]+ [A-Z][a-z]+)/g, group: 1, score: 0.85 },
    { type: 'PERSON', re: /\b(?:I am|I'm|my name is|name is)\s+([A-Z][a-z]+ [A-Z][a-z]+)/gi, group: 1, score: 0.8 },
    { type: 'PERSON', re: /\b([A-Z][a-z]+ [A-Z][a-z]+)(?= \(|,\s*SSN)/g, group: 1, score: 0.75 }
  ];

  function detect(text) {
    var found = [];
    RULES.forEach(function (r) {
      r.re.lastIndex = 0;
      var m;
      while ((m = r.re.exec(text))) {
        var val = r.group ? m[r.group] : m[0];
        var start = r.group ? m.index + m[0].indexOf(val) : m.index;
        found.push({ type: r.type, text: val, start: start, end: start + val.length, score: r.score });
        if (m[0].length === 0) r.re.lastIndex++;
      }
    });
    found.sort(function (a, b) { return a.start - b.start || b.end - a.end; });
    var out = [], end = -1;
    found.forEach(function (f) { if (f.start >= end) { out.push(f); end = f.end; } });
    return out;
  }

  function hex8(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return ('00000000' + (h >>> 0).toString(16)).slice(-8);
  }

  function simulate(text) {
    var ents = detect(text), tokenMap = {}, tokenized = '', last = 0, restored = [], seen = {};
    ents.forEach(function (e) {
      var tok = '[' + e.type + '_' + hex8(e.type + e.text) + ']';
      tokenMap[e.text] = tok;
      tokenized += text.slice(last, e.start) + tok;
      last = e.end;
      if (!seen[tok]) { seen[tok] = 1; restored.push({ token: tok, original: e.text, type: e.type }); }
    });
    tokenized += text.slice(last);
    var toks = restored.map(function (r) { return r.token; });
    var person = restored.filter(function (r) { return r.type === 'PERSON'; })[0];
    var other = restored.filter(function (r) { return r.type !== 'PERSON'; }).slice(0, 2);
    var reply;
    if (!toks.length) reply = 'I reviewed the message. It did not contain any sensitive values, so it reached me exactly as written.';
    else {
      reply = 'Thanks, I reviewed this message' + (person ? ' about ' + person.token : '') + '. ' +
        (other.length ? 'I can follow up using ' + other.map(function (o) { return o.token; }).join(' and ') + '. ' : '') +
        'I only ever saw these tokens, never the real values.';
    }
    var detok = reply;
    restored.forEach(function (r) { detok = detok.split(r.token).join(r.original); });
    return {
      original: { text: text, entities: ents },
      tokenized: { text: tokenized, token_map: tokenMap },
      llm_response: { text: reply, is_simulated: true },
      detokenized: { text: detok, restored_entities: restored }
    };
  }

  /* Optional live API: set data-api (and data-recaptcha) on #demo once the NoPII API
     allows this origin. On any failure we fall back to the local simulation. */
  var API = root.getAttribute('data-api') || '';
  var RECAPTCHA = root.getAttribute('data-recaptcha') || '';
  function process(text) {
    if (!API) return Promise.resolve({ steps: simulate(text), live: false });
    var tokenP = (window.grecaptcha && RECAPTCHA)
      ? window.grecaptcha.execute(RECAPTCHA, { action: 'demo_process' }).catch(function () {}) : Promise.resolve();
    return tokenP.then(function (tk) {
      var h = { 'Content-Type': 'application/json' };
      if (tk) h['X-Recaptcha-Token'] = tk;
      return fetch(API, { method: 'POST', headers: h, body: JSON.stringify({ text: text, simulate_llm: true }) });
    }).then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(function (j) { return { steps: j.steps, live: true }; })
      .catch(function () { return { steps: simulate(text), live: false }; });
  }

  /* ---- step renderers -------------------------------------------------- */
  function entChip(type, text) {
    var c = color(type);
    return el('span', { class: 'npd-ent', style: 'background:' + c + '1f;border-color:' + c + ';color:' + c, title: type }, [text, el('i', { style: 'background:' + c, text: type })]);
  }
  function tokenize(text, tokens, mk) {
    if (!tokens.length) return [document.createTextNode(text)];
    var re = new RegExp('(' + tokens.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')', 'g');
    return text.split(re).map(function (p) { return tokens.indexOf(p) > -1 ? mk(p) : document.createTextNode(p); });
  }
  function tokSpan(t) { return el('span', { class: 'npd-tok', text: t }); }

  function viewOriginal(d) {
    var parts = [], at = 0;
    d.entities.slice().sort(function (a, b) { return a.start - b.start; }).forEach(function (e) {
      if (e.start > at) parts.push(document.createTextNode(d.text.slice(at, e.start)));
      parts.push(entChip(e.type, d.text.slice(e.start, e.end)));
      at = e.end;
    });
    if (at < d.text.length) parts.push(document.createTextNode(d.text.slice(at)));
    var card = [el('h4', { text: 'Original Input' }), el('div', { class: 'npd-text' }, parts)];
    if (d.entities.length) {
      card.push(el('h5', { text: 'Detected Entities (' + d.entities.length + ')' }));
      card.push(el('div', { class: 'npd-rows' }, d.entities.map(function (e) {
        return el('div', { class: 'npd-row' }, [entChip(e.type, e.text), el('span', { class: 'npd-conf', text: Math.round(e.score * 100) + '% confidence' })]);
      })));
    }
    return card;
  }
  function viewTokenized(d) {
    var orig = Object.keys(d.token_map);
    var card = [el('h4', { text: 'Tokenized Text' }),
      el('div', { class: 'npd-text npd-text--mono' }, tokenize(d.text, orig.map(function (o) { return d.token_map[o]; }), tokSpan))];
    if (orig.length) {
      card.push(el('h5', { text: 'Token Map' }));
      var rows = orig.map(function (o) { return el('tr', {}, [el('td', {}, [tokSpan(d.token_map[o])]), el('td', { text: o })]); });
      card.push(el('div', { class: 'npd-tablewrap' }, [el('table', { class: 'npd-table' }, [
        el('thead', {}, [el('tr', {}, [el('th', { text: 'Token' }), el('th', { text: 'Original Value' })])]), el('tbody', {}, rows)])]));
    }
    return card;
  }
  function viewLLM(d) {
    var re = /(\[[A-Z_]+_[a-f0-9]+\])/g;
    var kids = d.text.split(re).map(function (p, i) { return i % 2 ? tokSpan(p) : document.createTextNode(p); });
    return [el('h4', {}, ['LLM Response', el('span', { class: 'npd-pill', text: d.is_simulated ? 'Simulated' : 'Real' })]),
      el('div', { class: 'npd-text npd-text--mono' }, kids),
      el('div', { class: 'npd-note', text: d.is_simulated
        ? 'This response was simulated to demonstrate the pipeline. In production, your actual LLM would process the tokenized text, never seeing real PII.'
        : 'This response was generated by a real LLM. Notice that the LLM only saw tokenized placeholders, never the actual PII.' })];
  }
  function viewDetok(d) {
    var parts = [], used = [], s = d.text;
    d.restored_entities.forEach(function (r) {
      var i = s.indexOf(r.original);
      if (i > -1) used.push({ start: i, end: i + r.original.length, type: r.type });
    });
    used.sort(function (a, b) { return a.start - b.start; });
    var at = 0;
    used.forEach(function (u) {
      if (u.start < at) return;
      if (u.start > at) parts.push(document.createTextNode(s.slice(at, u.start)));
      var c = color(u.type);
      parts.push(el('span', { style: 'background:' + c + '26;border-bottom:2px solid ' + c + ';color:' + c + ';border-radius:3px;padding:0 2px', title: 'Restored: ' + u.type, text: s.slice(u.start, u.end) }));
      at = u.end;
    });
    if (at < s.length) parts.push(document.createTextNode(s.slice(at)));
    var card = [el('h4', { text: 'Final Output (Detokenized)' }), el('div', { class: 'npd-text' }, parts)];
    if (d.restored_entities.length) {
      card.push(el('h5', { text: 'Restored Entities (' + d.restored_entities.length + ')' }));
      card.push(el('div', { class: 'npd-rows' }, d.restored_entities.map(function (r) {
        var c = color(r.type);
        return el('div', { class: 'npd-row' }, [tokSpan(r.token), el('span', { text: '→', style: 'color:#909AA6' }),
          el('span', { text: r.original, style: 'font-weight:500;color:' + c }),
          el('span', { class: 'npd-pill', style: 'background:' + c + '1f;color:' + c, text: r.type })]);
      })));
    }
    return card;
  }

  /* ---- proxy panel ------------------------------------------------------ */
  var proxy = document.getElementById('npd-proxy');
  var sel = -1, custom = '', steps = null, active = 0, busy = false, error = '', live = false;

  function current() { return sel > -1 ? SAMPLES[sel].text : custom; }

  function render() {
    proxy.textContent = '';
    if (error) proxy.appendChild(el('div', { class: 'npd-error', role: 'alert', text: error }));
    if (steps) return renderResult();

    proxy.appendChild(el('span', { class: 'npd-label', text: 'Choose an example or write your own:' }));
    proxy.appendChild(el('div', { class: 'npd-samples' }, SAMPLES.map(function (s, i) {
      var b = el('button', { class: 'npd-sample', type: 'button', 'aria-pressed': String(sel === i) }, [
        el('span', { class: 'npd-sample__icon', text: s.icon }), el('span', { class: 'npd-sample__name', text: s.label }),
        el('span', { class: 'npd-sample__text', text: s.text.length > 80 ? s.text.slice(0, 80) + '...' : s.text })]);
      b.addEventListener('click', function () { sel = i; custom = ''; render(); proxy.querySelector('.npd-sample[aria-pressed="true"]').focus(); });
      return b;
    })));
    var ta = el('textarea', { id: 'npd-custom', rows: '3', placeholder: 'Enter text containing PII (names, emails, phone numbers, SSNs, etc.)...' });
    ta.value = sel > -1 ? '' : custom;
    ta.addEventListener('focus', function () { if (sel > -1) { sel = -1; custom = ''; render(); proxy.querySelector('#npd-custom').focus(); } });
    ta.addEventListener('input', function () { custom = ta.value; sel = -1; go.disabled = !current().trim() || busy; });
    proxy.appendChild(el('div', { class: 'npd-custom' }, [el('label', { for: 'npd-custom', text: 'Or enter custom text:' }), ta]));

    var go = el('button', { class: 'npd-btn', type: 'button' }, busy ? [el('span', { class: 'npd-spin', 'aria-hidden': 'true' }), 'Processing...'] : ['Process with NoPII']);
    go.disabled = !current().trim() || busy;
    go.addEventListener('click', run);
    proxy.appendChild(el('div', { class: 'npd-actions' }, [go]));
    proxy.appendChild(el('p', { class: 'npd-notice', text: API ? 'Your text is sent to the NoPII demo API for detection and is not stored.' : 'Runs in your browser on built-in patterns. Your text does not leave this page.' }));
  }

  function run() {
    var t = current().trim();
    if (!t || busy) return;
    busy = true; error = ''; render();
    process(t).then(function (r) { steps = r.steps; live = r.live; active = 0; })
      .catch(function (e) { error = e && e.message ? e.message : 'An unexpected error occurred'; })
      .then(function () { busy = false; render(); });
  }

  function renderResult() {
    var views = [viewOriginal, viewTokenized, viewLLM, viewDetok], keys = ['original', 'tokenized', 'llm_response', 'detokenized'];
    var bar = el('div', { class: 'npd-steps' }, STEP_NAMES.map(function (n, i) {
      var b = el('button', { type: 'button', class: 'npd-step' + (i === active ? ' is-active' : i < active ? ' is-done' : ''), 'aria-label': 'Step ' + (i + 1) + ': ' + n, 'aria-current': i === active ? 'step' : 'false' },
        [el('span', { class: 'npd-step__n', text: i < active ? '✓' : String(i + 1) }), el('span', { class: 'npd-step__t', text: n })]);
      b.addEventListener('click', function () { active = i; render(); });
      return b;
    }));
    var prev = el('button', { class: 'npd-btn npd-btn--ghost npd-btn--sm', type: 'button', text: 'Previous' });
    var next = el('button', { class: 'npd-btn npd-btn--sm', type: 'button', text: 'Next' });
    prev.disabled = active === 0; next.disabled = active === 3;
    prev.addEventListener('click', function () { active--; render(); });
    next.addEventListener('click', function () { active++; render(); });
    var again = el('button', { class: 'npd-btn npd-btn--ghost', type: 'button', text: 'Try Another Example' });
    again.addEventListener('click', function () { steps = null; active = 0; error = ''; render(); });
    proxy.appendChild(el('div', {}, [bar, el('p', { class: 'npd-desc', text: STEP_DESC[active] }),
      el('div', { class: 'npd-card', 'aria-live': 'polite' }, views[active](steps[keys[active]])),
      el('div', { class: 'npd-nav' }, [prev, el('span', { text: 'Step ' + (active + 1) + ' of 4' }), next]),
      el('div', { class: 'npd-again' }, [again])]));
  }
  render();

  /* ---- tabs + browser-SDK iframe --------------------------------------- */
  var tabs = { proxy: document.getElementById('npd-tab-proxy'), sdk: document.getElementById('npd-tab-sdk') };
  var panels = { proxy: document.getElementById('npd-panel-proxy'), sdk: document.getElementById('npd-panel-sdk') };
  var sub = document.getElementById('npd-sub');
  var SUB = { proxy: sub.textContent, sdk: "NoPII runs in your user's browser. See who receives plaintext and who only ever sees tokens." };
  var frame = document.getElementById('npd-frame');

  function select(mode) {
    ['proxy', 'sdk'].forEach(function (m) {
      var on = m === mode;
      tabs[m].setAttribute('aria-selected', String(on));
      tabs[m].tabIndex = on ? 0 : -1;
      panels[m].hidden = !on;
    });
    sub.textContent = SUB[mode];
    if (mode === 'sdk' && !frame.getAttribute('src')) frame.setAttribute('src', frame.getAttribute('data-src'));
  }
  Object.keys(tabs).forEach(function (m) { tabs[m].addEventListener('click', function () { select(m); }); });
  document.getElementById('npd-tablist').addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    var m = tabs.proxy.getAttribute('aria-selected') === 'true' ? 'sdk' : 'proxy';
    select(m); tabs[m].focus();
  });
  function fromHash() {
    if (location.hash === '#demo-sdk') { select('sdk'); root.scrollIntoView(); }
  }
  fromHash();
  window.addEventListener('hashchange', fromHash);

  /* Parent side of the iframe's postMessage contract (same origin only). No apiUrl or
     recaptchaSiteKey is sent, so the embedded demo also detects on built-in patterns. */
  var P = 'nopii-sdk-demo:';
  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || e.source !== frame.contentWindow) return;
    var t = e.data && e.data.type;
    if (t === P + 'ready') frame.contentWindow.postMessage({ type: P + 'config', notifyUrl: '/contact/' }, location.origin);
    else if (t === P + 'height') {
      var h = Number(e.data.height);
      /* The demo reports documentElement.scrollHeight, which never drops below the iframe's
         own height. Same origin, so measure the content directly and let the frame shrink. */
      try { var b = frame.contentDocument.body; if (b && b.offsetHeight > 0) h = b.offsetHeight + 8; } catch (err) {}
      if (isFinite(h) && h > 0) frame.style.height = Math.min(Math.ceil(h), 6000) + 'px';
    }
  });
})();
