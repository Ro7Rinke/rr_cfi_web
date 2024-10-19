import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const StyledSelect = styled.select`
  margin: 0 10px;
  padding: 12px 15px; /* Aumentar o padding para dar mais espaço */
  border: 2px solid #fdd835;
  border-radius: 5px;
  background-color: #333;
  color: #fdd835;
  font-size: 18px; /* Aumentar a font-size */
  
  &:focus {
    outline: none;
    border-color: #e6c400;
  }
`;

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
    <DropdownContainer>
      <StyledSelect value={selectedMonth} onChange={handleMonthChange}>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </StyledSelect>

      <StyledSelect value={selectedYear} onChange={handleYearChange}>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </StyledSelect>
    </DropdownContainer>
  );
};

export default MonthYearDropdown;