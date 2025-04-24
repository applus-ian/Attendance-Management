"use client"

import { useEffect, useState } from "react"

interface CircularClockProps {
  greeting?: string
}

export function CircularClock({ greeting = "Good Morning, Employee !" }: CircularClockProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format time as HH:MM AM/PM
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  // Format date as "Day DD, Month YYYY"
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  // Generate detailed tick marks for the clock
  const renderTicks = () => {
    const ticks = [];
    for (let i = 0; i < 120; i++) {
      const rotation = i * 3; // 360 degrees / 120 ticks = 3 degrees per tick
      const isHourMark = i % 10 === 0; // Every 10th tick is an orange hour mark
      const isMidBlackTick = i % 10 === 5; // Every 5th tick between hour marks is taller

      // Different lengths based on mark type
      const innerRadius = 145; // Starting point after the gap from orange circle
      const outerRadius = isHourMark
        ? 160 // Orange hour marks are the longest
        : isMidBlackTick
        ? 158 // Mid black ticks are slightly taller
        : 153; // Regular black ticks are the shortest

      ticks.push(
        <line
          key={i}
          x1="0"
          y1={-innerRadius}
          x2="0"
          y2={-outerRadius}
          transform={`rotate(${rotation})`}
          stroke={isHourMark ? "#FF6B00" : "#000000"} // Orange for hour marks, black for others
          strokeWidth={isHourMark ? 2 : 1}
        />,
      );
    }
    return ticks;
  }

  return (
    <div className="flex flex-col items-center max-w-md w-full">
      {greeting && <h1 className="text-xl md:text-2xl font-medium mb-4 text-center">{greeting}</h1>}

      <div className="relative w-full aspect-square max-w-sm">
        <svg viewBox="-180 -180 360 360" className="w-full h-full">
          {/* Orange circle */}
          <circle cx="0" cy="0" r="130" fill="none" stroke="#FF6B00" strokeWidth="8" />

          {/* Tick marks */}
          {renderTicks()}
        </svg>

        {/* Time and date overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">{formattedTime}</h2>
          <p className="text-sm sm:text-base md:text-lg mt-1">{formattedDate}</p>
        </div>
      </div>
    </div>
  )
}
