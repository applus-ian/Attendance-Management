"use client";

import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col items-center justify-center w-64 h-64 rounded-full border-8 border-orange-500 relative">
      {/* Clock ticks */}
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-4 bg-red-500 ${
            i % 5 === 0 ? "h-6 bg-black" : ""
          }`}
          style={{
            transform: `rotate(${i * 6}deg) translate(0, -120px)`,
          }}
        ></div>
      ))}

      {/* Time */}
      <div className="text-center">
        <div className="text-4xl font-bold">{formatTime(time)}</div>
        <div className="text-lg text-gray-600">{formatDate(time)}</div>
      </div>
    </div>
  );
}