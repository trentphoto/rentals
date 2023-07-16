import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import Seo from '../components/Seo'
import CameraCard from '../components/CameraCard'
import NextImage from '../components/NextImage'
import DatePickerBar from '../components/layout/DatePickerBar'
import { Product } from '@/types/products'
import { FAQ, HowItWorks } from '@/components/SidebarCards'

export default function LocationsPage() {

  return (
    <Layout>
        <Seo />

        {/* hero section with background image and title and subtitle */}
        <section className='text-center mb-20'>
          <div className="container">
            <div className="flex flex-col justify-center items-center p-20 relative rounded-xl overflow-hidden">

              {/* background image */}
              <NextImage
                src="/images/aerial.webp"
                alt="pickup locations"
                className="flex items-center absolute inset-0 w-full h-full" 
                width={1300}
                height={800}
              />

              {/* overlay */}
              <div className="absolute inset-0 w-full h-full bg-black opacity-40" />
              
              {/* content */}
              <div className='text-white z-20 w-full py-20'>
                <h1 className="text-4xl md:text-6xl font-serif font-normal mb-2">Pickup Locations</h1>
                <p className="">In addition to free shipping, we offer two pickup locations in the DC metro area.</p>
              </div>

            </div>
          </div>
        </section>
        
        <section className='mb-12'>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center justify-center">
              
              <div>
                <p className='opacity-60'>Location 1</p>
                <h2 className='text-4xl font-serif font-normal mb-2'>Woodbridge, VA</h2>
                <p className="tracking-wide leading-relaxed">
                  Woodbridge VA is a suburb of Washington DC, located in Prince William County. It's a great location for those who live in the southern part of the DC metro area, or those who are traveling south to Richmond or North Carolina.
                </p>
              </div>

              <div className='rounded-3xl overflow-hidden'>
                {/* image  */}
                <NextImage
                  src="/images/woodbridge.webp"
                  alt="woodbridge"
                  className="w-full h-full object-cover"
                  width={700}
                  height={400}
                />
              </div>

            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center justify-center">
              
              <div className='rounded-3xl overflow-hidden'>
                {/* image  */}
                <NextImage
                  src="/images/tysons.webp"
                  alt="tysons"
                  className="w-full h-full object-cover"
                  width={700}
                  height={400}
                />
              </div>

              <div>
                <p className='opacity-60'>Location 2</p>
                <h2 className='text-4xl font-serif font-normal mb-2'>Tysons, VA</h2>
                <p className="tracking-wide leading-relaxed">
                  Tysons VA is a suburb of Washington DC, located in Fairfax County. It's a great location for those who live in the northern part of the DC metro area, or those who are traveling north to Baltimore or New York.
                </p>
              </div>

            </div>
          </div>
        </section>

    </Layout>
  )
}
