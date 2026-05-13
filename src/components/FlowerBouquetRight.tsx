// FlowerBouquetRight.tsx
interface FlowerItem {
  src: string;
  alt: string;
  leftPercent: number;   // процент от ширины контейнера (0-100)
  topPercent: number;    // процент от высоты контейнера (0-100)
  widthPercent: number;  // процент от ширины контейнера
  rotate?: number;
  zIndex?: number;
}

const flowersRight: FlowerItem[] = [
  // === Зелень на заднем плане (зеркально левому букету) ===
  { src: '/images/leaf-1r.png', alt: 'leaf', leftPercent: 64-150, topPercent: 61.54-22, widthPercent: 100, rotate: 20, zIndex: 100 },
  { src: '/images/leaf-2r.png', alt: 'leaf', leftPercent: 44-150, topPercent: 69.23-22, widthPercent: 100, rotate: -15, zIndex: 100 },
  { src: '/images/leaf-1r.png', alt: 'leaf', leftPercent: 76-150, topPercent: 46.15-22, widthPercent: 100, rotate: 35, zIndex: 100 },
  { src: '/images/leaf-2r.png', alt: 'leaf', leftPercent: 36-150, topPercent: 53.85-22, widthPercent: 100, rotate: -25, zIndex: 100 },
  { src: '/images/leaf-1r.png', alt: 'leaf', leftPercent: 56-150, topPercent: 76.92-22, widthPercent: 100, rotate: 10, zIndex: 100 },

  // === Крупные белые и розовые пионы ===
  { src: '/images/peony-white.png', alt: 'white peony', leftPercent: 60-150, topPercent: 43.08-22, widthPercent: 100, zIndex: 103 },
  { src: '/images/peony-white.png', alt: 'white peony', leftPercent: 40-150, topPercent: 49.23-22, widthPercent: 100, zIndex: 103 },
  { src: '/images/peony-pink.png', alt: 'pink peony', leftPercent: 70-150, topPercent: 58.46-22, widthPercent: 100, zIndex: 103 },

  // === Розовые розы ===
  { src: '/images/rose-blushr.png', alt: 'blush rose', leftPercent: 48-150, topPercent: 33.85-22, widthPercent: 100, zIndex: 102 },
  { src: '/images/rose-blushr.png', alt: 'blush rose', leftPercent: 30-150, topPercent: 43.08-22, widthPercent: 100, zIndex: 102 },
  { src: '/images/rose-blushr.png', alt: 'blush rose', leftPercent: 80-150, topPercent: 38.46-22, widthPercent: 100, zIndex: 102 },

  // === Мелкие белые цветы-наполнители ===
  { src: '/images/filler-whiter.png', alt: 'filler', leftPercent: 44-150, topPercent: 27.69-22, widthPercent: 100, zIndex: 102 },
  { src: '/images/filler-whiter.png', alt: 'filler', leftPercent: 24-150, topPercent: 53.85-22, widthPercent: 100, zIndex: 102 },
  { src: '/images/filler-whiter.png', alt: 'filler', leftPercent: 84-150, topPercent: 53.85-22, widthPercent: 100, zIndex: 102 },
  { src: '/images/filler-whiter.png', alt: 'filler', leftPercent: 36-150, topPercent: 64.62-22, widthPercent: 100, zIndex: 102 },

  // === Эвкалиптовые веточки ===
  { src: '/images/leaf-1r.png', alt: 'eucalyptus', leftPercent: 50-150, topPercent: 23.08-22, widthPercent: 100, rotate: 30, zIndex: 101 },
  { src: '/images/leaf-2r.png', alt: 'eucalyptus', leftPercent: 20-150, topPercent: 46.15-22, widthPercent: 100, rotate: -20, zIndex: 101 },
  { src: '/images/leaf-1r.png', alt: 'eucalyptus', leftPercent: 88-150, topPercent: 30.77-22, widthPercent: 100, rotate: 45, zIndex: 101 },
  { src: '/images/leaf-1r.png', alt: 'eucalyptus', leftPercent: 64-150, topPercent: 80-22, widthPercent: 100, rotate: -10, zIndex: 103 },

  // === Ниспадающие каскадные цветы ===
  { src: '/images/cascade-flowerr.png', alt: 'cascade', leftPercent: 40-150, topPercent: 76.92-22, widthPercent: 100, rotate: -20, zIndex: 101 },
  { src: '/images/cascade-flowerr.png', alt: 'cascade', leftPercent: 30-150, topPercent: 69.23-22, widthPercent: 100, rotate: -35, zIndex: 101 },
  { src: '/images/cascade-flowerr.png', alt: 'cascade', leftPercent: 36-150, topPercent: 84.62-22, widthPercent: 100, rotate: -15, zIndex: 101 },

  // === Дополнительная зелень внизу ===
  { src: '/images/leaf-2r.png', alt: 'greenery', leftPercent: 24-150, topPercent: 76.92-22, widthPercent: 100, rotate: -30, zIndex: 101 },
  { src: '/images/leaf-2r.png', alt: 'greenery', leftPercent: 44-150, topPercent: 89.23-22, widthPercent: 100, rotate: 15, zIndex: 101 },
];

export default function FlowerBouquetRight({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full h-full overflow-visible ${className}`}>
        
      {flowersRight.map((flower, idx) => (
        <img
          key={idx}
          src={flower.src}
          alt={flower.alt}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${flower.leftPercent+100}%`,
            top: `${flower.topPercent+5}%`,
            width: `${flower.widthPercent}%`,
            transform: flower.rotate ? `rotate(${flower.rotate}deg)` : undefined,
            zIndex: flower.zIndex,
            filter: 'drop-shadow(-2px 4px 6px rgba(45, 58, 30, 0.7))', // тень влево
          }}
          loading="lazy"
        />
      ))}
    </div>
  );
}