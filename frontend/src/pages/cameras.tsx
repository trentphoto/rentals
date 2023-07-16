import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import Seo from '../components/Seo'
import CameraCard from '../components/CameraCard'
import NextImage from '../components/NextImage'
import DatePickerBar from '../components/layout/DatePickerBar'
import { Product } from '@/types/products'
import { FAQ, HowItWorks } from '@/components/SidebarCards'

export default function CamerasPage() {

  const [productData, setProductData] = React.useState<Product[]>([]);
  
  // get all cameras from the database by category
  useEffect(() => {
    // Fetch product from api by slug
    const base = process.env.NEXT_PUBLIC_API_URL
    
    fetch(`${base}/products/category/cameras`)
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
                src="/images/nikon.webp"
                alt="placeholder"
                className="flex items-center absolute inset-0 w-full h-full" 
                width={1200}
                height={800}
              />

              {/* overlay */}
              <div className="absolute inset-0 w-full h-full bg-black opacity-50" />
              
              {/* content */}
              <div className='text-white z-20 w-full'>
                <h1 className="text-4xl font-serif font-normal mb-2">Our Camera Selection</h1>
                <p className="text-stone-300">Only the finest photography and video cameras.</p>
              </div>

            </div>
          </div>
        </section>
        
        <section>
          <div className="container">

            <div className="grid lg:grid-cols-5 gap-12">

              {/* main content */}
              <div className="lg:col-span-3">

                <h2 className='mb-4'>Currently Available Cameras</h2>
                <p className='mb-12 text-sm text-gray-600'>Choose from our selection of the finest photography and video cameras.</p>

                {
                  productData.map((product) => (
                    <CameraCard
                      key={product.id}
                      variant='dark'
                      size='full'
                      imageUrl={product.image_url}
                      title={product.name}
                      subtitle={product.description}
                      href={`/products/${product.slug}`}
                    />
                  ))
                }

                {/* 
                <CameraCard
                  variant='dark' 
                  size='full'
                  imageUrl='/images/cameras/r5.webp'
                  title='Canon EOS R5'
                  subtitle='State of the Art Photo + Cinema Camera.'
                  href='/cameras/r5'
                />

                <CameraCard
                  variant='dark' 
                  size='full'
                  imageUrl='/images/cameras/r8.webp'
                  title='Canon EOS R8'
                  subtitle='Full Frame Mirrorless Camera'
                  href='/cameras/r8'
                />

                <CameraCard
                  variant='dark' 
                  size='full'
                  imageUrl='/images/cameras/5d4.webp'
                  title='Canon EOS 5D Mark IV'
                  subtitle='A staple in the industry.'
                  href='/cameras/5d4'
                /> */}

                {/* <CameraCard
                  variant='dark' 
                  size='full'
                  imageUrl='/images/cameras/5d3.webp'
                  title='Canon EOS 5D Mark III'
                  subtitle='Still a great choice for photo and video.'
                  href='/cameras/5d3'
                /> 
                */}

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
