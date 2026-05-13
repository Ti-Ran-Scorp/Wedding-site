import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface HeroCoupleRevealProps {
  isActive: boolean;
}

export default function HeroCoupleReveal({ isActive }: HeroCoupleRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bridePhotoRef = useRef<HTMLDivElement>(null);
  const groomPhotoRef = useRef<HTMLDivElement>(null);
  const brideBubbleRef = useRef<HTMLDivElement>(null);
  const groomBubbleRef = useRef<HTMLDivElement>(null);
  const greenCircleRef = useRef<HTMLDivElement>(null);
  const pinkCircleRef = useRef<HTMLDivElement>(null);

  // 1. ОДИН РАЗ при монтировании устанавливаем начальное скрытое состояние
  useGSAP(() => {
    gsap.set(bridePhotoRef.current, { x: -60, opacity: 0 });
    gsap.set(groomPhotoRef.current, { x: 60, opacity: 0 });
    gsap.set(brideBubbleRef.current, { scale: 0.5, opacity: 0 });
    gsap.set(groomBubbleRef.current, { scale: 0.5, opacity: 0 });
  }, { scope: sectionRef, dependencies: [] });

  // 2. Анимация ПОЯВЛЕНИЯ, когда isActive === true
  useGSAP(() => {
    if (!isActive) return;

    const tl = gsap.timeline();
    tl.to(bridePhotoRef.current, { x: 0, opacity: 1, duration: 3, ease: 'power2.out' }, 0.2);
    tl.to(groomPhotoRef.current, { x: 0, opacity: 1, duration: 3, ease: 'power2.out' }, 0.4);
    tl.to(brideBubbleRef.current, { scale: 1, opacity: 1, duration: 1.5, ease: 'back.out(1.7)' }, 1.0);
    tl.to(groomBubbleRef.current, { scale: 1, opacity: 1, duration: 1.5, ease: 'back.out(1.7)' }, 1.3);
  }, { scope: sectionRef, dependencies: [isActive] });

  // Бесконечное вращение кружков (без изменений)
  useGSAP(() => {
    gsap.to(greenCircleRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    });
    gsap.to(pinkCircleRef.current, {
      rotation: -360,
      duration: 20,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat"
       style={{ backgroundImage: "url('/images/bg-reveal.jpg')" }}
    >
      {/* Зелёный кружок (лево-верх) */}
      <div
        ref={greenCircleRef}
        className="absolute top-0 right-10 w-40 h-40 opacity-[1] pointer-events-none"
      >
        <img src="/images/left-top.png" alt="Цветок-левый" className="w-full h-full object-cover" />
      </div>

      {/* Розовый кружок (право-низ) */}
      <div
        ref={pinkCircleRef}
        className="absolute bottom-0 right-15 w-40 h-40 opacity-[1] pointer-events-none"
      >
        <img src="/images/right-bottom.png" alt="Цветок-правый" className="w-full h-full object-cover" />
      </div>

      {/* Основной контент (фото, облачка) */}
      <div className="flex flex-row flex-nowrap items-center justify-center gap-2 px-4 py-16 overflow-x-hidden">
        {/* Bride card */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            ref={brideBubbleRef}
            className="relative mb-4 ml-6 sm:ml-10 w-[clamp(160px,35vw,220px)] bg-white border-2 border-blush rounded-3xl px-3 py-2 sm:px-5 sm:py-3 shadow-sm"
          >
            <p className="font-display text-[clamp(0.85rem,3.5vw,1.1rem)] text-dark italic text-center leading-4">
              Интересно, кто будет моим мужем, когда я вырасту?
            </p>
            <div className="absolute -bottom-3 left-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-blush sm:left-6 sm:border-l-[10px] sm:border-r-[10px] sm:border-t-[14px]" />
            <div className="absolute -bottom-[9px] left-[18px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-white sm:left-[26px] sm:border-l-[8px] sm:border-r-[8px] sm:border-t-[12px]" />
          </div>

          <div
            ref={bridePhotoRef}
            className="w-[clamp(120px,30vw,280px)] h-[clamp(220px,45vh,380px)] rounded-2xl overflow-hidden shadow-md"
          >
            <img src="/images/bride-photo.jpg" alt="Алина — невеста" className="w-full h-full object-cover" />
          </div>
          <p className="font-display text-[clamp(1.2rem,5vw,1.5rem)] text-olive mt-3 text-center font-bold z-[1]">Алина</p>
        </div>

        {/* Groom card */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            ref={groomBubbleRef}
            className="relative mb-12 mr-6 sm:mr-10 w-[clamp(120px,30vw,180px)] bg-white border-2 border-blush rounded-3xl px-3 py-2 sm:px-5 sm:py-3 shadow-sm"
          >
            <p className="font-display text-[clamp(0.85rem,3.5vw,1.1rem)] text-dark italic text-center leading-tight">
              Я буду!
            </p>
            <div className="absolute -bottom-3 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-blush sm:right-6 sm:border-l-[10px] sm:border-r-[10px] sm:border-t-[14px]" />
            <div className="absolute -bottom-[9px] right-[18px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-white sm:right-[26px] sm:border-l-[8px] sm:border-r-[8px] sm:border-t-[12px]" />
          </div>

          <div
            ref={groomPhotoRef}
            className="w-[clamp(120px,30vw,280px)] h-[clamp(220px,45vh,380px)] rounded-2xl overflow-hidden shadow-md mr-7"
          >
            <img src="/images/groom-photo.jpg" alt="Кирилл — жених" className="w-full h-full object-cover" />
          </div>
          <p className="font-display text-[clamp(1.2rem,5vw,1.5rem)] text-olive mt-3 text-center font-bold mr-7 z-[1]">Кирилл</p>
        </div>
      </div>
    </section>
  )
}