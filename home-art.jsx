/* global React */
/* Enigma Vault — custom brand artwork. Layered translucent panels, a mineral-blue
   focal passage, fine-rule crosshairs, sparse data fragments. Mineral blue only. */
const A = {
  ink: '#2A3340', mineral: '#0F3D56', m75: '#4B6E81', m50: '#879EAB', m25: '#C3CFD5',
  stone: '#E2E6EB', silver: '#C8CCD3', cloud: '#F0F2F5', slate: '#6B7280', white: '#FFFFFF',
  vaultCore: '#153A57',
};

function Tick({ x, y, s = 5, c = A.silver, o = 0.9 }) {
  return (
    <g stroke={c} strokeWidth="1" opacity={o}>
      <line x1={x - s} y1={y} x2={x + s} y2={y} />
      <line x1={x} y1={y - s} x2={x} y2={y + s} />
    </g>
  );
}
function isoPts(cx, cy, w, h) { return `${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}`; }

/* ---------- Hero: aperture / passage ---------- */
function HeroArt({ className, style }) {
  const W = 600, H = 480;
  const vp = [356, 224];
  const o = { x: 58, y: 66, w: 480, h: 332 };
  const N = 7;
  const frames = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1), k = t * 0.86;
    frames.push({ x: o.x + (vp[0] - o.x) * k, y: o.y + (vp[1] - o.y) * k, w: o.w * (1 - k), h: o.h * (1 - k), t });
  }
  const corners = [[o.x, o.y], [o.x + o.w, o.y], [o.x + o.w, o.y + o.h], [o.x, o.y + o.h]];
  const frags = [];
  for (let i = 0; i < 14; i++) {
    const a = 2.4 + i * 0.16, rad = 150 + i * 13;
    frags.push([vp[0] + Math.cos(a) * rad - 120, vp[1] + Math.sin(a) * rad * 0.7, 4 + (i % 4) * 2.4, 0.5 - i * 0.03]);
  }
  return (
    <svg className={className} style={style} viewBox={`0 0 ${W} ${H}`} fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Layered panels converging to a focal passage — the Enigma Vault trust motif">
      <defs>
        <linearGradient id="hgPanel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FCFCFD" /><stop offset="1" stopColor="#E4E8ED" />
        </linearGradient>
        <linearGradient id="hgFocal" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#1B5475" /><stop offset="1" stopColor="#0C3145" />
        </linearGradient>
      </defs>
      {/* faint baseline rules */}
      {[120, 200, 280, 360].map((y) => <line key={y} x1="20" y1={y} x2="580" y2={y} stroke={A.stone} strokeWidth="1" opacity="0.35" />)}
      {/* perspective guides */}
      {corners.map((c, i) => (
        <line key={i} x1={c[0]} y1={c[1]} x2={vp[0]} y2={vp[1]} stroke={A.m50} strokeWidth="1" strokeDasharray="2 7" opacity="0.45" />
      ))}
      {/* panels */}
      {frames.map((f, i) => {
        const last = i === frames.length - 1;
        return (
          <rect key={i} x={f.x} y={f.y} width={f.w} height={f.h} rx="11"
            fill={last ? 'url(#hgFocal)' : 'url(#hgPanel)'} fillOpacity={last ? 1 : 0.32 + f.t * 0.30}
            stroke={last ? A.mineral : A.m50} strokeWidth={last ? 0 : 1} strokeOpacity={last ? 1 : 0.5} />
        );
      })}
      {/* focal highlight + mark */}
      <rect x={frames[N - 1].x + 9} y={frames[N - 1].y + 9} width={frames[N - 1].w - 18} height={Math.max(6, frames[N - 1].h * 0.36)} rx="5" fill={A.white} fillOpacity="0.16" />
      <circle cx={vp[0]} cy={vp[1]} r="6" fill={A.white} fillOpacity="0.5" />
      {/* data fragments */}
      {frags.map((fr, i) => (
        <rect key={i} x={fr[0]} y={fr[1]} width={fr[2]} height={fr[2]} rx="1.5" fill={A.mineral} fillOpacity={Math.max(0.08, fr[3])} stroke={A.m50} strokeWidth="0.5" strokeOpacity="0.4" transform={`rotate(12 ${fr[0]} ${fr[1]})`} />
      ))}
      <Tick x={o.x} y={o.y} c={A.m50} />
      <Tick x={o.x + o.w} y={o.y + o.h} c={A.m50} />
    </svg>
  );
}

