/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time.
   Part A: one rectangle whose perimeter is always 20 (w + h = 10) —
   the area changes. Part B: the same 12 unit squares rearranged into
   12×1, 6×2 and 4×3 — the area stays 12, the perimeter changes.
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, track, outBack, outCubic, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;

  /** width over time (part A, 24–46 s): the perimeter stays 20, so height = 10 − width */
  const W = (t) => track([[0, 6], [25.4, 6], [26.6, 9], [28.4, 9], [29.4, 8], [31.2, 8], [32.2, 7], [34.0, 7], [35.0, 6], [36.8, 6], [37.8, 5], [92, 5]], t);
  const H = (t) => 10 - W(t);
  const dims = (t) => [W(t), H(t)];
  const rest = (w, h) => clamp(1 - (Math.abs(w - Math.round(w)) + Math.abs(h - Math.round(h))) * 25);

  function rect(O, u, w, h) { return [O, [O[0] + w * u, O[1]], [O[0] + w * u, O[1] - h * u], [O[0], O[1] - h * u]]; }
  const outline = (ctx, P, o = {}) => Ink.path(ctx, P.concat([P[0]]), { w: o.w ?? 10, p: o.p ?? 1, seed: o.seed ?? 7, taper: [0.02, 0.02], wob: 0.1, dry: 0.3, bleed: 0.5, alpha: o.alpha ?? 1 });

  /** one unit square: top-left (x, y), side u; k = pop-in 0..1 */
  function unit(ctx, x, y, u, k, o = {}) {
    if (k <= 0) return;
    const s = outBack(clamp(k)) * (u - 6), cx = x + u / 2, cy = y + u / 2;
    ctx.fillStyle = `rgba(${LI.AMBER_RGB},${(o.fill ?? 0.3) * clamp(k * 2)})`;
    ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
    ctx.strokeStyle = `rgba(${LI.INK_RGB},${0.5 * clamp(k * 2) * (o.alpha ?? 1)})`;
    ctx.lineWidth = 2; ctx.strokeRect(cx - s / 2, cy - s / 2, s, s);
    if (o.label) A.text(ctx, o.label, cx, cy + 2, { size: o.size ?? Math.round(u * 0.5), alpha: clamp(k * 2 - 0.6) * (o.alpha ?? 1) });
  }
  /** fill a w×h rectangle at O with unit squares; vis(i, j, n) → { k, label } (i: column, j: row from top, n: reading order) */
  function tiles(ctx, O, u, w, h, vis) {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const v = vis(i, j, j * w + i); if (!v || v.k <= 0) continue;
      unit(ctx, O[0] + i * u, O[1] - (h - j) * u, u, v.k, v);
    }
  }
  /** faint dot grid */
  function grid(ctx, O, u, a, cols = 11, rows = 8) {
    if (a <= 0) return;
    ctx.fillStyle = `rgba(${LI.INK_RGB},${0.28 * a})`;
    for (let i = -1; i <= cols; i++) for (let j = -1; j <= rows; j++) { ctx.beginPath(); ctx.arc(O[0] + i * u, O[1] - j * u, 2.4, 0, Math.PI * 2); ctx.fill(); }
  }
  const T = (ctx, s, x, y, o = {}) => A.text(ctx, s, x, y, Object.assign({ size: 48 }, o));
  const AMB = { color: A.amber };

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env);
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    KD.look(p, [L.O[0] + 200, L.O[1] - 120]);
    if (t > 2.9 && t < 5.6) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; }
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    pointing(25.4, 37.8); pointing(51.2, 53.2); pointing(56.8, 59.0);
    const puz = seg(t, 18.6, 19.0) * (1 - seg(t, 23.4, 23.7));
    if (puz > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.6 * puz; p.mouth = -0.1; p.lookY -= 0.3; }
    if (t > 33.4 && t < 35.0) { p.mouthOpen = 0.55; p.eyeScale = 1.1; }
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(40.6, 42.2); joy(63.4, 65.0); joy(78.0, 79.6);
    if (t > 84.0) {
      const j = (t - 84.0) % 1.4;
      p.squint = 1; p.mouth = 1; p.turn = 0.15; p.lookX = 0.3; p.lookY = 0;
      p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
      p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      if (t > 89.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.turn = 0; p.y = L.gy; p.sq = 1; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 16.0, 16.15), hump(t, 30.0, 30.15), hump(t, 49.0, 49.15), hump(t, 61.0, 61.15), hump(t, 72.0, 72.15));
    return p;
  }

  function base(ctx, env, t, cam, drawBefore) {
    const L = KD.L(env);
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    KD.ground(ctx, env, L.nx, L.gy);
    if (drawBefore) drawBefore();
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return L;
  }

  LI.Film = { W, H, dims, rest, rect, outline, unit, tiles, grid, T, AMB, nokta, base };
})(window.LI = window.LI || {});
