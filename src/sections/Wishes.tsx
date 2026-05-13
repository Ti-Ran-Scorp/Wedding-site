import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Wishes() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    // При желании добавьте анимацию появления
    gsap.from(sectionRef.current, {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full">
      <img
        src="/images/bg-wish.jpg"
        alt="Фон"
        className="w-full h-auto block"
      />
    </section>
  );
}