import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const dressColors = [
  { image: '/images/silk-beige-light.png', name: 'Светлый бежевый' },
  { image: '/images/silk-beige-dark.png', name: 'Тёмный бежевый' },
  { image: '/images/silk-pink.png', name: 'Нежно-розовый' },
  { image: '/images/silk-rose.png', name: 'Пыльная роза' },
  { image: '/images/silk-olive.png', name: 'Оливковый' },
  { image: '/images/silk-green.png', name: 'Зелёный' },
];

const dressImages = [
  '/images/dress-1.jpg',
  '/images/dress-2.jpg',
  '/images/dress-3.jpg',
  '/images/dress-4.jpg',
  '/images/dress-5.jpg',
];

const suitImages = [
  '/images/suit-1.jpg',
  '/images/suit-2.jpg',
  '/images/suit-3.jpg',
];

const DressCodeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const [emblaRefDress, emblaApiDress] = useEmblaCarousel({ loop: true, align: 'start' });
  const [emblaRefSuit, emblaApiSuit] = useEmblaCarousel({ loop: true, align: 'start' });
  const [, setCanScrollPrevDress] = useState(false);
  const [, setCanScrollNextDress] = useState(true);
  const [, setCanScrollPrevSuit] = useState(false);
  const [, setCanScrollNextSuit] = useState(true);

  const scrollPrevDress = useCallback(() => emblaApiDress?.scrollPrev(), [emblaApiDress]);
  const scrollNextDress = useCallback(() => emblaApiDress?.scrollNext(), [emblaApiDress]);
  const scrollPrevSuit = useCallback(() => emblaApiSuit?.scrollPrev(), [emblaApiSuit]);
  const scrollNextSuit = useCallback(() => emblaApiSuit?.scrollNext(), [emblaApiSuit]);

  useEffect(() => {
    if (!emblaApiDress) return;
    const onSelect = () => {
      setCanScrollPrevDress(emblaApiDress.canScrollPrev());
      setCanScrollNextDress(emblaApiDress.canScrollNext());
    };
    emblaApiDress.on('select', onSelect);
    onSelect();
    return () => { emblaApiDress.off('select', onSelect); };
  }, [emblaApiDress]);

  useEffect(() => {
    if (!emblaApiSuit) return;
    const onSelect = () => {
      setCanScrollPrevSuit(emblaApiSuit.canScrollPrev());
      setCanScrollNextSuit(emblaApiSuit.canScrollNext());
    };
    emblaApiSuit.on('select', onSelect);
    onSelect();
    return () => { emblaApiSuit.off('select', onSelect); };
  }, [emblaApiSuit]);

  useGSAP(() => {
    if (!paletteRef.current) return;

    const circles = paletteRef.current.children;
    
    gsap.fromTo(
      circles,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="dresscode"
      className="section-padding gradient-bg-pink-green min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
       style={{ backgroundImage: "url('/images/bg-dress.jpg')" }}

    >
      <h2 className="font-display text-4xl md:text-5xl text-[#f4a1ae] mb-4  [text-shadow:_1px_1px_1px_rgb(10_10_10_/_1)]">
        Дресс-код
      </h2>

      <p className="font-display font-bold text-base text-[#1f2420] text-center mb-6 max-w-md">
        Мы будем рады, если вы поддержите цветовую гамму нашей свадьбы
      </p>

      {/* Color Palette with silk images */}
<div ref={paletteRef} className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
  {dressColors.map((item, idx) => (
    <div key={idx} className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md transition-transform hover:scale-110">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs text-[#8b9a8b] font-body hidden md:block">
        {item.name}
      </span>
    </div>
  ))}
</div>

      {/* Dress Carousel */}
      <div className="w-full max-w-2xl mb-10">
        
        <h3 className="rounded-full py-3 px-8 bg-[#ffc8ca] font-display text-2xl text-[#1f2420] text-center mb-4  [text-shadow:_0px_0px_1px_rgb(10_10_10_/_1)]">
          Для девушек: 
        </h3>
        <p className="text-xs text-[#1f2420] text-justify font-light mb-4 leading-none">
          Вы можете выбрать любой удобный для вас наряд. 
          Будет здорово, если получится отдать предпочтение однотонным тканям без 
          крупных принтов и узоров. Мы просим избежать красных и темных оттенков
          - пусть наш день будет наполнен светом!<br></br> А белый цвет, по традиции, 
          мы оставим для невесты.
        </p>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRefDress}>
            <div className="flex gap-4">
              {dressImages.map((img, index) => (
                <div
                  key={index}
                  className="flex-none w-[150px] md:w-[180px]"
                >
                  <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src={img}
                      alt={`Платье ${index + 1}`}
                      className="w-full h-[200px] md:h-[240px] object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrevDress}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#fdcfd4] transition-colors z-10"
          >
            <ChevronLeft size={20} className="text-[#1f2420]" />
          </button>
          <button
            onClick={scrollNextDress}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#fdcfd4] transition-colors z-10"
          >
            <ChevronRight size={20} className="text-[#1f2420]" />
          </button>
        </div>
      </div>

      {/* Suit Carousel */}
      <div className="w-full max-w-2xl">
        <h3 className="rounded-full py-3 px-8 bg-[#9fc358] font-display text-2xl text-[#1f2420] text-center mb-4  [text-shadow:_0px_0px_1px_rgb(10_10_10_/_1)]">
          Для мужчин: 
        </h3>
        <p className="text-xs text-[#1f2420] text-justify font-light mb-4 leading-none ">
        Знаем, что сборы на свадьбу могут быть стрессом, поэтому мы за комфорт! 
        Подойдет и классический костюм (черный или бежевый), и просто брюки с рубашкой или поло.
        Главное - ваше хорошее настроение, а поддержать гамму праздника можно любой деталью:
        от галстука до цветных носков.
        </p>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRefSuit}>
            <div className="flex gap-4">
              {suitImages.map((img, index) => (
                <div
                  key={index}
                  className="flex-none w-[150px] md:w-[180px]"
                >
                  <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src={img}
                      alt={`Костюм ${index + 1}`}
                      className="w-full h-[200px] md:h-[240px] object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrevSuit}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#afc28a]/30 transition-colors z-10"
          >
            <ChevronLeft size={20} className="text-[#1f2420]" />
          </button>
          <button
            onClick={scrollNextSuit}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#afc28a]/30 transition-colors z-10"
          >
            <ChevronRight size={20} className="text-[#1f2420]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DressCodeSection;
