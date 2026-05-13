import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [prevSeconds, setPrevSeconds] = useState(0);

  useEffect(() => {
    const targetDate = new Date('2026-09-06T16:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft.seconds !== prevSeconds) {
      setPrevSeconds(timeLeft.seconds);
    }
  }, [timeLeft.seconds, prevSeconds]);

  useGSAP(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden">
        <span
          className="font-display text-3xl md:text-5xl text-[#1f2420] block transition-transform duration-300"
          style={{
            transform: label === 'Секунды' ? 'translateY(0)' : undefined,
          }}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="font-display text-xs md:text-sm text-[#8b9a8b] uppercase tracking-wider mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="countdown"
      className="section-padding bg-[#fdf8f2] min-h-[40vh] flex flex-col items-center justify-center"
    >
      <div ref={contentRef} className="text-center">
        <h2 className="font-display text-2xl md:text-3xl text-[#f4a1ae] mb-8 font-bold">
          До нашей свадьбы осталось:
        </h2>

        <div className="flex items-center justify-center gap-2 md:gap-8 font-bold">
          <TimeBlock value={timeLeft.days} label="Дни"/>
          <span className="font-display text-3xl md:text-5xl text-[#edaab3] pb-6">:</span>
          <TimeBlock value={timeLeft.hours} label="Часы" />
          <span className="font-display text-3xl md:text-5xl text-[#edaab3] pb-6">:</span>
          <TimeBlock value={timeLeft.minutes} label="Минуты" />
          <span className="font-display text-3xl md:text-5xl text-[#edaab3] pb-6">:</span>
          <TimeBlock value={timeLeft.seconds} label="Секунды" />
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;