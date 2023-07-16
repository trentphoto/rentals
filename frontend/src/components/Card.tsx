import clsxm from "@/lib/clsxm";
import * as React from "react";

interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <>
      <div className={clsxm("shadow-lg bg-white rounded-md overflow-hidden p-8", className)}>
        { children }
      </div>
    </>
  )
}
