import React from 'react'
import GrayBarSection from '../../components/layout/GrayBarSection'
import Layout from '../../components/layout/Layout'
import Seo from '../../components/Seo'
import UnderlineLink from '../../components/links/UnderlineLink'
import NextImage from '../../components/NextImage'
import { classesForCustomButtons } from '../../components/links/ButtonLink'
import { useRouter } from 'next/router'
import DatePicker from '../../components/DatePicker'
import { Product } from '@/types/products'
import Skeleton from '@/components/Skeleton'
import { DatePickerContext } from '@/lib/DatePickerContext'
import { DatePickerContextType } from '@/types/datepicker';
import FavoriteHeart from '@/components/FavoriteHeart'
import clsxm from '@/lib/clsxm'
import LoadingWrap from '@/components/layout/LoadingWrap'

export default function SinglePage() {

    const base = process.env.NEXT_PUBLIC_API_URL

    // get slug from router
    const slug = useRouter().asPath.split('/')[2]

    // headers
    let headers: any = {}
    if (typeof window !== 'undefined') {
        headers = {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('token')}`
       }
    }

    const { selectedDates, updateSelectedDates } = React.useContext<DatePickerContextType>(DatePickerContext)
    const [favorite, setFavorite] = React.useState(false)
    const [productData, setProductData] = React.useState<Product | null>(null)
    const [addedToCart, setAddedToCart] = React.useState(false)

    // handle add to cart button click
    const handleAddToCart = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // if dates are not selected, return
        if (!selectedDates.from || !selectedDates.to) return

        // if product data is null, return
        if (!productData) return

        // make api call to add to cart
        fetch(`${base}/cart`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                product_id: productData.id,
                start_date: selectedDates.from,
                end_date: selectedDates.to
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setAddedToCart(true)
            }
        })
        .catch(error => {
            // Handle errors here
            console.error('Catch Error:', error);
        });
    }

    // handle favorite button click
    const handleFavoriteClick = () => {

        // toggle favorite state then make async call to api
        setFavorite((newFavorite) => {

            // api call
            // if favorite is true, add to favorites
            if (!newFavorite && productData) {
                // add to favorites
                fetch(`${base}/favorites/add/${productData.id}`, {
                    method: 'POST',
                    headers
                })
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                })
                .catch(error => {
                    // Handle errors here
                    console.error('Error:', error);
                });
            }
            // if favorite is false, remove from favorites
            else if (newFavorite && productData) {
                // remove from favorites
                fetch(`${base}/favorites/remove/${productData.id}`, {
                    method: 'DELETE',
                    headers
                })
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                })
                .catch(error => {
                    // Handle errors here
                    console.error('Error:', error);
                });
            }

            return !newFavorite
        })
    }
    
    React.useEffect(() => {

        // Fetch product from api by slug
        const base = process.env.NEXT_PUBLIC_API_URL
        
        fetch(`${base}/products/${slug}`)
            .then(res => res.json())
            .then(data => {

                setProductData(data[0]) // set product data to first item in array

                // fetch favorites from api
                // GET request
                const reqUrl = `${base}/favorites/${data[0].id}`
                fetch(reqUrl, {
                    method: 'GET',
                    headers
                })
                .then(response => response.json())
                .then(favData => {
                    if (favData.success) {
                        // If the item is already in the user's favorites, set favorite to true
                        setFavorite(true);
                    } else {
                        // If the item is not in the user's favorites, set favorite to false
                        setFavorite(false);
                    }
                })
                .catch(error => {
                    // Handle errors here
                    console.error('Error:', error);
                });

                // 

            }) 
            .catch(err => console.error(err))

    }, []);

    // if camera data is null, return loading
    if (!productData) return (
        <LoadingWrap>
            <p className="text-3xl font-bold">Loading...</p>
        </LoadingWrap>
    )

    // otherwise, return the page
    return (
        <>
            <Layout>
                <Seo />

                <GrayBarSection>
                    {/* back button  */}
                    {
                        // back to either cameras, lenses, or more
                        productData.category === 'cameras' ? (
                            <UnderlineLink href='/cameras' className=''>&larr; Back to Cameras</UnderlineLink>
                        ) : productData.category === 'lenses' ? (
                            <UnderlineLink href='/lenses' className=''>&larr; Back to Lenses</UnderlineLink>
                        ) : (
                            <UnderlineLink href='/more' className=''>&larr; Back to Equipment List</UnderlineLink>
                        )
                    }
                </GrayBarSection>

                <section className='bg-white py-20'>
                    <div className="container">
                        <div className="grid md:grid-cols-2 gap-20">

                            {/* left column - image */}
                            <div className="flex justify-center items-center max-w-lg">
                                {
                                    productData ? (
                                        <NextImage
                                            src={productData.image_url}
                                            alt="placeholder"
                                            className="overflow-hidden p-8 border border-gray-400"
                                            width={1200}
                                            height={800}
                                        />
                                    ) : <Skeleton className='w-full h-24' />
                                }
                                
                            </div>

                            {/* right column - content */}
                            <div className="flex flex-col justify-center items-start">
                            
                            {/* name and favorite button */}
                            <div className="w-full flex items-start justify-between gap-4">
                                <h1 className="text-4xl font-serif font-normal mb-2">{productData.name}</h1>
                                <FavoriteHeart active={favorite} toggleActive={handleFavoriteClick} />
                            </div>

                            <p className="text-stone-700 mb-12 max-w-sm">{productData.description}</p>
                            <p className="text-stone-800 mb-12"><span className='text-3xl font-bold'>${productData.price_per_day}</span><span className='text-stone-500'> / Day</span></p>
                            <p className="mb-4 font-bold text-xl">
                                Rental Dates:
                            </p>
                            {/* date picker bar */}
                            <div className="py-4 px-8 bg-gray-100 rounded-2xl flex items-center gap-4 mb-4">
                                <DatePicker date={selectedDates.from} handleChange={(date: Date) => updateSelectedDates(date, selectedDates.to)} />
                                <span>to</span>
                                <DatePicker date={selectedDates.to} handleChange={(date: Date) => updateSelectedDates(selectedDates.from, date)} />

                            </div>

                            <div className="flex items-center gap-8 mb-8">
                                {
                                    selectedDates.from && selectedDates.to ? (
                                        <>
                                            <p className="text-xl">
                                                <span className="font-bold">Rental Days:</span> {
                                                    Math.ceil((selectedDates.to.getTime() - selectedDates.from.getTime()) / (1000 * 3600 * 24))
                                                }
                                            </p>
                                            <p className="text-xl">
                                                <span className="font-bold">Total cost:</span> ${
                                                    Math.ceil((selectedDates.to.getTime() - selectedDates.from.getTime()) / (1000 * 3600 * 24)) * productData.price_per_day
                                                }
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-xl">
                                            Select dates above to view pricing.
                                        </p>
                                    )
                                }
                            </div>

                            {/* add to cart button */}
                            <form onSubmit={handleAddToCart}>
                                <button type="submit" className={clsxm(
                                    classesForCustomButtons,
                                    ' flex items-center gap-3',
                                    addedToCart ? 'bg-green-600' : ''
                                    )} disabled={addedToCart}>
                                    {
                                        addedToCart ? (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill='white' width="24" height="24" viewBox="0 -960 960 960"><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/></svg>
                                                <span>Added to cart</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill='white' width="24" height="24" viewBox="0 -960 960 960"><path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"/></svg>
                                                <span>Add to cart</span>
                                            </>
                                        )
                                    }
                                </button>
                            </form>

                            </div>

                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        {/* 4 easy steps to rentals - graphic */}
                        <div className="flex flex-col justify-center items-center mb-20">
                            <h2 className="text-4xl font-serif font-normal mb-2">4 Easy Steps to Renting</h2>
                            <p className="text-stone-300 mb-12">Renting is easy with our 4 step process.</p>
                            <div className="grid grid-cols-2">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center rounded-full bg-stone-300 w-20 h-20 mb-4">
                                        <p className="text-white text-2xl font-bold">1</p>
                                    </div>
                                    <p className="text-center">Choose your rental dates.</p>
                                </div>
                                    
                                        
                            </div>
                        </div>
                    </div>
                </section>

                <GrayBarSection className='p-20'>
                    <p className='text-3xl mb-8'>Every rental includes:</p>
                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white rounded-2xl p-12 flex flex-col items-center text-center gap-4">
                            <NextImage
                                src="https://res.cloudinary.com/dakfmjumy/image/upload/v1689265901/dccamerarental/battery_zdnu8f.webp"
                                alt="battery"
                                className="mb-auto"
                                width={120}
                                height={120}
                            />
                            <h3>2 Extra Batteries</h3>
                            <div className="text-sm text-gray-600">
                                Don't worry about running out of power.
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-12 flex flex-col items-center text-center gap-4">
                            <NextImage
                                src="https://res.cloudinary.com/dakfmjumy/image/upload/v1689265901/dccamerarental/bag_g9jktp.webp"
                                alt="battery"
                                className="mb-auto"
                                width={180}
                                height={180}
                            />
                            <h3>Carrying Case</h3>
                            <div className="text-sm text-gray-600">
                                Keep your camera safe and secure.
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-12 flex flex-col items-center text-center gap-4">
                            <NextImage
                                src="https://res.cloudinary.com/dakfmjumy/image/upload/v1689265902/dccamerarental/card_cnlwpk.webp"
                                alt="battery"
                                className="mb-auto"
                                width={80}
                                height={80}
                            />
                            <h3>256GB SD Card</h3>
                            <div className="text-sm text-gray-600">
                                Plenty of storage for your photos and videos.
                            </div>
                        </div>

                    </div>
                    
                </GrayBarSection>

                
            </Layout>
        </>
    )
}
