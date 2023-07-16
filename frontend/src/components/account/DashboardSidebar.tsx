import React from "react"
import DashboardSidebarItem from "./DashboardSidebarItem"

const DashboardSidebar = ({ activeSection, setSection }: { activeSection: string, setSection: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
      <>
        <div className="flex flex-col gap-2">
          <DashboardSidebarItem onClick={() => setSection('personalInfo')} name='Personal Information' active={activeSection === 'personalInfo'} />
          <DashboardSidebarItem onClick={() => setSection('favorites')} name='Favorites' active={activeSection === 'favorites'} />
          <DashboardSidebarItem onClick={() => setSection('logout')} name='Log Out' active={activeSection === 'logout'} />
        </div>
      </>
    )
  }

  export default DashboardSidebar
