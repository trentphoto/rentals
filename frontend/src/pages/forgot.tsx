import React from 'react'
import Layout from '../components/layout/Layout'
import Seo from '../components/Seo'
import Link from 'next/link'

export default function LoginPage() {

  const base = process.env.NEXT_PUBLIC_API_URL

  const [email, setEmail] = React.useState('')
  
  return (
    <Layout>
        <Seo />

        <section className="">
          <div className="container bg-gray-100 py-20 px-6 rounded-2xl">
            <div className="flex flex-col items-center justify-center mx-auto">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-normal leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Reset Password
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="/forgot" method='POST'>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required autoComplete="on" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Request Password Reset</button>
                            <p className="text-sm font-light text-gray-500">
                                Remembered password? <Link href="/register" className="font-medium text-primary-600 hover:underline">Sign In</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

          </div>
        </section>


    </Layout>
  )
}
