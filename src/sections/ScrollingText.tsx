import React, { useEffect, useState, useRef } from 'react';

const ScrollingText: React.FC = () => {
  const [textColor, setTextColor] = useState('#ff69b4'); // начальный розовый
  const containerRef = useRef<HTMLDivElement>(null);

  // ========== НАСТРОЙКА ЦВЕТОВ ==========
  // Задайте начальный (розовый) и конечный (зелёный) цвета в любом формате:
  const startColor = '#ff69b4';  // яркий розовый
  const endColor   = '#6b8e23';  // оливково-зелёный
  
  // При желании можно поменять местами: меняйте startColor и endColor.
  // Также можно использовать другие форматы: "rgb(..., ..., ...)".
  // =======================================

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      // Получаем позицию контейнера относительно окна
      const rect = containerRef.current.getBoundingClientRect();
      //const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      
      // Или можно привязать прогресс к положению контейнера на экране:
       const containerTop = rect.top + window.scrollY;
       const startScroll = containerTop - window.innerHeight;
       const endScroll = containerTop + containerRef.current.offsetHeight;
       const progress = (window.scrollY - startScroll) / (endScroll - startScroll);
      
      // Самый простой вариант (вся страница):
      //const progress = Math.min(1, Math.max(0, scrollProgress)); // ограничиваем 0..1

      // ===== МЕСТО СМЕНЫ ЦВЕТА (интерполяция) =====
      // Здесь вычисляется промежуточный цвет на основе прогресса.
      // Можно заменить на любую другую логику, например, переключение цветов по порогам.
      const r1 = parseInt(startColor.slice(1,3), 16);
      const g1 = parseInt(startColor.slice(3,5), 16);
      const b1 = parseInt(startColor.slice(5,7), 16);
      const r2 = parseInt(endColor.slice(1,3), 16);
      const g2 = parseInt(endColor.slice(3,5), 16);
      const b2 = parseInt(endColor.slice(5,7), 16);
      
      const r = Math.round(r1 + (r2 - r1) * progress);
      const g = Math.round(g1 + (g2 - g1) * progress);
      const b = Math.round(b1 + (b2 - b1) * progress);
      
      const newColor = `rgb(${r}, ${g}, ${b})`;
      // ============================================
      
      setTextColor(newColor);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // вызов при монтировании
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startColor, endColor]); // зависимости (если цвета динамические)

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',         // фиксированная ширина на 320px
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        border: '1px solid #ccc', // опционально
        padding: '0px 0',
        //margin: '1rem auto',
        backgroundColor: '#fff',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          animation: 'scrollText 8s linear infinite',
          color: textColor,
          fontSize: '1.2rem',

          fontFamily: 'sans',
        }}
      >
        Кирилл &amp; Алина&nbsp;&nbsp;&nbsp;Кирилл &amp; Алина&nbsp;&nbsp;&nbsp;Кирилл &amp; Алина&nbsp;&nbsp;&nbsp;
        Кирилл &amp; Алина&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Кирилл &amp; Алина&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Кирилл &amp; Алина&nbsp;&nbsp;&nbsp;
         Кирилл &amp; Алина&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Кирилл &amp; Алина&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Кирилл &amp; Алина&nbsp;&nbsp;&nbsp;
          Кирилл &amp; Алина&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Кирилл &amp; Алина&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Кирилл &amp; Алина&nbsp;&nbsp;&nbsp;
      </div>
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default ScrollingText;