import React from 'react'
import GrayBarSection from './GrayBarSection'
import DatePicker from '../DatePicker'
import { DatePickerContext } from '@/lib/DatePickerContext'
import { DatePickerContextType } from '@/types/datepicker';

export default function DatePickerBar() {
    const { selectedDates, updateSelectedDates } = React.useContext<DatePickerContextType>(DatePickerContext)

    return (
        <>
            <GrayBarSection>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <label className="mr-4">From:</label>
                            <DatePicker minDate={new Date()} date={selectedDates.from} handleChange={(date: Date) => updateSelectedDates(date, selectedDates.to)} />
                        </div>
                        <div className="flex items-center">
                            <label className="mx-4">To:</label>
                            <DatePicker minDate={selectedDates.from} date={selectedDates.to} handleChange={(date: Date) => updateSelectedDates(selectedDates.from, date)} />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2">Sort by:</label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option value="price">Price</option>
                            <option value="date">Date</option>
                        </select>
                    </div>
                </div>
            </GrayBarSection>
        </>
    )
}
