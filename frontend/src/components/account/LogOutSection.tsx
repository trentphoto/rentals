import DashboardSection from "./DashboardSection"
import { User } from "@/types/user"
import { classesForCustomButtons } from "../links/ButtonLink"
import { useRouter } from "next/router"

const LogOutSection = ({ user }: { user: User }) => {

  const router = useRouter()

    // logout form submit handler
    const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
  
      try {
        // remote item from localstorage, redirect to login page
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        router.push('/login')
        
      } catch (error) {
        console.log(error)
      }
    }
  
    return (
    <DashboardSection>
      <div className="font-bold mb-4">
        Log Out
      </div>
  
      <div className="text-sm text-gray-400 mb-8">
        You are currently logged in as <span className="font-bold text-gray-600">{user.email}</span>.
      </div>
  
      {/* logout form */}
      <form onSubmit={handleLogout}>
        <button type="submit" className={classesForCustomButtons}>
          Log Out
        </button>
      </form>
    </DashboardSection>
  )}

  export default LogOutSection
  