import React, { useState } from 'react';

const MonthYearDropdown = ({ onMonthYearChange }) => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years = [2023, 2024, 2025]; // Anos disponíveis

  const [selectedMonth, setSelectedMonth] = useState(10);
  const [selectedYear, setSelectedYear] = useState(2024);

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    onMonthYearChange(`${newMonth}/${selectedYear}`);
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    onMonthYearChange(`${selectedMonth}/${newYear}`);
  };

  return (
    <div>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>

      <select value={selectedYear} onChange={handleYearChange}>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthYearDropdown;