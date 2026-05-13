import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DateSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const days = [
    [null, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, null, null, null, null],
  ];

  useGSAP(() => {
    if (!calendarRef.current) return;

    const cells = calendarRef.current.querySelectorAll('.calendar-cell');
    
    gsap.fromTo(
      cells,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

    if (heartRef.current) {
      gsap.fromTo(
        heartRef.current,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="date"
      className="section-padding bg-blush min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-reveal.jpg')" }}
    >
      {/* Decorative leaves */}
      <div className="absolute left-0 top-1/4 opacity-20">
        <svg width="120" height="300" viewBox="0 0 120 300" fill="none">
          <path d="M60 0 Q20 50 30 100 Q40 150 60 200 Q80 250 60 300" stroke="#afc28a" strokeWidth="2" fill="none" />
          <ellipse cx="30" cy="80" rx="20" ry="10" fill="#afc28a" transform="rotate(-30 30 80)" />
          <ellipse cx="50" cy="140" rx="22" ry="11" fill="#809d47" transform="rotate(20 50 140)" />
          <ellipse cx="40" cy="200" rx="18" ry="9" fill="#afc28a" transform="rotate(-15 40 200)" />
          <ellipse cx="55" cy="260" rx="20" ry="10" fill="#809d47" transform="rotate(25 55 260)" />
        </svg>
      </div>
      <div className="absolute right-0 top-1/3 opacity-20" style={{ transform: 'scaleX(-1)' }}>
        <svg width="120" height="300" viewBox="0 0 120 300" fill="none">
          <path d="M60 0 Q20 50 30 100 Q40 150 60 200 Q80 250 60 300" stroke="#afc28a" strokeWidth="2" fill="none" />
          <ellipse cx="30" cy="80" rx="20" ry="10" fill="#afc28a" transform="rotate(-30 30 80)" />
          <ellipse cx="50" cy="140" rx="22" ry="11" fill="#809d47" transform="rotate(20 50 140)" />
          <ellipse cx="40" cy="200" rx="18" ry="9" fill="#afc28a" transform="rotate(-15 40 200)" />
          <ellipse cx="55" cy="260" rx="20" ry="10" fill="#809d47" transform="rotate(25 55 260)" />
        </svg>
      </div>

      <div className="text-center mb-6">
        <p className="font-display text-3xl font-bold text-[#1f2420]">Сентябрь 2026</p>
      </div>

      {/* Calendar */}
      <div
        ref={calendarRef}
        className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/80"
      >
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="calendar-cell text-center text-sm font-medium text-[#8b9a8b] py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        {days.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2">
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`calendar-cell relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-base md:text-lg font-medium transition-all ${
                  day === 6
                    ? 'bg-[#edaab3] text-white shadow-lg'
                    : day
                    ? 'text-[#1f2420] hover:bg-[#fdcfd4]/30'
                    : ''
                }`}
              >
                {day}
                {day === 6 && (
                  <div
                    ref={heartRef}
                    className="absolute -top-2 -right-2 animate-pulse-heart"
                  >
                    <Heart size={18} fill="#f4a1ae" color="#f4a1ae" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="font-display text-2xl text-[#1f2420] font-bold">
          Воскресенье, <span className="text-[#da6788]">6 сентября</span>
        </p>
      </div>
    </section>
  );
};

export default DateSection;
