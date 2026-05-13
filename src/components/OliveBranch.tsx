export default function OliveBranch({ className = '', color = '#afc28a' }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 100 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 12c10-8 25-10 40-6s30 8 48 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaves */}
      <ellipse cx="20" cy="8" rx="6" ry="3" fill={color} opacity="1" transform="rotate(-30 20 8)" />
      <ellipse cx="35" cy="16" rx="6" ry="3" fill={color} opacity="1" transform="rotate(25 35 16)" />
      <ellipse cx="50" cy="7" rx="6" ry="3" fill={color} opacity="1" transform="rotate(-20 50 7)" />
      <ellipse cx="65" cy="15" rx="6" ry="3" fill={color} opacity="1" transform="rotate(30 65 15)" />
      <ellipse cx="80" cy="9" rx="6" ry="3" fill={color} opacity="1" transform="rotate(-25 80 9)" />
    </svg>
  )
}
