import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contacts = [
  {
    name: 'Кирилл',
    role: 'Жених',
    phone: '+7 (922) 561-91-91',
    tel: '+79225619191',
  },
  {
    name: 'Алина',
    role: 'Невеста',
    phone: '+7 (938) 426-24-28',
    tel: '+79384262428',
  },
  {
    name: 'Николай Соколов',
    role: 'Ведущий',
    phone: '+7 (962) 441-14-66',
    tel: '+79624411466',
  },
]

export default function Contacts() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !cardsRef.current) return

    const cards = cardsRef.current.querySelectorAll('.contact-card')
    gsap.from(cards, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
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
      id="contacts"
      className="section-padding bg-white"
    >
      <div className="max-w-[600px] mx-auto text-center">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-olive font-bold mb-2">
          Контакты
        </h2>
        <p className="font-display text-[clamp(1.1rem,1.5vw,1rem)] text-gray font-bold mb-10">
          По всем вопросам, связанным с мероприятием, вы можете обратиться к нам, и нашему организатору
        </p>

        <div ref={cardsRef} className="space-y-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="contact-card bg-olive-bg rounded-2xl p-6 flex items-center gap-2 text-left"
            >
              {/* Phone icon */}
              <div className="w-11 h-11 rounded-full bg-olive-light/15 flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#afc28a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>

              {/* Name & role */}
              <div className="flex-1 min-w-0">
                <p className="font-body text-[0.85rem] font-medium text-dark">
                  {contact.name}
                </p>
                <p className="font-body text-[0.8rem] text-gray font-light">
                  {contact.role}
                </p>
              </div>

              {/* Phone number - clickable */}
              {/* ============================================================================
                  [CONTACT: Phone Numbers]
                  These phone numbers are clickable and will initiate a call on mobile devices.
                  REPLACE: Update the phone numbers and names as needed.
                  Format: tel:+7XXXXXXXXXX (Russian format without spaces/parentheses)
                  ============================================================================ */}
              <a
                href={`tel:${contact.tel}`}
                className="font-body text-[0.65rem] text-olive font-normal hover:text-blush transition-colors duration-300 flex-shrink-"
              >
                {contact.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
