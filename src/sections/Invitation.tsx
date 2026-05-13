import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OliveBranch from '../components/OliveBranch'

gsap.registerPlugin(ScrollTrigger)

const photos = [
  {
    src: '/images/invitation-photo-1.jpg',
    alt: 'Фото пары 1',
  },
  {
    src: '/images/invitation-photo-2.jpg',
    alt: 'Фото пары 2',
  },
  {
    src: '/images/invitation-photo-3.jpg',
    alt: 'Фото пары 3',
  },
]

export default function Invitation() {
  const sectionRef = useRef<HTMLElement>(null)
  const photosRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !photosRef.current || !textRef) return

    const photoElements = photosRef.current.querySelectorAll('.invitation-photo')

    gsap.from(photoElements, {
      x: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.9,
      delay: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="invitation"
      className="section-padding bg-olive bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-inv.jpg')" }}
    >
      <div className="max-w-[800px] mx-auto">
        {/* Photo fan */}
        <div
          ref={photosRef}
          className="flex flex-row items-center justify-center gap-14 sm:gap-0 sm:-space-x-4"
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`
                invitation-photo
                w-[clamp(100px,28vw,180px)] h-[clamp(133px,37vw,240px)]
                rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]
                border-[3px] border-white flex-shrink-0
                ${index === 0 ? '-rotate-[6deg] sm:-rotate-[8deg]' : ''}
                ${index === 2 ? 'rotate-[6deg] sm:rotate-[8deg]' : ''}
                ${index === 1 ? 'z-10 absolute' : 'z-0'}
              `}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Text block */}
        <div ref={textRef} className="relative top-10 bg-center bg-no-repeat p-8 md:p-12 rounded-lg "
        style={{ backgroundImage: "url('/images/bg-invit-text.png')" }}>
          <div className="flex justify-center mb-1">
            <OliveBranch className="w-20" />
          </div>
          
          <h2 className="font-display  text-[clamp(2rem,5vw,3rem)] 
          text-olive font-light ml-3 mb-2">
            Приглашение
          </h2>
                  

          <p className="font-body text-[clamp(1rem,2vw,1.15rem)] text-dark font-light leading-[1.8] max-w-[600px] mx-auto  leading-[1] text-justify">
            Тем, кто с нами с самого начала, и тем, кто стал частью нашей истории позже — вы сделали нашу жизнь ярче. Теперь мы хотим, чтобы вы стали свидетелями её самого счастливого дня!
          </p>
        </div>
      </div>
    </section>
  )
}