/* ---------- Stack: enterprise isometric, converges on scroll ---------- */
function StackDiagram({ className, style }) {
  const cx = 232, w = 152, h = 53, d = 20;
  const cys = [88, 196, 304];               /* even 108px spacing */
  const fcy = 426, fw = 202, fh = 66, fd = 24;
  return (
    <svg className={className} style={style} viewBox="0 0 470 548" fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Three trust layers resting on one certified foundation">
      <defs>
        <linearGradient id="glsTop" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" /><stop offset="1" stopColor="#DCE3EB" stopOpacity="0.48" /></linearGradient>
        <linearGradient id="glsSide" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#CBD3DC" stopOpacity="0.55" /><stop offset="1" stopColor="#AEBAC6" stopOpacity="0.4" /></linearGradient>
        <linearGradient id="datTop" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0" stopColor="#235F80" stopOpacity="0.95" /><stop offset="1" stopColor="#0E3247" stopOpacity="0.97" /></linearGradient>
        <linearGradient id="datSide" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0E3247" stopOpacity="0.94" /><stop offset="1" stopColor="#0A2738" stopOpacity="0.97" /></linearGradient>
        <linearGradient id="sgFound" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stopColor="#EEF1F5" stopOpacity="0.92" /><stop offset="1" stopColor="#D8DEE5" stopOpacity="0.68" /></linearGradient>
        <radialGradient id="sgShadow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#2A3340" stopOpacity="0.14" /><stop offset="1" stopColor="#2A3340" stopOpacity="0" /></radialGradient>
        <filter id="glsShadow" x="-40%" y="-40%" width="180%" height="220%"><feDropShadow dx="0" dy="9" stdDeviation="9" floodColor="#2A3340" floodOpacity="0.13" /></filter>
      </defs>
      <Tick x={40} y={62} /><Tick x={430} y={62} /><Tick x={40} y={508} /><Tick x={430} y={508} />
      <ellipse cx={cx} cy={fcy + fh + 32} rx={fw * 0.92} ry="20" fill="url(#sgShadow)" />
      {/* flow axis */}
      <g opacity="0.55">
        <line x1="58" y1="74" x2="58" y2="356" stroke={A.mineral} strokeWidth="1.4" strokeDasharray="5 6" />
        <path d="M54,352 L58,360 L62,352" stroke={A.mineral} strokeWidth="1.4" />
        <text x="44" y="216" transform="rotate(-90 44 216)" textAnchor="middle" fontSize="10.5" fill={A.slate} fontFamily="Geist, sans-serif" letterSpacing="0.08em">REQUEST · INPUT</text>
      </g>
      {cys.map((cy, i) => {
        const data = i === 2;                /* layer 03 is the dark data layer */
        const left = `${cx - w},${cy} ${cx},${cy + h} ${cx},${cy + h + d} ${cx - w},${cy + d}`;
        const right = `${cx},${cy + h} ${cx + w},${cy} ${cx + w},${cy + d} ${cx},${cy + h + d}`;
        return (
          <g className="hp-isoL" data-depth={i - 1} key={i} filter="url(#glsShadow)">
            <polygon points={left} fill={data ? 'url(#datSide)' : 'url(#glsSide)'} />
            <polygon points={right} fill={data ? 'url(#datSide)' : 'url(#glsSide)'} />
            <polygon points={right} fill="#2A3340" fillOpacity="0.12" />
            <polygon points={isoPts(cx, cy, w, h)} fill={data ? 'url(#datTop)' : 'url(#glsTop)'} stroke={data ? 'rgba(255,255,255,0.34)' : 'rgba(99,118,138,0.34)'} strokeWidth="1.1" />
            {/* glass sheen — back-left triangle of the top face */}
            <polygon points={`${cx},${cy - h} ${cx - w},${cy} ${cx},${cy}`} fill="#FFFFFF" fillOpacity={data ? 0.1 : 0.34} />
            <circle cx={cx} cy={cy} r="14" fill={data ? 'rgba(255,255,255,0.16)' : '#FFFFFF'} stroke={data ? 'rgba(255,255,255,0.6)' : 'rgba(99,118,138,0.5)'} strokeWidth="1.1" />
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={data ? '#FFFFFF' : A.mineral} fontFamily="Geist, sans-serif">{'0' + (i + 1)}</text>
          </g>
        );
      })}
      {/* foundation */}
      <g filter="url(#glsShadow)">
        <polygon points={`${cx - fw},${fcy} ${cx},${fcy + fh} ${cx},${fcy + fh + fd} ${cx - fw},${fcy + fd}`} fill="url(#glsSide)" />
        <polygon points={`${cx},${fcy + fh} ${cx + fw},${fcy} ${cx + fw},${fcy + fd} ${cx},${fcy + fh + fd}`} fill="#2A3340" fillOpacity="0.1" />
        <polygon points={isoPts(cx, fcy, fw, fh)} fill="url(#sgFound)" stroke="rgba(99,118,138,0.34)" strokeWidth="1.1" />
        <text x={cx} y={fcy + 5} textAnchor="middle" fontSize="12.5" fill={A.slate} fontFamily="Geist, sans-serif" letterSpacing="0.06em">ONE FOUNDATION</text>
      </g>
    </svg>
  );
}

