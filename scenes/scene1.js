/* SAHNE 1 — ÇEVRE VE ALAN (0–10 s)  Nokta draws a 6 × 4 rectangle: its edge (perimeter) and its inside (area). */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, Ink = LI.Ink;
  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  const rope = (ctx, P, a, p = 1) => { if (a > 0) Ink.path(ctx, P.concat([P[0]]), { w: 5, p, color: LI.AMBER_RGB, alpha: 0.9 * a, seed: 8, taper: [0, 0], wob: 0.1 }); };
  LI.rope = rope;

  /** part A: the rectangle with perimeter 20 (0–46 s). o.labels: alpha of Ç / A labels */
  LI.partA = function (ctx, env, t, o = {}) {
    const L = KD.L(env), u = L.u, [w, h] = F().dims(t);
    const a = seg(t, 3.0, 3.6) * (1 - seg(t, 45.6, 46.2)); if (a <= 0) return;
    F().grid(ctx, L.O, u, a, 11, 7);
    const P = F().rect(L.O, u, w, h), r = F().rest(w, h), W = Math.round(w), Hh = Math.round(h);
    if (r > 0.01) F().tiles(ctx, L.O, u, W, Hh, (i, j, n) => ({ k: Math.min(seg(t, 5.6 + n * 0.05, 5.9 + n * 0.05), r) * a, alpha: a }));
    F().outline(ctx, P, { p: seg(t, 3.3, 5.4), alpha: a });
    rope(ctx, P, seg(t, 7.2, 7.8) * a, seg(t, 7.2, 8.2));
    const la = (o.labels ?? 0) * r * a;
    if (la > 0) {
      F().T(ctx, 'Ç = 20 cm', L.O[0] + w * u / 2, L.O[1] - h * u - 40, Object.assign({ size: 42, alpha: la, halo: true }, F().AMB));
      F().T(ctx, `A = ${W * Hh} cm²`, L.O[0] + w * u / 2, L.O[1] - h * u / 2, { size: h > 1.5 ? 46 : 34, alpha: la, halo: true });
    }
  };

  /** a three-column table; rows: [[c1, c2, c3, tAppear]], amberCol: which column changes */
  LI.table = function (ctx, env, t, head, rows, a, amberCol) {
    const T = KD.L(env).T; if (a <= 0) return;
    head.forEach((s, i) => F().T(ctx, s, T.x[i], T.y, { size: 38, alpha: a }));
    Ink.path(ctx, [[T.x[0] - 70, T.y + 26], [T.x[2] + 70, T.y + 26]], { w: 4, alpha: 0.8 * a, seed: 60, taper: [0.05, 0.05] });
    rows.forEach((row, k) => {
      const al = seg(t, row[3], row[3] + 0.5) * a; if (al <= 0) return;
      [0, 1, 2].forEach((i) => F().T(ctx, row[i], T.x[i], T.y + T.dy * (k + 1), Object.assign({ size: 40, alpha: al }, i === amberCol ? F().AMB : {})));
    });
  };

  /** part B: 12 unit squares arranged 12×1 → 6×2 → 4×3 (46–68 s) */
  const CFG = [12, 6, 4];
  LI.partB = function (ctx, env, t) {
    const L = KD.L(env), u = L.uB, aB = seg(t, 46.2, 46.6) * (1 - seg(t, 67.6, 68.2)); if (aB <= 0) return;
    F().grid(ctx, L.O, u, aB, 13, 5);
    const at = (c, i) => [L.O[0] + (i % c) * u, L.O[1] - (Math.floor(i / c) + 1) * u];
    for (let i = 0; i < 12; i++) {
      const k0 = seg(t, 46.6 + i * 0.08, 46.9 + i * 0.08) * aB;
      const k1 = inOut(seg(t, 51.4 + i * 0.05, 52.6 + i * 0.05)), k2 = inOut(seg(t, 57.0 + i * 0.05, 58.2 + i * 0.05));
      const p1 = at(12, i), p2 = at(6, i), p3 = at(4, i);
      const q = [lerp(lerp(p1[0], p2[0], k1), p3[0], k2), lerp(lerp(p1[1], p2[1], k1), p3[1], k2)];
      F().unit(ctx, q[0], q[1], u, k0, { alpha: aB });
    }
    const R = [[12, 1, seg(t, 47.8, 48.2) * (1 - seg(t, 51.2, 51.4))], [6, 2, seg(t, 53.4, 53.8) * (1 - seg(t, 56.8, 57.0))], [4, 3, seg(t, 59.0, 59.4)]];
    R.forEach(([w, h, r]) => {
      const a = r * aB; if (a <= 0) return;
      const P = F().rect(L.O, u, w, h);
      F().outline(ctx, P, { alpha: a, w: 8 }); rope(ctx, P, a);
      F().T(ctx, `Ç = ${2 * (w + h)} cm`, L.O[0] + w * u / 2, L.O[1] - h * u - 38, Object.assign({ size: 42, alpha: a, halo: true }, F().AMB));
      F().T(ctx, 'A = 12 cm²', L.O[0] + w * u / 2, L.O[1] + 44, { size: 40, alpha: a });
    });
  };

  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.partA(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Edge and inside', nameTr: 'Kenar ve iç', concept: 'Perimeter and area', conceptTr: 'Çevre ve alan', render });
})(window.LI = window.LI || {});
