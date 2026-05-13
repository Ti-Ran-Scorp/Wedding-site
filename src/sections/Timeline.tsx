import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const events = [
  { time: '16:00', name: 'Сбор гостей' },
  { time: '16:30', name: 'Выездная церемония' },
  { time: '17:30', name: 'Торжественный банкет' },
  { time: '22:00', name: 'Праздничный торт' },
  { time: '23:00', name: 'Завершение вечера' },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const flower1Ref = useRef<HTMLDivElement>(null)
  const flower2Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // Central line grows from top
    gsap.from(lineRef.current, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })

    // Timeline items stagger in
    const items = itemsRef.current?.querySelectorAll('.timeline-item')
    if (items) {
      gsap.from(items, {
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -30 : 30),
        duration: 0.7,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
    }

    // Rotating flowers tied to scroll
    if (flower1Ref.current) {
      gsap.to(flower1Ref.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      })
    }

    if (flower2Ref.current) {
      gsap.to(flower2Ref.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
        
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="section-padding bg-olive-bg relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-inv.jpg')" }}
    >
      {/* Rotating flowers */}
      <div
        ref={flower1Ref}
        className="absolute top-[15%] left-[5%] sm:left-[10%] w-16 h-16 sm:w-20 sm:h-20 opacity-100 pointer-events-none"
      >
        <img src="/images/tl-flower-top.png" alt="Цветок-левый" className="w-full h-full object-cover" />
      </div>
      <div
        ref={flower2Ref}
        className="absolute bottom-[15%] right-[5%] sm:right-[10%] w-16 h-16 sm:w-20 sm:h-20 opacity-100 pointer-events-none"
      >
        <img src="/images/tl-flower-bot.png" alt="Цветок-левый" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-[600px] mx-auto relative">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-olive  text-center mb-12 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_1)]">
          Программа дня
        </h2>
        

        {/* Timeline container */}
        <div ref={itemsRef} className="relative">
          {/* Central vertical line */}
          <div
            ref={lineRef}
            className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-olive-light to-blush"
          />

          {/* Timeline items */}
          <div className="space-y-8">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0
              return (
                <div
                  key={index}
                  className={`timeline-item relative flex items-center ${
                    isLeft
                      ? 'sm:flex-row flex-row'
                      : 'sm:flex-row-reverse flex-row'
                  }`}
                >
                  {/* Dot on the line */}
                  <div className="absolute left-6 sm:left-1/2 w-3 h-3 bg-blush border-[3px] border-white rounded-full shadow-[0_0_0_2px_#afc28a] -translate-x-1/2 z-10" />

                  {/* Content card */}
                  <div
                    className={`ml-12 sm:ml-0 ${
                      isLeft ? 'sm:mr-[calc(50%+24px)] sm:text-right' : 'sm:ml-[calc(50%+24px)] sm:text-left'
                    }`}
                  >
                    <div className="bg-white rounded-xl px-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] max-w-[240px]">
                      <p className="font-display text-[1.3rem] text-blush font-normal">
                        {event.time}
                      </p>
                      <p className="font-body text-[1rem] text-dark font-light">
                        {event.name}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
