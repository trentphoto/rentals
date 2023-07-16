import React from 'react'
import Layout from '../components/layout/Layout'
import Seo from '../components/Seo'
import CameraCard from '../components/CameraCard'
import { Product } from '@/types/products';
import DatePickerBar from '@/components/layout/DatePickerBar';
import NextImage from '@/components/NextImage';
import { HowItWorks, FAQ } from '@/components/SidebarCards';

export default function LensesPage() {
  const [productData, setProductData] = React.useState<Product[]>([]);
  
  // get all cameras from the database by category
  React.useEffect(() => {
    // Fetch product from api by slug
    const base = process.env.NEXT_PUBLIC_API_URL
    
    fetch(`${base}/products/category/lenses`)
        .then(res => res.json())
        .then(data => setProductData(data))
        .catch(err => console.error(err))
  }, []);

  return (
    <Layout>
        <Seo />

        <DatePickerBar />

        {/* hero section with background image and title and subtitle */}
        <section className='text-center mb-20'>
          <div className="container">
            <div className="flex flex-col justify-center items-center p-20 shadow-xl relative rounded-xl overflow-hidden">

              {/* background image */}
              <NextImage
                src="/images/collection.webp"
                alt="placeholder"
                className="flex items-center absolute inset-0 w-full h-full" 
                width={1300}
                height={800}
              />

              {/* overlay */}
              <div className="absolute inset-0 w-full h-full bg-black opacity-50" />
              
              {/* content */}
              <div className='text-white z-20 w-full'>
                <h1 className="text-4xl font-serif font-normal mb-2">Our Lens Collection</h1>
                <p className="text-stone-300">High-end photographic lenses for your photography and video needs.</p>
              </div>

            </div>
          </div>
        </section>
        
        <section>
          <div className="container">

          <div className="grid lg:grid-cols-5 gap-12">

            {/* main content */}
            <div className="lg:col-span-3">

              <h2 className='mb-4'>Currently Available Lenses</h2>
              <p className='mb-12 text-sm text-gray-600'>Choose from our selection of the finest photography and video cameras.</p>

              {
                productData.map(product => (
                  <CameraCard
                    key={product.id}
                    variant='light' 
                    size='full'
                    imageUrl={product.image_url}
                    title={product.name}
                    subtitle={product.description}
                    href={`/products/${product.slug}`}
                  />
                ))
              }


              {/* <CameraCard
                variant='light' 
                size='full'
                imageUrl='/images/lenses/ef-16-35-f4.webp'
                title='Canon EF 16-35mm f/4L IS USM'
                subtitle='Ultra Wide Zoom Lens'
                href='/'
              />

              <CameraCard
                variant='light' 
                size='full'
                imageUrl='/images/lenses/ef-24-70-f28-ii.webp'
                title='Canon EF 24-70mm f/2.8L II USM'
                subtitle='Standard Zoom Lens'
                href='/'
              />

              <CameraCard
                variant='light' 
                size='full'
                imageUrl='/images/lenses/ef-70-200-f4.webp'
                title='Canon EF 70-200mm f/4L USM'
                subtitle='Telephoto Zoom Lens'
                href='/'
              />

              <CameraCard
                variant='light' 
                size='full'
                imageUrl='/images/lenses/rf-15-35-f28.webp'
                title='Canon RF 15-35mm f/2.8L IS USM'
                subtitle='Ultra Wide Zoom Lens'
                href='/'
              />

              <CameraCard
                variant='light' 
                size='full'
                imageUrl='/images/lenses/rf-24-f18.webp'
                title='Canon RF 24mm f/1.8 IS STM'
                subtitle='Small and Lightweight Wide Prime'
                href='/'
              />

              <CameraCard
                variant='light' 
                size='full'
                imageUrl='/images/lenses/rf-50-f12.webp'
                title='Canon RF 50mm f/1.2L USM'
                subtitle='One of the best 50mm lenses ever made.'
                href='/'
              />

              <CameraCard
                variant='light' 
                size='full'
                imageUrl='/images/lenses/rf-70-200-f28.webp'
                title='Canon RF 70-200mm f/2.8L IS USM'
                subtitle='Telephoto Zoom Lens'
                href='/'
              /> */}

            </div>


            {/* sidebar */}
            <div className="lg:col-span-2">

            <HowItWorks />

            <FAQ />

            </div>



            </div>

          </div>

        </section>
    </Layout>
  )
}
