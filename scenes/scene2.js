/* SAHNE 2 — İKİ AYRI ÖLÇÜ (10–24 s)  6 × 4: perimeter 20 cm, area 24 cm². If the perimeter stays the same, does the area? */
(function (LI) {
  'use strict';
  const { seg, outBack } = LI.E;
  const A = LI.Ang, KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      LI.partA(ctx, env, t, { labels: seg(t, 11.0, 11.8) });
      const L = KD.L(env), q = outBack(seg(t, 18.8, 19.3)) * (1 - seg(t, 23.4, 23.9));
      if (q > 0) A.text(ctx, '?', L.O[0] + 6 * L.u + 90, L.O[1] - 2 * L.u, { size: 120 * q, color: A.amber });
    });
  }
  LI.registerScene({ id: 2, start: 10, end: 24, name: 'Two measures', nameTr: 'İki ayrı ölçü', concept: 'Ç = 20 cm, A = 24 cm²', conceptTr: 'Ç = 20 cm, A = 24 cm²', render });
})(window.LI = window.LI || {});
