import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import GrayBarSection from '@/components/layout/GrayBarSection';
import { Product } from '@/types/products';
import { classesForCustomButtons } from '@/components/links/ButtonLink';
import Link from 'next/link';
import NextImage from '@/components/NextImage';
import { DatePickerContextType } from '@/types/datepicker';
import { DatePickerContext } from '@/lib/DatePickerContext';

const CartListItem = ({ item, onDelete, ...props }: { item: Product, onDelete: (id: number) => void }) => {

  const { name, image_url, slug, price_per_day, start_date, end_date } = item

  // format start and end dates from 2023-07-11T00:00:00.000Z to 07/11
  const formattedStartDate = start_date!.split('T')[0].split('-').slice(1).join('/')
  const formattedEndDate = end_date!.split('T')[0].split('-').slice(1).join('/')
  const daysCount = Math.floor((new Date(end_date!).getTime() - new Date(start_date!).getTime()) / (1000 * 3600 * 24))

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onDelete(item.id)
  }

  return (
    <div className="flex items-center justify-between gap-6 w-full pb-8 mb-8 border-b border-b-gray-300">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden w-20 h-20 p-2">
          <NextImage
            src={image_url}
            alt={item.name}
            width={60}
            height={40}
            className='rounded-lg'
            />
        </div>
        <div>
          <Link href={`/products/${slug}`} className="text-lg font-bold hover:underline">{name}</Link>
          <p className="text-gray-500 text-xs"><span className='font-bold'>Quantity:</span> 1</p>
          <p className="text-gray-500 text-xs"><span className='font-bold'>Dates:</span> From {formattedStartDate} to {formattedEndDate}, {daysCount} {daysCount === 1 ? 'day' : 'days'}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-gray-500">Total: ${price_per_day * daysCount}</p>
      </div>

      <form onSubmit={handleDelete}>
        <button type='submit' className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-800 text-sm font-bold cursor-pointer bg-gray-200 hover:bg-gray-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960">
            <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
          </svg>
          <span>Delete</span>
        </button>
      </form>

    </div>
  )
}

export default function CartPage() {
  const base = process.env.NEXT_PUBLIC_API_URL

  const { selectedDates, updateSelectedDates } = React.useContext<DatePickerContextType>(DatePickerContext)

  // load cart items from /api/cart
  const [cartItems, setCartItems] = React.useState([])

  React.useEffect(() => {

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }

      fetch(`${base}/cart`, {
        method: 'GET',
        headers
      })
      .then(res => res.json())
      .then(data => {
        setCartItems(data.data.message)
      })
      .catch(err => console.error(err))

  }, [])

  // handle delete item from cart
  const handleDeleteItem = (id: number) => {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    fetch(`${base}/cart/${id}`, {
      method: 'DELETE',
      headers
    })
    .then(res => res.json())
    .then(data => {
      // new get request to /api/cart
      fetch(`${base}/cart`, {
        method: 'GET',
        headers
      })
      .then(res => res.json())
      .then(getData => {
        setCartItems(getData.data.message)
      })
    })
    .catch(err => console.error(err))
  }

  // handle checkout
  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const body = JSON.stringify({
      total_price: cartItems.reduce((acc: number, item: Product) => acc + item.price_per_day * Math.floor((new Date(item.end_date!).getTime() - new Date(item.start_date!).getTime()) / (1000 * 3600 * 24)), 0),
      start_date: selectedDates.from,
      end_date: selectedDates.to,
    })

    fetch(`${base}/checkout`, {
      method: 'POST',
      headers,
      body
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Checkout successful. Please check your email.')
        setCartItems([])
      } else {
        alert('Checkout failed')
      }
    })
    .catch(err => console.error(err))
  }

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <section>
        <div className="container">
          <GrayBarSection className='p-8 md:p-20 text-center' variant='100'>
            <h1>Rental Cart</h1>
          </GrayBarSection>
        </div>
      </section>

      <section>
        <div className="container">
          <GrayBarSection className='py-16 px-12' variant='100'>

            <div className="grid md:grid-cols-4 gap-12">

              {/* cart items column */}
              <div className="flex flex-col items-start md:col-span-3 w-full max-w-3xl">
                {
                  cartItems.length > 0 ? (
                    <div className="flex flex-col items-start justify-center">
                      <h2 className='text-bold mb-8 border-b-2 border-b-gray-300 w-full pb-4'>Cart: {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</h2>
                      {cartItems.map((item: Product, index) => (
                        <CartListItem key={index} item={item} onDelete={() => handleDeleteItem(item.id)} />
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <p>Your cart is empty.</p>
                    </div>
                  )
                }
              </div>

              {/* cart summary sidebar */}
              {
                cartItems.length > 0 ? (
                  <div className="flex flex-col items-start gap-4">
                    <div>
                      <p className="text-xl mb-4">
                          <span className="font-bold">Subtotal:</span> ${
                          cartItems.reduce((acc: number, item: Product) => acc + item.price_per_day * Math.floor((new Date(item.end_date!).getTime() - new Date(item.start_date!).getTime()) / (1000 * 3600 * 24)), 0)
                          }
                      </p>
                      {
                        selectedDates.from && selectedDates.to ? (
                          <>
                            <hr className='mb-4' />
                            <p className='text-xl mb-4'><span className="font-bold">From:</span> {selectedDates.from!.toLocaleDateString()}</p>
                            <br />
                            <p className='text-xl mb-4'><span className="font-bold">To:</span> {selectedDates.to!.toLocaleDateString()}</p>
                            <div className="mb-8" />
                          </>
                        ) : ''
                      }

                      

                      <form onSubmit={handleCheckout}>
                          <button type="submit" className={classesForCustomButtons + " w-full"}>
                              Checkout
                          </button>
                      </form>
                    </div>
                  </div>
                ) : ''
              }

            </div>


          </GrayBarSection>
        </div>
      </section>

    </Layout>
  );
}
