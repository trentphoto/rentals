import Link from "next/link";
import { useRouter } from "next/router";
import clsxm from "../lib/clsxm";
import Logo from "~/images/logo.svg"
import NextImage from "./NextImage";
import { isLoggedIn } from "@/lib/auth";
import { useEffect, useState } from "react";

function TopRightButton ({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="py-3 px-4 flex items-center gap-2 bg-gray-100 rounded-lg transition-colors hover:bg-gray-200">
      {children}
    </Link>
  )
}

const LoginButton = () => (
  <TopRightButton href="/login">
    {/* login icon */}
    <NextImage
      src="/icons/lock.svg"
      width={24}
      height={24}
      alt="Sign in"
      className="text-gray-500"
    />
    <span>Sign In</span>
  </TopRightButton>
)

const UserProfileButton = () => (
  <TopRightButton href="/account">
    {/* user icon */}
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 -960 960 960"><path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z"/></svg>

    {/* menu icon */}
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"
    >
      {/* dots */}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </TopRightButton>
)

function CartButton ({count = 0}: { count?: number }) {
  return (
  <Link href="/cart" className="py-3 px-4 flex items-center gap-2 bg-gray-100 rounded-lg transition-colors hover:bg-gray-200">
    {/* cart icon */}
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 -960 960 960"><path d="M286.788-81Q257-81 236-102.212q-21-21.213-21-51Q215-183 236.212-204q21.213-21 51-21Q317-225 338-203.788q21 21.213 21 51Q359-123 337.788-102q-21.213 21-51 21Zm400 0Q657-81 636-102.212q-21-21.213-21-51Q615-183 636.212-204q21.213-21 51-21Q717-225 738-203.788q21 21.213 21 51Q759-123 737.788-102q-21.213 21-51 21ZM235-741l110 228h288l125-228H235Zm-30-60h589.074q22.964 0 34.945 21Q841-759 829-738L694-495q-11 19-28.559 30.5Q647.881-453 627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z"/></svg>
    {/* cart items count */}
    <span className="text-sm text-gray-500">{count}</span>
  </Link>
)}

function CustomNavLink({ href, children, isActive = false }: { href: string, children: React.ReactNode, isActive?: boolean }) {
  const { pathname } = useRouter()
  return (
    <Link
      className={clsxm(
        "text-gray-600 rounded-2xl bg-transparent transition duration-75 hover:bg-gray-100 px-5 py-3",
        pathname == href ? "bg-gray-100 font-semibold text-primary-600" : ""
      )}
      href={href}
    >
      {children}
    </Link>
  )
}

export default function Nav() {

  const base = process.env.NEXT_PUBLIC_API_URL

  // track login status
  const [loginStatus, setLoginStatus] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  // check login status on mount
  useEffect(() => {

    setLoginStatus(isLoggedIn())

    // get length of cart items from api
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
      if (data.success) {
        setCartCount(data.data.message.length)
      }
    })
    .catch(err => console.log(err))

  }, [])

  return (
    <>
      <div className="w-full">
        {/* full width red bar */}
        <div className="w-full h-3 bg-primary-500 block"></div>

        <div className="container px-8 flex items-center justify-between">

          <div className="flex items-center gap-1">
            
            {/* logo */}
            <Link href="/" className="py-6 mr-8">
              <Logo className="w-20 h-20" />
            </Link>
            
            {/* nav links */}
            <CustomNavLink href="/cameras">Cameras</CustomNavLink>
            <CustomNavLink href="/lenses">Lenses</CustomNavLink>
            <CustomNavLink href="/more">More</CustomNavLink>

          </div>

          {/* top right buttons */}

          <div className="flex gap-1">
          
            { loginStatus ? <UserProfileButton /> : <LoginButton /> }
            
            <CartButton count={cartCount} />
          
          </div>

        </div>
      </div>
    </>
  )
}
