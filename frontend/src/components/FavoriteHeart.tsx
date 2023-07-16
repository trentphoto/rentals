import clsxm from '@/lib/clsxm'
import React from 'react'

export default function FavoriteHeart({ active = false, toggleActive }: { active?: boolean, toggleActive?: () => void }) {
    
    const handleClick = () => {
        if (toggleActive) {
            toggleActive()
        }
    }

    return (
        <>
            <div 
                className={clsxm(
                    "p-3 rounded-lg transition-colors cursor-pointer flex items-center justify-center",
                    active ? "text-white bg-primary-500" : "text-gray-500 bg-gray-100 hover:bg-gray-200"
                )}
                onClick={handleClick}
            >
                {/* icon  */}
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 -960 960 960" 
                    fill={active ? "white" : "#b40000"}
                >
                    <path d="M480-140q-11 0-22-4t-19-12l-53-49Q262-320 171-424.5T80-643q0-90 60.5-150.5T290-854q51 0 101 24.5t89 80.5q44-56 91-80.5t99-24.5q89 0 149.5 60.5T880-643q0 114-91 218.5T574-205l-53 49q-8 8-19 12t-22 4Z" />
                </svg>

            </div>
        </>
    )
}
