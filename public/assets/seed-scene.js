// Scene authored by Claude Opus 5.5. See docs/provenance.
function drawScene(ctx, w, h, t, helpers, palette) {
  const P = {
    garden: { paper: '#f4ecd8', ink: '#2b2622', orange: '#e8833a', moss: '#6b8f3e', grey: '#a9a6a0', grey2: '#8d8a85', sky: '#efe4c9', petal: '#f2b5c4', leaf: '#4f7a2e', soil: '#7a5a3c', water: '#6fa8c9' },
    sunset: { paper: '#f7dcc0', ink: '#3a2230', orange: '#f0703a', moss: '#7d8f3a', grey: '#b79a96', grey2: '#977a7e', sky: '#f4b98c', petal: '#ffd166', leaf: '#5c7a2c', soil: '#6e4232', water: '#7fb0d0' },
    blueprint: { paper: '#1f3b63', ink: '#e8f0ff', orange: '#ffb35c', moss: '#8fd18a', grey: '#35557f', grey2: '#2c4a72', sky: '#24446f', petal: '#ffd6f0', leaf: '#6cc28a', soil: '#4a3f5e', water: '#9fd6ff' }
  };
  const c = P[palette] || P.garden;
  const T = Math.max(0, Math.min(45, t)), H = Math.max(0, Math.min(5, helpers | 0));
  const cl = (v) => Math.max(0, Math.min(1, v));
  const ease = (v) => { v = cl(v); return v * v * (3 - 2 * v); };
  const ph = (a, b) => ease((T - a) / (b - a));
  const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5; return s - Math.floor(s); };
  const wob = (i, k) => Math.sin(i * 1.7 + k) * 1.2;
  const live = T < 38 ? 1 : 0;

  ctx.save();
  ctx.scale(w / 1000, h / 500);
  ctx.lineJoin = ctx.lineCap = 'round';

  const stroke = (lw) => { ctx.lineWidth = lw || 2.5; ctx.strokeStyle = c.ink; ctx.stroke(); };
  const sketchRect = (x, y, rw, rh, fill, k) => {
    ctx.beginPath();
    ctx.moveTo(x + wob(k, 1), y + wob(k, 2));
    ctx.lineTo(x + rw + wob(k, 3), y + wob(k, 4));
    ctx.lineTo(x + rw + wob(k, 5), y + rh);
    ctx.lineTo(x + wob(k, 6), y + rh);
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill(); stroke(2);
  };

  function sky() {
    const warm = ph(36, 44);
    ctx.fillStyle = c.paper; ctx.fillRect(0, 0, 1000, 500);
    ctx.globalAlpha = 0.5 + 0.3 * warm; ctx.fillStyle = c.sky; ctx.fillRect(0, 0, 1000, 330);
    ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.arc(820, 90 - warm * 20, 34, 0, 7); ctx.fillStyle = c.orange; ctx.fill(); stroke(2);
  }

  function city() {
    for (let layer = 0; layer < 2; layer++) {
      for (let i = 0; i < 9; i++) {
        const k = i + layer * 20, bw = 70 + hash(k) * 50, bh = 120 + hash(k + 5) * (layer ? 120 : 170);
        const x = i * 115 + layer * 50 - 30, y = 360 - bh;
        if (layer && x > 560 && x < 860) continue;
        sketchRect(x, y, bw, bh, layer ? c.grey : c.grey2, k);
        for (let r = 0; r < 4; r++) for (let q = 0; q < 2; q++) {
          if (hash(k * 9 + r * 3 + q) < 0.35) continue;
          const lit = hash(k + r + q * 7) > 0.6 ? c.orange : c.paper;
          ctx.globalAlpha = 0.7; ctx.fillStyle = lit;
          ctx.fillRect(x + 14 + q * (bw / 2 - 4), y + 18 + r * 28, 14, 16); ctx.globalAlpha = 1;
        }
      }
    }
    ctx.fillStyle = c.grey2; ctx.fillRect(0, 360, 1000, 140);
    ctx.fillStyle = c.grey; ctx.fillRect(0, 360, 1000, 16);
    ctx.beginPath(); ctx.moveTo(0, 376); ctx.lineTo(1000, 376); stroke(2.5);
    for (let i = 0; i < 20; i++) { ctx.beginPath(); ctx.moveTo(i * 52, 420); ctx.lineTo(i * 52 + 24, 420); stroke(1.5); }
  }

  function plot() {
    const g = ph(17, 29);
    sketchRect(600, 340, 260, 24, c.soil, 3);
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1;
    for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.moveTo(608 + i * 14, 346 + (i % 3) * 5); ctx.lineTo(614 + i * 14, 348 + (i % 3) * 5); ctx.stroke(); }
    if (g > 0) {
      ctx.globalAlpha = g; ctx.fillStyle = c.moss;
      ctx.beginPath(); ctx.ellipse(730, 342, 130 * g, 8, 0, Math.PI, 0); ctx.fill(); ctx.globalAlpha = 1;
    }
  }

  function ramp() {
    const r = ph(8, 14) * (H > 0 ? 1 : 0.4);
    if (r <= 0) return;
    ctx.beginPath(); ctx.moveTo(520, 362); ctx.lineTo(520 + 80 * r, 362); ctx.lineTo(520 + 80 * r, 362 - 22 * r); ctx.closePath();
    ctx.fillStyle = c.orange; ctx.fill(); stroke(2);
    for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(520 + 20 * i * r, 362); ctx.lineTo(520 + 20 * i * r, 362 - 5.5 * i * r); stroke(1); }
  }

  function flower(x, y, s, hue, k) {
    if (s <= 0) return;
    ctx.save(); ctx.translate(x, y);
    ctx.rotate(Math.sin(T * 1.5 + k) * 0.05 * live);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(4, -15 * s, 0, -30 * s); stroke(2);
    ctx.translate(0, -30 * s);
    for (let i = 0; i < 5; i++) {
      ctx.save(); ctx.rotate(i * 1.2566 + k);
      ctx.beginPath(); ctx.ellipse(0, -7 * s, 4 * s, 7 * s, 0, 0, 7); ctx.fillStyle = hue; ctx.fill(); stroke(1.2);
      ctx.restore();
    }
    ctx.beginPath(); ctx.arc(0, 0, 3.5 * s, 0, 7); ctx.fillStyle = c.orange; ctx.fill(); stroke(1.2);
    ctx.restore();
  }

  function flowers() {
    const n = 4 + H * 2;
    for (let i = 0; i < n; i++) {
      const x = 615 + (i / (n - 1)) * 230, s = ph(17 + i * 0.9, 20 + i * 0.9);
      flower(x, 342, s, i % 2 ? c.petal : c.orange, i);
    }
  }

  function tree() {
    const g = ph(30, 38); if (g <= 0) return;
    const x = 730, base = 342, top = base - 190 * g;
    ctx.beginPath(); ctx.moveTo(x - 9 * g, base); ctx.quadraticCurveTo(x - 4, (base + top) / 2, x, top);
    ctx.quadraticCurveTo(x + 4, (base + top) / 2, x + 9 * g, base); ctx.closePath();
    ctx.fillStyle = c.soil; ctx.fill(); stroke(2);
    const blobs = [[0, 0, 60], [-50, 20, 42], [50, 20, 42], [-28, -38, 40], [30, -36, 40]];
    blobs.forEach(([dx, dy, r], i) => {
      const s = ease(g * 1.4 - i * 0.08);
      ctx.beginPath(); ctx.arc(x + dx * g, top + dy * g, r * s, 0, 7);
      ctx.fillStyle = i % 2 ? c.leaf : c.moss; ctx.fill(); stroke(2);
    });
    if (T > 38) for (let i = 0; i < 6; i++) flower(x - 60 + i * 24, top + 10 + (i % 2) * 18, 0.5, c.petal, i);
  }

  function blob(x, y, s, col, step, hold) {
    const bob = Math.abs(Math.sin(step * 6)) * 4 * live;
    ctx.save(); ctx.translate(x, y - bob); ctx.scale(s, s);
    for (let l = -1; l <= 1; l += 2) {
      ctx.beginPath(); ctx.moveTo(l * 7, 10); ctx.lineTo(l * 7 + Math.sin(step * 6 + l) * 5 * live, 22 + bob / s); stroke(3);
    }
    ctx.beginPath(); ctx.ellipse(0, 0, 18, 16, 0, 0, 7); ctx.fillStyle = col; ctx.fill(); stroke(2.5);
    ctx.fillStyle = c.ink;
    ctx.beginPath(); ctx.arc(-6, -4, 2.2, 0, 7); ctx.arc(6, -4, 2.2, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(0, 3, 4, 0.2, Math.PI - 0.2); stroke(1.5);
    if (hold) hold();
    ctx.restore();
  }

  function seed() { ctx.beginPath(); ctx.ellipse(16, 4, 5, 7, 0.4, 0, 7); ctx.fillStyle = c.orange; ctx.fill(); stroke(1.5); }

  function courier() {
    const walk = ph(0, 8), toPlot = ph(14, 29), x = 60 + walk * 440 + toPlot * 190;
    const y = 344 - (x > 520 && x < 600 ? (x - 520) * 0.27 : x >= 600 ? 4 : 0);
    const planted = T > 29.5;
    blob(x, y, 1, c.orange, T, planted ? null : seed);
    if (T > 29 && T < 31) { ctx.globalAlpha = 1 - ph(29, 31); ctx.save(); ctx.translate(730, 340); seed(); ctx.restore(); ctx.globalAlpha = 1; }
  }

  function can(x, y, tilt) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(tilt);
    sketchRect(-10, -10, 20, 16, c.water, 7);
    ctx.beginPath(); ctx.moveTo(10, -4); ctx.lineTo(22, -12); stroke(2.5);
    ctx.restore();
    if (tilt > 0.3) for (let d = 0; d < 3; d++) {
      const p = ((T * 2 + d / 3) % 1) * live + (1 - live) * 0.5;
      ctx.beginPath(); ctx.arc(x + 24 + p * 6, y - 4 + p * 26, 2, 0, 7); ctx.fillStyle = c.water; ctx.fill();
    }
  }

  function helperCrew() {
    const arrive = ph(8, 11);
    for (let i = 0; i < H; i++) {
      const tx = 540 + i * 70, x = 1060 + i * 30 - (1060 + i * 30 - tx) * arrive;
      const col = [c.moss, c.petal, c.water, c.orange, c.leaf][i];
      blob(x, 346, 0.8, col, T + i, null);
      if (T > 17 && i % 2 === 0) can(x + 10, 330, Math.sin(T * 2 + i) * 0.25 * live + 0.5);
    }
  }

  sky(); city(); plot(); ramp(); tree(); flowers(); helperCrew(); courier();
  ctx.restore();
}