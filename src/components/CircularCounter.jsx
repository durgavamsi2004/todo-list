import React from 'react'

const RADIUS = 38
const CIRCUM = 2 * Math.PI * RADIUS

export default function CircularCounter({ completed, total, percent }) {
  const progress = CIRCUM * (1 - percent / 100)
  const pending = total - completed
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem', marginTop: '-2.5rem', zIndex: 3, position: 'relative' }}>
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle
          cx="45" cy="45" r={RADIUS}
          fill="none"
          stroke="#e0e7ef"
          strokeWidth="8"
          opacity="0.4"
        />
        <circle
          cx="45" cy="45" r={RADIUS}
          fill="none"
          stroke="#646cff"
          strokeWidth="8"
          strokeDasharray={CIRCUM}
          strokeDashoffset={progress}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(.4,2,.6,1)' }}
        />
        <text
          x="50%" y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="1.5em"
          fontWeight="bold"
          fill="#646cff"
          style={{ transition: 'fill 0.5s' }}
        >
          {percent}%
        </text>
      </svg>
      <div style={{ marginTop: '0.3em', fontWeight: 600, color: '#646cff', fontSize: '1.1em', letterSpacing: '0.01em' }}>
        {completed} Completed / {pending} Pending
      </div>
    </div>
  )
} 