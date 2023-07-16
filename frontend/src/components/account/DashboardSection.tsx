import React from 'react'
import GrayBarSection from '../layout/GrayBarSection'

const DashboardSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <GrayBarSection className='px-12 py-12' variant='200'>
      {children}
    </GrayBarSection>
  )
}

export default DashboardSection