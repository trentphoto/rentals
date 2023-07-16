import React from 'react'
import Link from 'next/link'

export const HowItWorks = () => (
    <Link className="block bg-gray-100 rounded-xl p-8 pt-20 border-b-8 border-primary-500 group mb-8" href="how-it-works" >
        <h3 className="text-4xl mb-4">How it Works</h3>
        
        {/* red divider line */}
        <div className="w-20 h-0.5 bg-primary-500 rounded-full mb-2 group-hover:scale-x-125 origin-left transition-transform" />
        
        <p>The rental process from A to Z.</p>
    </Link>
)

export const FAQ = () => (
    <Link className="block bg-gray-100 rounded-xl p-8 pt-20 border-b-8 border-primary-500 group" href="/faq" >
        <h3 className="text-4xl mb-4">FAQs</h3>
        
        {/* red divider line */}
        <div className="w-20 h-0.5 bg-primary-500 rounded-full mb-2 group-hover:scale-x-125 origin-left transition-transform" />

        <p>Answers to your most common questions.</p>
    </Link>
)
