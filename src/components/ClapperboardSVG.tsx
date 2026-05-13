import { forwardRef } from 'react'

const ClapperboardSVG = forwardRef<HTMLImageElement>((_, ref) => {
  return (
    <img
      ref={ref}
      src="/images/clapper.png"
      alt="Clapperboard"
      className="w-3/5 h-auto object-contain"
    />
  )
})

ClapperboardSVG.displayName = 'ClapperboardSVG'
export default ClapperboardSVG