/* SAHNE 4 — AYNI ALAN, FARKLI ÇEVRE (46–68 s)  12 unit squares: 12×1, 6×2, 4×3. Area 12 every time; perimeter 26, 16, 14. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  const ROWS = [['12 × 1', '26 cm', '12 cm²', 48.8], ['6 × 2', '16 cm', '12 cm²', 54.2], ['4 × 3', '14 cm', '12 cm²', 59.8]];
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      LI.partA(ctx, env, t, { labels: 1 });
      LI.partB(ctx, env, t);
      LI.table(ctx, env, t, ['kenarlar', 'çevre', 'alan'], ROWS, seg(t, 46.8, 47.4) * (1 - seg(t, 67.6, 68.2)), 1);
    });
  }
  LI.registerScene({ id: 4, start: 46, end: 68, name: 'Same area', nameTr: 'Aynı alan', concept: 'Area 12, perimeter 26 / 16 / 14', conceptTr: 'Alan 12, çevre 26 / 16 / 14', render });
})(window.LI = window.LI || {});
