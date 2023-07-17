import React from 'react'
import Layout from '../components/layout/Layout'
import Seo from '../components/Seo'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function LoginPage() {

  const base = process.env.NEXT_PUBLIC_API_URL

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loginError, setLoginError] = React.useState('')
  
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch(`${base}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      
      const data = await res.json()
  
      if (data.success) {
        // store token in local storage
        localStorage.setItem('token', data.token)

        // store email in local storage
        localStorage.setItem('email', email)

        // store user id in local storage
        localStorage.setItem('user_id', data.user_id)

        // redirect to home page
        router.push('/')
      } else {
        setLoginError(data.message)
        // console.log(data);
        
      }
    } catch (error: any) {
        console.log('b');
        setLoginError(error.message)
    }

  }

  return (
    <Layout>
        <Seo />

        <section className="">
          <div className="container bg-gray-100 py-20 px-6 rounded-2xl">
            <div className="flex flex-col items-center justify-center mx-auto">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-normal leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="login" method='POST' onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required autoComplete="on" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required autoComplete="on" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " />
                                    </div>
                                    <div className="ml-3 text-sm">
                                      <label htmlFor="remember" className="text-gray-500">Remember me</label>
                                    </div>
                                </div>
                                <Link href="/forgot" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>

                            {/* login error */}
                            {loginError ? (
                              
                              <span
                                className="inline-flex gap-2 items-center justify-center rounded-full bg-red-100 px-3 py-2 text-red-700"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="-ms-1 me-1.5 h-4 w-4"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                  />
                                </svg>

                                <p className="whitespace-nowrap text-sm">{loginError}</p>
                              </span>

                            ) : ''}
                            
                            {/* link to registter */}
                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline">Register</Link>
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
