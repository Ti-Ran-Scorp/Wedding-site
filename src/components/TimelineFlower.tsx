// ============================================================================
// [ASSET: SVG "timeline-flower"]
// Simple 6-petal flower for the timeline section.
// Two instances are used - one olive green and one blush pink.
// ============================================================================

export default function TimelineFlower({ color = '#afc28a', className = '' }: { color?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g>
        {/* 6 petals */}
        <ellipse cx="40" cy="20" rx="10" ry="18" fill={color} opacity="0.6" />
        <ellipse cx="57" cy="30" rx="10" ry="18" fill={color} opacity="0.6" transform="rotate(60 57 30)" />
        <ellipse cx="57" cy="50" rx="10" ry="18" fill={color} opacity="0.6" transform="rotate(120 57 50)" />
        <ellipse cx="40" cy="60" rx="10" ry="18" fill={color} opacity="0.6" transform="rotate(180 40 60)" />
        <ellipse cx="23" cy="50" rx="10" ry="18" fill={color} opacity="0.6" transform="rotate(240 23 50)" />
        <ellipse cx="23" cy="30" rx="10" ry="18" fill={color} opacity="0.6" transform="rotate(300 23 30)" />
        {/* Center */}
        <circle cx="40" cy="40" r="8" fill={color} opacity="0.8" />
        <circle cx="40" cy="40" r="4" fill="#ffffff" opacity="0.5" />
      </g>
    </svg>
  )
}
