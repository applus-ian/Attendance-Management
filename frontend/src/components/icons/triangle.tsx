import type React from "react"
import { cn } from "@/lib/utils"

interface TriangleProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Triangle({ className, ...props }: TriangleProps) {
  return (
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
      {...props}
    >
      <path d="M4 0L7.4641 6H0.535898L4 0Z" />
    </svg>
  )
}


