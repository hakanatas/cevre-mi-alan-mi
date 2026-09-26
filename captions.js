/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.6, end: 9.6, tr: 'Çevre şeklin etrafı, alan şeklin içi', en: 'Perimeter goes around, area fills the inside',
      note: 'Nokta 6’ya 4’lük bir dikdörtgen çizdi. Kehribar ip şeklin etrafını, yani çevresini gösteriyor. Birim kareler de içini, yani alanını.' },
    { scene: 2, start: 10.6, end: 16.8, tr: '6 × 4: çevre 20 cm, alan 24 cm²', en: '6 × 4: perimeter 20 cm, area 24 cm²',
      note: 'Çevresi 6 artı 4 artı 6 artı 4, yani 20 santimetre. Alanı 6 çarpı 4, yani 24 santimetrekare.' },
    { scene: 2, start: 17.2, end: 23.6, tr: 'Tahmin et: çevre aynı kalırsa alan da aynı mı kalır?', en: 'Guess: if the perimeter stays the same, does the area?',
      note: 'Tahmin edelim: aynı 20 santimetrelik iple başka dikdörtgenler yapsak alan da hep 24 mü olur?' },
    { scene: 3, start: 25.4, end: 32.8, tr: 'Çevre hep 20 cm…', en: 'The perimeter is always 20 cm…',
      note: 'İpi kaydıralım: 9’a 1, 8’e 2, 7’ye 3… Çevre hep 20 santimetre kalıyor.' },
    { scene: 3, start: 33.2, end: 40.2, tr: '…ama alan değişiyor: 9, 16, 21, 24, 25', en: '…but the area changes: 9, 16, 21, 24, 25',
      note: 'Ama alanlara bakın: 9, 16, 21, 24 ve 25 santimetrekare. Alan değişiyor. En büyük alan, kenarları eşit olan karede.' },
    { scene: 3, start: 40.6, end: 45.6, tr: 'Aynı çevre, farklı alan', en: 'Same perimeter, different areas',
      note: 'Demek ki çevreleri aynı olan dikdörtgenlerin alanları farklı olabilir.' },
    { scene: 4, start: 46.6, end: 50.8, tr: 'Şimdi 12 birim kareyle dikdörtgen yapalım', en: 'Now let’s make rectangles from 12 unit squares',
      note: 'Şimdi tersini deneyelim. Elimizde 12 birim kare var. Bunlarla 12’ye 1’lik bir dikdörtgen yaptık: çevresi 26 santimetre.' },
    { scene: 4, start: 51.2, end: 57.0, tr: 'Kareleri yeniden dizelim: alan hep 12 cm²', en: 'Rearrange the squares: the area is always 12 cm²',
      note: 'Aynı kareleri yeniden dizelim: 6’ya 2, sonra 4’e 3. Kare sayısı değişmediği için alan hep 12 santimetrekare.' },
    { scene: 4, start: 57.4, end: 62.8, tr: '…ama çevre değişiyor: 26, 16, 14', en: '…but the perimeter changes: 26, 16, 14',
      note: 'Ama çevre değişiyor: 26, 16 ve 14 santimetre.' },
    { scene: 4, start: 63.2, end: 67.6, tr: 'Aynı alan, farklı çevre', en: 'Same area, different perimeters',
      note: 'Demek ki alanları aynı olan dikdörtgenlerin çevreleri farklı olabilir.' },
    { scene: 5, start: 68.6, end: 73.8, tr: 'Çevre aynıyken alan farklı olabilir', en: 'Same perimeter, the area can differ',
      note: 'Yan yana görelim: 9’a 1 ile 5’e 5’in çevresi aynı, alanları farklı.' },
    { scene: 5, start: 74.4, end: 79.6, tr: 'Alan aynıyken çevre farklı olabilir', en: 'Same area, the perimeter can differ',
      note: '12’ye 1 ile 4’e 3’ün alanı aynı, çevreleri farklı.' },
    { scene: 6, start: 80.6, end: 86.2, tr: 'Çevre ve alan farklı ölçülerdir', en: 'Perimeter and area are different measures',
      note: 'Çevre ve alan iki farklı ölçüdür. Çevre santimetreyle, alan santimetrekareyle ölçülür.' },
    { scene: 6, start: 86.6, end: 91.0, tr: 'Birini bilmek ötekini söylemez', en: 'Knowing one does not tell you the other',
      note: 'Bir dikdörtgenin sadece çevresini bilmek alanını söylemez; sadece alanını bilmek de çevresini söylemez. Kenarlarına bakmak gerekir.' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
