import React from 'react'
import clsxm from '../../lib/clsxm'

export default function GrayBarSection({ children, className, variant = '200' }: { children: React.ReactNode, className?: string, variant?: string }) {
  return (
    <>
        <section>
            <div className="container">
                <div className={clsxm(
                    `mb-12 bg-gray-${variant} rounded-xl px-8 py-3`,
                    className
                )}>
                    {children}
                </div>
            </div>
        </section>
    </>
  )
}
