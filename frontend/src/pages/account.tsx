import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import GrayBarSection from '@/components/layout/GrayBarSection'
import { useRouter } from 'next/router'
import { isLoggedIn } from '@/lib/auth'
import DashboardSidebar from '@/components/account/DashboardSidebar'
import PersonalInfoSection from '@/components/account/PersonalInfoSection'
import LogOutSection from '@/components/account/LogOutSection'
import FavoritesSection from '@/components/account/FavoritesSection'
import LoadingWrap from '@/components/layout/LoadingWrap'
import ReservationsSection from '@/components/account/ReservationsSection'

export default function AccountPage() {

  const base = process.env.NEXT_PUBLIC_API_URL

  const [section, setSection] = React.useState('personalInfo')
  const [user, setUser] = useState(null)
  const [reservations, setReservations] = useState([])

  let activeToken: string | null = ''

  const router = useRouter()

  const handleInvalidToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('email')
    router.push('/login')
  }

  const getUserFromBackend = () => {
    // define headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    
    // if token or email is missing from local storage
    if (!isLoggedIn()) { 
      // redirect to login page
      router.push('/login')
    }

    // get variables from local storage 
    if (typeof window !== 'undefined') {
      activeToken = localStorage.getItem('token')
    }

    // load load user from api
    fetch(`${base}/user/current`, {
      method: "GET",
      headers
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const returnedUser = data.result.message[0]
        
        setUser(returnedUser)
      }
    })
  }

  const loadReservations = () => {
    // define headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    
    // if token or email is missing from local storage
    if (!isLoggedIn()) { 
      // redirect to login page
      router.push('/login')
    }

    // get variables from local storage 
    if (typeof window !== 'undefined') {
      activeToken = localStorage.getItem('token')
    }

    // load load user from api
    fetch(`${base}/reservations`, {
      method: "GET",
      headers
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
      if (data.success) {
        setReservations(data.data.message)
      }
    })
  }

  // on component mount
  useEffect(() => {
      getUserFromBackend()
      loadReservations()
  }, [])

  // update user function
  const updateUserField = (field: string, newValue: string) => {
    // define headers
    // can't do this in root component, since localStorage is null until page load
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    // PUT request to /users/update
    fetch(`${base}/users/update`, {
      method: "PUT",
      headers, 
      body: JSON.stringify({
          [field]: newValue
      })
    })
    .then(res => res.json())
    .then(data => {
      // if token is invalid, log user out
      if (data.message === "Invalid token.") {
        handleInvalidToken()
      } else if (data.success) {
        // handle success
        alert(`Your ${field} has been updated successfully.`);
        getUserFromBackend()
      } else {
        // handle error
        alert(`An error occurred while updating your ${field}.`);
      }
    })
    .catch(err => {
      console.error(err);
      alert('An error occurred. Please try again.');
    })

  }

  if (!user) return <LoadingWrap>Loading...</LoadingWrap>

  return (
    <Layout>
        <GrayBarSection variant='100' className='py-12 px-16 min-h-screen'>
          
          {/* title  */}
          <h1 className="text-3xl mb-12 text-gray-700">Dashboard</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* sidebar */}
            <div className="col-span-1">
              <DashboardSidebar activeSection={section} setSection={setSection} />
            </div>

            {/* main content */}
            <div className="md:col-span-3">
              { section === 'personalInfo' ? <PersonalInfoSection user={user} updateUser={updateUserField} /> : '' }
              { section === 'reservations' ? <ReservationsSection data={reservations} /> : '' }
              { section === 'favorites' ? <FavoritesSection /> : '' }
              { section === 'logout' ? <LogOutSection user={user} /> : '' }
            </div>

          </div>
        </GrayBarSection>
    </Layout>
  )
}
