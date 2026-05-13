import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  y?: number
  x?: number
  scale?: number
  opacity?: number
  duration?: number
  delay?: number
  stagger?: number
  ease?: string
  start?: string
  children?: boolean
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null)

  const {
    y = 30,
    x = 0,
    scale,
    opacity = 0,
    duration = 0.7,
    delay = 0,
    stagger = 0,
    ease = 'power2.out',
    start = 'top 75%',
    children = false,
  } = options

  useGSAP(() => {
    if (!ref.current) return

    const targets = children ? ref.current.children : ref.current

    const fromVars: gsap.TweenVars = { opacity }
    if (y) fromVars.y = y
    if (x) fromVars.x = x
    if (scale !== undefined) fromVars.scale = scale

    gsap.from(targets, {
      ...fromVars,
      duration,
      delay,
      stagger: stagger || undefined,
      ease,
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })

  return ref
}
