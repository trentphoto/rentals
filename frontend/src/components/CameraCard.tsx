import clsxm from "../lib/clsxm";
import * as React from "react";
import Link from "next/link";

interface CardProps {
  className?: string
  size: "full" | "small" | "square"
  variant: "dark" | "light" | "white"
  imageUrl: string
  title: string
  subtitle: string
  href?: string
}

export default function CameraCard({ className, href, variant = "dark", size = "full", title, subtitle, imageUrl }: CardProps) {

  // define the class name of the wrapper (either LinkWrap or DivWrap)
  const wrapperClassNameString = clsxm(
    "group",
    "flex gap-8",
    "mb-8",
    "rounded-xl overflow-hidden relative", 
    variant === "dark" ? "bg-zinc-800 text-white shadow-xl" : variant === 'light' ? "bg-gray-200 text-gray-800 shadow-lg" : "bg-white text-gray-800 drop-shadow-[0_20px_20px_rgba(0,0,0,0.10)]", // bg and text color
    className
  )

  // define the link wrapper
  function LinkWrap({ children }: { children: React.ReactNode }) {
    return (
      <Link href={href!} className={wrapperClassNameString}>
          {children}
      </Link>
    )
  }

  // define the div wrapper
  function DivWrap({ children }: { children: React.ReactNode }) {
    return (
      <div className={wrapperClassNameString}>
        { children }
      </div>
    )
  }

  // define the inner content
  function InnerContent(){
    return (
      <>

        {/* image  */}
        <div className="w-40 h-40 relative">
            <img src={imageUrl} alt="placeholder" className="h-full object-cover absolute" style={{
              objectPosition: "right center",
              right: 0,
              top: -6,
              paddingBottom: 10,
            }} />
          </div>

          {/* content  */}
          <div className="flex flex-col justify-center items-start py-6">

            {/* red divider line */}
            <div className="w-20 h-0.5 bg-primary-500 rounded-full mb-2 group-hover:scale-x-125 origin-left transition-transform" />

            {/* title */}
            <h3 className="text-3xl font-serif font-normal pr-4">{title}</h3>

            {/* subtitle */}
            <p className={clsxm(
              "pr-4 text-sm",
               variant === "dark" ? "text-gray-400" : "text-gray-600"
            )}>{subtitle}</p>
          </div>

          {/* animated "view" text and arrow on hover */}
          <div className="absolute bottom-2 right-2 rounded-xl px-4 py-2 flex items-center gap-2">
            <div className="font-medium opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 transition-all">View</div>

            <svg
              viewBox='0 0 16 16'
              height='1.4em'
              width='1.4em'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className={clsxm(
                // 'group-hover:text-primary-500',
                'relative',
                'transition-transform duration-200',
                'motion-safe:-translate-x-1',
                'group-hover:translate-x-0'
              )}
            >
              <path
                fill='currentColor'
                d='M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z'
              />
              <path
                stroke='currentColor'
                d='M1.75 8H11'
                strokeWidth='1.5'
                strokeLinecap='round'
                className={clsxm(
                  'origin-left transition-all duration-200',
                  'opacity-0 motion-safe:-translate-x-1',
                  'group-hover:translate-x-0 group-hover:opacity-100'
                )}
              />
            </svg>


          </div>

      </>
    )
  }

  // if href is provided, wrap in a link, otherwise wrap in a div
  return href ? (

    <LinkWrap>

      <InnerContent />

    </LinkWrap>

  ) : (

    <DivWrap>

      <InnerContent />

    </DivWrap>

  )
}
