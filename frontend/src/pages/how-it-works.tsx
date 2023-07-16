import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import NextImage from '@/components/NextImage';
import GrayBarSection from '@/components/layout/GrayBarSection';
import Link from 'next/link';
import ButtonLink from '@/components/links/ButtonLink';

// free shipping icon 
const FreeShip = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-primary-500 mr-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {/* truck */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
)

const IconCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-primary-500 mr-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {/* circle */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4c2.21 0 4
      1.79 4 4 0 2.21-1.79 4-4 4-2.21
      0-4-1.79-4-4 0-2.21 1.79-4
      4-4z"
    />
  </svg>
)

const HowItWorksCard = ({ title, content, icon }: { title: string, content: string, icon: string }) => {
  return (
    <GrayBarSection className='py-24 rounded-3xl mb-0'>
      <div className="flex items-start">
        {/* icon  */}
        <NextImage
          src={icon}
          alt={title}
          className="w-24 h-auto mt-0 mr-4"
          width={48}
          height={48}
        />

        {/* content  */}
        <div className='space-y-4'>
          <h3 className='text-3xl md:text-4xl'>{title}</h3>
          <div className="h-0.5 w-40 bg-primary-500" />
          <p className='text-sm tracking-wide leading-relaxed'>{content}</p>
        </div>

      </div>
    </GrayBarSection>
  )
}

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      {/* left-aligned hero section with background image and title and subtitle */}
      <section className='mb-20'>
          <div className="container">
            <div className="flex flex-col justify-center items-center p-20 shadow-xl relative rounded-xl overflow-hidden">

              {/* image wrapper  */}
              <div className="absolute h-full w-3/4 right-0 top-0">
                {/* background image */}
                <NextImage
                  src="/images/glass.webp"
                  alt="placeholder"
                  className="flex items-center absolute inset-0 w-full h-full" 
                  width={1200}
                  height={800}
                />
              </div>

              {/* overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-stone-900 from-30% via-stone-900 via-35% to-90%" />
              
              {/* content */}
              <div className='text-white z-20 w-full py-8'>
                <h1 className="text-5xl font-serif font-normal mb-2">How it Works</h1>
                <p className="text-white opacity-70 max-w-2xl text-sm tracking-wide leading-relaxed">Renting from DC Camera Rentals is a straightforward and hassle-free process designed to give you the ultimate convenience and flexibility. Whether you’re working on a professional project or embarking on a personal creative endeavor, we’re here to make the rental experience seamless.</p>
              </div>

            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">

              <HowItWorksCard
                title='1. Select & Reserve Items.'
                content='Browse our selection of cameras, lenses, and accessories. Select the items you want to rent and add them to your cart. Choose your rental dates and checkout.'
                icon='/icons/shop.svg'
              />

              <HowItWorksCard
                title='2. Free Shipping or Local Pickup.'
                content='We offer free shipping on all orders over $100. If you’re in the DC area, you can also pick up your order from our office in Georgetown.'
                icon='/icons/ship.svg'
              />

              <HowItWorksCard
                title='3. Create Something Great.'
                content='Once you receive your order, you’re ready to create something great. We’re here to help if you have any questions or need assistance.'
                icon='/icons/face.svg'
              />

              <HowItWorksCard
                title='4. Free Return Shipping.'
                content='When your rental period is over, simply place your items in the box they came in and attach the return shipping label. Drop off the box at your nearest FedEx location or schedule a pickup.'
                icon='/icons/ship.svg'
              />

            </div>
          </div>
        </section>

        <section>

          <div className="container">
            <GrayBarSection variant='100' className='py-20 px-8'>
              <div className="grid md:grid-cols-2 gap-4">

                {/* left side  */}
                <div>
                  <h2 className='text-4xl font-serif font-normal pt-8 mb-2'>Simple, local rentals.</h2>
                  <p className="tracking-wide leading-relaxed">Renting from DC Camera Rentals is a straightforward and hassle-free process designed to give you the ultimate convenience and flexibility. Whether you’re working on a professional project or embarking on a personal creative endeavor, we’re here to make the rental experience seamless.</p>
                  <ButtonLink href='/cameras' className='mt-8'>Browse Our Equipment</ButtonLink>
                </div>

                {/* right side  */}
                <div className='flex gap-4'>

                  {/* card 1 */}
                  <Link href="/cameras" className="bg-gray-200 rounded-2xl border-b-8 border-primary-500 shadow-lg p-8 flex flex-col group">
                    <NextImage
                      src="/icons/slr-top.svg"
                      className='w-12 h-auto pt-20 mb-4 group-hover:-translate-y-5 transition-transform ease-in-out'
                      alt="lenses"
                      width={48}
                      height={48}
                    />
                    <h3 className='mb-3 text-4xl group-hover:-translate-y-3 transition-transform ease-in-out'>Browse Cameras</h3>
                    <p className='opacity-50 group-hover:-translate-y-2 transition-transform ease-in-out'>From $65 / day</p>
                  </Link>
                  
                  {/* card 2 */}
                  <Link href="/lenses" className="bg-gray-200 rounded-2xl border-b-8 border-primary-500 shadow-lg p-8 flex flex-col group">
                    <NextImage
                      src="/icons/large-lens.svg"
                      className='w-8 h-auto pt-20 mb-4 group-hover:-translate-y-5 transition-transform ease-in-out'
                      alt="lenses"
                      width={32}
                      height={32}
                    />
                    <h3 className='mb-3 text-4xl group-hover:-translate-y-3 transition-transform ease-in-out'>Browse Lenses</h3>
                    <p className='opacity-50 group-hover:-translate-y-2 transition-transform ease-in-out'>From $28 / day</p>
                  </Link>

                </div>
              </div>
            </GrayBarSection>
          </div>
        </section>

    </Layout>
  );
}
