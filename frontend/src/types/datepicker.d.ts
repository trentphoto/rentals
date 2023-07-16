export type SelectedDates = {
    from: Date | null;
    to: Date | null;
}

export type DatePickerContextType = {
    selectedDates: SelectedDates;
    updateSelectedDates: (from: Date | null, to: Date | null) => void;
};