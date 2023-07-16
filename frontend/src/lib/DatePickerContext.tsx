import React, { createContext, useState } from 'react';
import { SelectedDates, DatePickerContextType } from '@/types/datepicker';

// Create the Date Picker Context
export const DatePickerContext = createContext<DatePickerContextType>({
    selectedDates: {
        from: null,
        to: null,
    },
    updateSelectedDates: () => {},
});

// Define the DatePickerProvider component
export const DatePickerProvider = ({ children }: { children: React.ReactNode }) => {
  // Set up the state for selected dates
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    from: null,
    to: null,
  });

  // Update function to set the selected dates
  const updateSelectedDates = (from: Date | null, to: Date | null) => {
    setSelectedDates({ from, to });
  };

  // Provide the selected dates and update function through the context
  return (
    <DatePickerContext.Provider value={{ selectedDates, updateSelectedDates }}>
      {children}
    </DatePickerContext.Provider>
  );
};
