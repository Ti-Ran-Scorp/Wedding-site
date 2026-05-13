// FlowerBouquetLeft.tsx
interface FlowerItem {
  src: string;
  alt: string;
  leftPercent: number;   // left / 500 * 100
  topPercent: number;    // top / 650 * 100
  widthPercent: number;  // width / 500 * 100
  rotate?: number;
  zIndex?: number;
}

// Конвертируем исходные px значения в проценты
// Например, left: 200px → 200/500*100 = 40%
// top: 280px → 280/650*100 ≈ 43.08%
// width: 110px → 110/500*100 = 22%

const flowers: FlowerItem[] = [
  // Зелень
  { src: '/images/leaf-1l.png', alt: 'leaf', leftPercent: 36, topPercent: 61.54-22, widthPercent: 150, rotate: -20, zIndex: 100 },
  { src: '/images/leaf-2l.png', alt: 'leaf', leftPercent: 56, topPercent: 69.23-22, widthPercent: 150, rotate: 15, zIndex: 100 },
  { src: '/images/leaf-1l.png', alt: 'leaf', leftPercent: 24, topPercent: 46.15-22, widthPercent: 150, rotate: -35, zIndex: 100 },
  { src: '/images/leaf-2l.png', alt: 'leaf', leftPercent: 64, topPercent: 53.85-22, widthPercent: 150, rotate: 25, zIndex: 100 },
  { src: '/images/leaf-1l.png', alt: 'leaf', leftPercent: 44, topPercent: 76.92-22, widthPercent: 150, rotate: -10, zIndex: 100 },

  // Белые пионы
  { src: '/images/peony-white.png', alt: 'white peony', leftPercent: 40, topPercent: 43.08-22, widthPercent: 150, zIndex: 103 },
  { src: '/images/peony-white.png', alt: 'white peony', leftPercent: 60, topPercent: 49.23-22, widthPercent: 150, zIndex: 103 },
  { src: '/images/peony-pink.png', alt: 'pink peony', leftPercent: 30, topPercent: 58.46-22, widthPercent: 150, zIndex: 103 },

  // Розовые розы
  { src: '/images/rose-blushl.png', alt: 'blush rose', leftPercent: 52, topPercent: 33.85-22, widthPercent: 150, zIndex: 102 },
  { src: '/images/rose-blushl.png', alt: 'blush rose', leftPercent: 70, topPercent: 43.08-22, widthPercent: 150, zIndex: 102 },
  { src: '/images/rose-blushl.png', alt: 'blush rose', leftPercent: 20, topPercent: 38.46-22, widthPercent: 150, zIndex: 102 },

  // Мелкие цветы
  { src: '/images/filler-whitel.png', alt: 'filler', leftPercent: 56, topPercent: 27.69-22, widthPercent: 150, zIndex: 102 },
  { src: '/images/filler-whitel.png', alt: 'filler', leftPercent: 76, topPercent: 53.85-22, widthPercent: 150, zIndex: 102 },
  { src: '/images/filler-whitel.png', alt: 'filler', leftPercent: 16, topPercent: 53.85-22, widthPercent: 150, zIndex: 102 },
  { src: '/images/filler-whitel.png', alt: 'filler', leftPercent: 64, topPercent: 64.62-22, widthPercent: 150, zIndex: 102 },

  // Эвкалипт
  { src: '/images/leaf-1l.png', alt: 'eucalyptus', leftPercent: 50, topPercent: 23.08-22, widthPercent: 150, rotate: -30, zIndex: 101 },
  { src: '/images/leaf-2l.png', alt: 'eucalyptus', leftPercent: 80, topPercent: 46.15-22, widthPercent: 150, rotate: 20, zIndex: 101 },
  { src: '/images/leaf-1l.png', alt: 'eucalyptus', leftPercent: 12, topPercent: 30.77-22, widthPercent: 150, rotate: -45, zIndex: 101 },
  { src: '/images/leaf-1l.png', alt: 'eucalyptus', leftPercent: 36, topPercent: 80-22, widthPercent: 150, rotate: 10, zIndex: 103 },

  // Каскад
  { src: '/images/cascade-flowerl.png', alt: 'cascade', leftPercent: 60, topPercent: 76.92-22, widthPercent: 150, rotate: 20, zIndex: 101 },
  { src: '/images/cascade-flowerl.png', alt: 'cascade', leftPercent: 70, topPercent: 69.23-22, widthPercent: 150, rotate: 35, zIndex: 101 },
  { src: '/images/cascade-flowerl.png', alt: 'cascade', leftPercent: 64, topPercent: 84.62-22, widthPercent: 150, rotate: 15, zIndex: 101 },

  // Доп. зелень
  { src: '/images/leaf-2l.png', alt: 'greenery', leftPercent: 76, topPercent: 76.92-22, widthPercent: 150, rotate: 30, zIndex: 101 },
  { src: '/images/leaf-2l.png', alt: 'greenery', leftPercent: 56, topPercent: 89.23-22, widthPercent: 150, rotate: -15, zIndex: 101 },

  //============================================================================================================================
  //============================================================================================================================
  //============================================================================================================================

 
];

export default function FlowerBouquetLeft({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-visible ${className}`}>

      {flowers.map((flower, idx) => (
        <img
          key={idx}
          src={flower.src}
          alt={flower.alt}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${flower.leftPercent-50}%`,
            top: `${flower.topPercent+5}%`,
            width: `${flower.widthPercent}%`,
            transform: flower.rotate ? `rotate(${flower.rotate}deg)` : undefined,
            zIndex: flower.zIndex,
            filter: 'drop-shadow(2px 4px 6px rgba(45,58,30,0.7))'
          }}
          loading="lazy"
        />
      ))}
    </div>
  );
}