/* ---------- Product glyphs (64-grid) ---------- */
function GlyphTriplets({ size = 60 }) {
  const cx = 32;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {[18, 30, 42].map((cy, i) => (
        <polygon key={i} points={isoPts(cx, cy, 20, 8)} fill={i === 2 ? A.mineral : A.cloud} fillOpacity={i === 2 ? 0.92 : 0.7} stroke={A.mineral} strokeWidth="1.6" strokeOpacity={i === 2 ? 0.9 : 0.55} />
      ))}
    </svg>
  );
}
function GlyphNoPII({ size = 60 }) {
  const hex = '32,12 50,22 50,42 32,52 14,42 14,22';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="4" y1="32" x2="60" y2="32" stroke={A.m50} strokeWidth="1.4" strokeDasharray="3 3" />
      <rect x="6" y="28.5" width="7" height="7" rx="1.5" fill={A.mineral} fillOpacity="0.85" />
      <polygon points={hex} fill={A.mineral} fillOpacity="0.08" stroke={A.mineral} strokeWidth="1.6" />
      <circle cx="32" cy="32" r="4.5" fill={A.mineral} />
      <rect x="51" y="28.5" width="7" height="7" rx="1.5" fill="none" stroke={A.mineral} strokeWidth="1.5" />
    </svg>
  );
}
function GlyphVault({ size = 60 }) {
  const outer = '32,10 51,21 51,43 32,54 13,43 13,21';
  const inner = '32,20 43,26.5 43,37.5 32,44 21,37.5 21,26.5';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points={outer} fill="none" stroke={A.mineral} strokeWidth="1.6" />
      <polygon points={inner} fill={A.mineral} fillOpacity="0.1" stroke={A.mineral} strokeWidth="1.4" strokeOpacity="0.7" />
      <circle cx="32" cy="32" r="3.4" fill={A.mineral} />
    </svg>
  );
}
const GLYPH_IMG = {
  Triplets: 'assets/glyphs/triplets-3d.png',
  NoPII: 'assets/glyphs/nopii-3d.png',
  'The Vault': 'assets/glyphs/vault-3d.png',
};
function ProductGlyph({ prod, size = 50 }) {
  const src = window.RS(GLYPH_IMG[prod] || GLYPH_IMG.Triplets);
  return (
    <img src={src} alt="" width={size} height={size}
      style={{ width: size, height: size, objectFit: 'contain', mixBlendMode: 'multiply', display: 'block' }} />
  );
}

/* ---------- Resources featured art ---------- */
function ResourceArt({ className, style }) {
  const cx = 200, cys = [42, 88, 134], tints = ['url(#rgTop)', 'url(#rgMid)', 'url(#rgBot)'];
  return (
    <svg className={className} style={style} viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="rgTop" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stopColor="#F3F5F8" /><stop offset="1" stopColor="#DCE2E8" /></linearGradient>
        <linearGradient id="rgMid" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stopColor="#A7BBC8" /><stop offset="1" stopColor="#7E96A7" /></linearGradient>
        <linearGradient id="rgBot" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0" stopColor="#1E5676" /><stop offset="1" stopColor="#0E3247" /></linearGradient>
      </defs>
      {cys.map((cy, i) => (
        <g key={i}>
          <polygon points={`${cx - 112},${cy} ${cx},${cy + 39} ${cx},${cy + 51} ${cx - 112},${cy + 12}`} fill={i === 2 ? '#0A2C40' : '#C4CDD6'} />
          <polygon points={`${cx},${cy + 39} ${cx + 112},${cy} ${cx + 112},${cy + 12} ${cx},${cy + 51}`} fill={A.ink} fillOpacity="0.18" />
          <polygon points={isoPts(cx, cy, 112, 39)} fill={tints[i]} stroke={i === 2 ? A.mineral : '#A7B2BD'} strokeWidth="1" strokeOpacity="0.8" />
        </g>
      ))}
    </svg>
  );
}

/* ---------- Seal mark ---------- */
function SealMark({ size = 36, color = A.mineral }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="21" stroke={color} strokeWidth="1.25" strokeOpacity="0.4" />
      <circle cx="24" cy="24" r="15" stroke={color} strokeWidth="1.25" strokeOpacity="0.7" />
      <path d="M17.5 24.5 L22 29 L31 19.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Closing backdrop aperture ---------- */
function ClosingArt({ className, style }) {
  const vp = [935, 140], o = { x: 96, y: 20, w: 1010, h: 420 }, N = 6, frames = [];
  for (let i = 0; i < N; i++) { const t = i / (N - 1), k = t * 0.86; frames.push({ x: o.x + (vp[0] - o.x) * k, y: o.y + (vp[1] - o.y) * k, w: o.w * (1 - k), h: o.h * (1 - k), t }); }
  return (
    <svg className={className} style={style} viewBox="0 0 1240 460" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {frames.map((f, i) => (
        <rect key={i} x={f.x} y={f.y} width={f.w} height={f.h} rx="12" fill={A.white} fillOpacity={i === N - 1 ? 0.06 : 0.012 + f.t * 0.014} stroke={A.white} strokeWidth="1" strokeOpacity={0.05 + f.t * 0.08} />
      ))}
    </svg>
  );
}

Object.assign(window, { HeroArt, StackDiagram, ProductGlyph, ResourceArt, SealMark, ClosingArt });
