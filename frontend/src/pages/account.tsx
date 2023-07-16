import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import GrayBarSection from '@/components/layout/GrayBarSection'
import { useRouter } from 'next/router'
import { isLoggedIn } from '@/lib/auth'
import DashboardSidebar from '@/components/account/DashboardSidebar'
import PersonalInfoSection from '@/components/account/PersonalInfoSection'
import LogOutSection from '@/components/account/LogOutSection'
import FavoritesSection from '@/components/account/FavoritesSection'

export default function AccountPage() {

  const [section, setSection] = React.useState('personalInfo')

  let activeToken: string | null = ''

  // sample user for now
  const user = {
    id: 1,
    email: 'a@a.a',
    firstName: 'John',
    lastName: 'Apple'
  }

  const router = useRouter()

  // on component mount
  useEffect(() => {
    
    // if token or email is missing from local storage
    if (!isLoggedIn()) { 
      
      // redirect to login page
      router.push('/login')

    }

    // get variables from local storage 
    if (typeof window !== 'undefined') {
      activeToken = localStorage.getItem('token')
    }

  }, [])

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
              { section === 'personalInfo' ? <PersonalInfoSection user={user} /> : '' }
              { section === 'logout' ? <LogOutSection user={user} /> : '' }
              { section === 'favorites' ? <FavoritesSection /> : '' }
            </div>

          </div>
        </GrayBarSection>
    </Layout>
  )
}
