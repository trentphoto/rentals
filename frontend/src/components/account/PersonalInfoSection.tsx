import { User } from "@/types/user";
import DashboardSection from "./DashboardSection";
import { useState } from "react";
import { useRouter } from "next/router";
import { classesForCustomButtons } from "../links/ButtonLink";

function UserField({ label, value, handleSave, editable = false }: { label: string, value: string | null | undefined, handleSave?: (newValue: string) => void, editable?: boolean }) {

  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value || '')

  const editButtonClassNames = 'py-2 px-5 rounded-xl bg-gray-100 shadow-sm cursor-pointer active:bg-transparent'

  const fieldName = label.toLowerCase().replace(' ', '_')
  
  const handleClick = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSaveClick = () => {
    if (handleSave){
      handleSave(inputValue)
    }
    setIsEditing(false)
    setInputValue('')
  }

  const handleExitClick = () => {
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col items-start">
      <div className="text-sm text-gray-400 mb-2">{label}</div>
      <div className="text-lg font-bold">
        {isEditing ? (
          <>
            <div className="flex items-center gap-2">
              <input 
                type="text"
                name={fieldName}
                id={fieldName}
                value={inputValue} 
                onChange={handleInputChange} 
              />
              {/* save icon */}
              <button className={editButtonClassNames} onClick={handleSaveClick}>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/></svg>
              </button>
              {/* exit icon */}
              <button className={editButtonClassNames} onClick={handleExitClick}>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
              </button>
            </div>
          </>
        ) : (
          <>
            {value ? (
              <>
                <div className="flex justify-between items-center gap-4 w-full rounded-xl pl-4 pr-2 py-2 transition-colors hover:bg-gray-300 group">
                  <p className="">{value}</p>
                  
                  {/* edit icon  */}
                  {
                    editable ? (
                      <svg onClick={handleClick} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 w-9 h-9 rounded-xl bg-gray-100 shadow-sm cursor-pointer active:bg-transparent" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M120-12v-720h465l-60 60H180v600h600v-348l60-60v468H120Zm360-360Zm182-352 43 42-285 284v86h85l286-286 42 42-303 304H360v-170l302-302Zm171 168L662-724l142-142 168 170-139 140Z"/>
                      </svg>
                    ) : ''
                  }

                </div>
              </>
            ) : (
              <>
                <div className="flex gap-2 items-center py-2 px-5 rounded-xl bg-gray-100 shadow-sm cursor-pointer active:bg-transparent">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M450-280h60v-170h170v-60H510v-170h-60v170H280v60h170v170ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z"/>
                  </svg>
                  <button onClick={handleClick}>Add</button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}


const PersonalInfoSection = ({ user, updateUser }: { user: User, updateUser: (field: string, newValue: string) => void }) => {

  const saveFirstName = (newFirstName: string) => {
    updateUser('first_name', newFirstName)
  };
  const saveLastName = (newLastName: string) => {
    updateUser('last_name', newLastName)
  };
  const savePhone = (newPhone: string) => {
    updateUser('phone', newPhone)
  };

  return (
    <DashboardSection>
      <div className="font-bold mb-8">
        Personal Information
      </div>
  
      <div className="grid grid-cols-2 gap-8">
        
        {/* first name  */}
        <UserField label='First Name' value={user.first_name} editable handleSave={saveFirstName} />
  
        {/* last name  */}
        <UserField label='Last Name' value={user.last_name} editable handleSave={saveLastName} />
  
        {/* primary email  */}
        <UserField label='Email' value={user.email} />
  
        {/* phone  */}
        <UserField label='Phone Number' value={user.phone} editable handleSave={savePhone} />

      </div>
    </DashboardSection>
  )}

  export default PersonalInfoSection