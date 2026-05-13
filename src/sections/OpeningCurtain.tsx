import { useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FlowerBouquetLeft from '../components/FlowerBouquetLeft'
import FlowerBouquetRight from '../components/FlowerBouquetRight'
import ClapperboardSVG from '../components/ClapperboardSVG'

interface OpeningCurtainProps {
  onOpen: () => void
}

export default function OpeningCurtain({ onOpen }: OpeningCurtainProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const leftFlowerRef = useRef<HTMLDivElement>(null)
  const rightFlowerRef = useRef<HTMLDivElement>(null)
  const clapperRef = useRef<HTMLImageElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!buttonRef.current) return
    // Idle pulse animation for the start button
    gsap.to(buttonRef.current, {
      opacity: 0.7,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }, { scope: overlayRef })

  const handleClick = useCallback(() => {
  if (isAnimating) return
  setIsAnimating(true)

  const tl = gsap.timeline({
    onComplete: () => {
      setIsVisible(false)
      onOpen()
    },
  })

  // Анимация хлопушки (PNG)
  if (clapperRef.current) {
    gsap.set(clapperRef.current, { rotation: -5, scale: 0.95 })
    tl.to(clapperRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.12,
      ease: 'power4.in',
    }, 0)
  }

  // Flash effect (оставляем как было)
  tl.to(flashRef.current, {
    opacity: 1,
    duration: 0.05,
    onComplete: () => {
      gsap.to(flashRef.current, { opacity: 0, duration: 0.1 })
    },
  }, 0.1)

  // Button fade out
  tl.to(buttonRef.current, {
    opacity: 0,
    duration: 0.3,
  }, 0.12)

  // Clapperboard shrink and disappear
  tl.to(clapperRef.current, {
    scale: 0,
    opacity: 0,
    rotation: -10,
    duration: 0.4,
    ease: 'power2.in',
  }, 0.12)

  // Left flower disperses
  tl.to(leftFlowerRef.current, {
    x: '-60vw',
    y: '-40vh',
    rotation: -45,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.inOut',
  }, 0.12)

  // Right flower disperses
  tl.to(rightFlowerRef.current, {
    x: '60vw',
    y: '-40vh',
    rotation: 45,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.inOut',
  }, 0.12)

  // Overlay fade out
  tl.to(overlayRef.current, {
    opacity: 0,
    duration: 0.5,
  }, 0.8)

}, [isAnimating, onOpen])

  if (!isVisible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Flash overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white opacity-0 pointer-events-none z-[110]"
      />

      <div className="absolute inset-0 z-0">
    <img
      src="/images/background_green2.jpg"
      alt="Background"
      className="w-full h-full object-cover"
    />
  </div>

      {/* Left flower bouquet - теперь без отрицательного сдвига */}
      <div
        ref={leftFlowerRef}
        className="absolute top-0 left-0 w-1/2 h-full z-[101]"
        style={{ transformOrigin: 'center center' }}
      >
        <FlowerBouquetLeft className="w-full h-full" />
      </div>

      {/* Right flower bouquet - без положительного сдвига */}
      <div
        ref={rightFlowerRef}
        className="absolute top-0 right-0 w-1/2 h-full z-[101]"
        style={{ transformOrigin: 'center center' }}
      >
        <FlowerBouquetRight className="w-full h-full" />
      </div>

      {/* Center content: Clapperboard + Button */}
      <div className="relative z-[105] flex flex-col items-center">
        <ClapperboardSVG ref={clapperRef} />
        <button
          ref={buttonRef}
          className="mt-8 px-8 py-3 border border-black text-black rounded-full font-body font-medium text-[0.9rem] 
          tracking-[0.05em] bg-transparent bg-white transition-colors duration-300 hover:bg-black hover:text-white"
          onClick={(e) => {
            e.stopPropagation()
            handleClick()
          }}
        >
          Нажмите, чтобы начать
        </button>
      </div>
    </div>
  )
}
