import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Venue() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !bgRef.current || !textRef.current) return

    // Parallax effect on background
    gsap.to(bgRef.current, {
      y: '-20%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Text block entrance with stagger
    const textElements = textRef.current.querySelectorAll('.venue-text-item')
    gsap.from(textElements, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="venue"
      className="relative min-h-[70vh] overflow-hidden"
    >
      {/* Parallax background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {/* ============================================================================
            [ASSET: Image "venue-photo"]
            Photo of the "Zeleniy Mys" restaurant venue.
            REPLACE: Replace '/images/venue-photo.jpg' with your own venue photo.
            Recommended: landscape orientation (16:9), warm tones.
            Source link: You can use a photo of the actual restaurant
            or any beautiful banquet hall image.
            ============================================================================ */}
        <img
          src="/images/venue-photo.jpg"
          alt="Ресторан Зеленый Мыс"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/25 via-dark/30 to-transparent" />

      {/* Text content */}
      <div
        ref={textRef}
        className="relative z-10 min-h-[70vh] flex flex-col justify-end p-8 sm:p-12 lg:p-16"
      >
        <div className="venue-text-item">
          <p className="font-body text-[0.8rem] font-medium text-white uppercase tracking-[0.1em] mb-2">
            Место проведения
          </p>
        </div>

        <div className="venue-text-item">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-white font-light mb-2">
            Ресторан «Зеленый Мыс»
          </h2>
        </div>

        <div className="venue-text-item">
          <p className="font-body text-[1rem] text-white/85 font-bold mb-6">
            ул. Менделеева, 105, Невинномысск
          </p>
        </div>

        <div className="venue-text-item">
          <a
            href="https://yandex.ru/maps/org/zeleny_mys/1799472245/?ll=41.913235%2C44.658006&z=16.8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#ffaabf] text-white px-8 py-3 rounded-full font-medium text-[0.9rem] transition-all duration-300 hover:bg-[#e095a0] hover:scale-[1.02]"
          >
            {/* Map pin icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Показать карту
          </a>
        </div>
      </div>
    </section>
  )
}
