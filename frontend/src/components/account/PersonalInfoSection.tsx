import { User } from "@/types/user";
import DashboardSection from "./DashboardSection";

const PersonalInfoSection = ({ user }: { user: User }) => (
    <DashboardSection>
      <div className="font-bold mb-8">
        Personal Information
      </div>
  
      <div className="grid grid-cols-2 gap-8">
        
        {/* edit button  */}
  
        {/* first name  */}
        <div className="flex flex-col items-start">
          <div className="text-sm text-gray-400">
            First Name
          </div>
          <div className="text-lg font-bold">
            { user.firstName }
          </div>
        </div>
  
        {/* last name  */}
        <div className="flex flex-col items-start">
          <div className="text-sm text-gray-400">
            Last Name
          </div>
          <div className="text-lg font-bold">
            { user.lastName }
          </div>
        </div>
  
        {/* primary email  */}
        <div className="flex flex-col items-start">
          <div className="text-sm text-gray-400">
            Primary Email
          </div>
          <div className="text-lg font-bold">
            {user.email}
          </div>
        </div>
  
        {/* primary phone  */}
        <div className="flex flex-col items-start">
          <div className="text-sm text-gray-400">
            Primary Phone
          </div>
          <div className="text-lg font-bold">
            {user.phone}
          </div>
        </div>
      </div>
    </DashboardSection>
  )

  export default PersonalInfoSection