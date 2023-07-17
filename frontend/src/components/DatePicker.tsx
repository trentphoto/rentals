import React, { useEffect, useState } from 'react'

export default function DatePicker({ date = new Date(), minDate = new Date(), handleChange }: { date?: Date | null, minDate?: Date | null, handleChange: (date: Date) => void }) {
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(date)
  const [error, setError] = useState<string | null>(null)

  // whenever date prop changes, update selectedDate
  useEffect(() => {
    setSelectedDate(date)
  }, [date])

  const handleDateChange = (date: Date) => {

    // clear error message
    setError(null)

    if (minDate && date >= minDate) {
      handleChange(date)
      setSelectedDate(date)
      return
    } else {
        // show error message
        setError(`Date must be after ${minDate?.toISOString().substr(0, 10)}`)
        setSelectedDate(null)
    }
  }

  return (
    <div className="flex flex-col items-start">
      <input
        className="border border-gray-300 rounded-md p-2 mt-5" // margin to offset error message wrap height, 20px
        type="date"
        value={date ? date.toISOString().substr(0, 10) : ''}
        onChange={e => handleDateChange(new Date(e.target.value))}
      />

      {/* error message wrap */}
      <div className="h-5 relative">
        {/* error message */}
        {
          error ? <p className="absolute text-primary-600 w-96 text-sm ml-2">{error}</p> : ''
        }

      </div>

    </div>
  )
}