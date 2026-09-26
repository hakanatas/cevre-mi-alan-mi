/* SAHNE 5 — YAN YANA (68–80 s)  Two pairs side by side: same perimeter / different area, same area / different perimeter. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  const GROUPS = [
    { title: 'çevre aynı: 20 cm', t0: 68.4, items: [[9, 1, 'A = 9 cm²'], [5, 5, 'A = 25 cm²']], amber: 'A' },
    { title: 'alan aynı: 12 cm²', t0: 74.2, items: [[12, 1, 'Ç = 26 cm'], [4, 3, 'Ç = 14 cm']], amber: 'Ç' },
  ];
  LI.summary = function (ctx, env, t) {
    GROUPS.forEach((g, gi) => {
      const u = 34, a = seg(t, g.t0, g.t0 + 0.6);
      if (a <= 0) return;
      const X = env.V ? [-250, -250] : [-440, 230], Y = env.V ? [-720, -210] : [-250, -250];
      F().T(ctx, g.title, X[gi] + (env.V ? 230 : 200), Y[gi] - 20, { size: 50, alpha: a, halo: true });
      g.items.forEach(([w, h, lab], k) => {
        const O = [X[gi] + (k ? 0 : 0), Y[gi] + 90 + (k ? 230 : 0)], P = F().rect(O, u, w, h);
        const kk = seg(t, g.t0 + 0.4 + k * 0.5, g.t0 + 1.0 + k * 0.5);
        F().tiles(ctx, O, u, w, h, () => ({ k: kk }));
        F().outline(ctx, P, { p: kk, w: 6, seed: 70 + gi * 2 + k });
        LI.rope(ctx, P, kk * 0.8);
        F().T(ctx, lab, O[0] + w * u + 24, O[1] - h * u / 2, Object.assign({ size: 44, alpha: kk, align: 'left' }, F().AMB));
      });
    });
  };
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.summary(ctx, env, t)); }
  LI.registerScene({ id: 5, start: 68, end: 80, name: 'Side by side', nameTr: 'Yan yana', concept: 'Perimeter and area are different measures', conceptTr: 'Çevre ve alan farklı ölçüler', render });
})(window.LI = window.LI || {});
