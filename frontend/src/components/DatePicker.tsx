import React from 'react'

export default function DatePicker({ date = new Date(), handleChange }: { date?: Date | null, handleChange: (date: Date) => void }) {

  const handleDateChange = (date: Date) => {
    handleChange(date)
  }

  return (
    <div className="flex items-center">
      <input
        className="border border-gray-300 rounded-md p-2"
        type="date"
        value={date ? date.toISOString().substr(0, 10) : ''}
        onChange={e => handleDateChange(new Date(e.target.value))}
      />
    </div>
  )
}