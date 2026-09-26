/* SAHNE 3 — AYNI ÇEVRE, FARKLI ALAN (24–46 s)  Perimeter 20 every time; area 9, 16, 21, 24, 25. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  const ROWS = [['9 × 1', '20 cm', '9 cm²', 27.0], ['8 × 2', '20 cm', '16 cm²', 29.8], ['7 × 3', '20 cm', '21 cm²', 32.6], ['6 × 4', '20 cm', '24 cm²', 35.4], ['5 × 5', '20 cm', '25 cm²', 38.2]];
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      LI.partA(ctx, env, t, { labels: 1 });
      const a = seg(t, 24.6, 25.2) * (1 - seg(t, 45.6, 46.2));
      LI.table(ctx, env, t, ['kenarlar', 'çevre', 'alan'], ROWS, a, 2);
      const T = KD.L(env).T;
      F().T(ctx, 'en büyük alan: kare', (T.x[0] + T.x[2]) / 2, T.y + T.dy * 6 + 10, Object.assign({ size: 38, p: seg(t, 40.8, 41.8), alpha: a, halo: true }, F().AMB));
    });
  }
  LI.registerScene({ id: 3, start: 24, end: 46, name: 'Same perimeter', nameTr: 'Aynı çevre', concept: 'Perimeter 20, area 9 … 25', conceptTr: 'Çevre 20, alan 9 … 25', render });
})(window.LI = window.LI || {});
