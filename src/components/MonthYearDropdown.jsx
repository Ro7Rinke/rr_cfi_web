import React, { useState } from 'react';
import styled from 'styled-components';
import { MdCalendarToday } from 'react-icons/md';

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* Alinha verticalmente */
  margin: 20px 0;
`;

const StyledSelect = styled.select`
  margin: 0 10px;
  padding: 12px 15px;
  border: 2px solid #fdd835;
  border-radius: 8px;
  background-color: #333;
  color: #bdbdbd;
  font-size: 20px; /* Aumentar a fonte */
  width: 150px; /* Largura fixa para ambos os dropdowns */
  text-align: center; /* Centraliza o texto */

  &:focus {
    outline: none;
    border-color: #e6c400;
  }
`;

const CalendarIcon = styled(MdCalendarToday)`
  color: #bdbdbd;
  font-size: 24px; /* Tamanho do ícone */
  margin: 0 10px; /* Margem lateral */
`;

const MonthYearDropdown = ({ onMonthYearChange }) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // Mês atual (1-12)
  const currentYear = today.getFullYear(); // Ano atual
  const years = Array.from({ length: 9 }, (_, i) => currentYear - 4 + i); // 4 anos para trás e 4 para frente

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

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
        {Array.from({ length: 12 }, (_, i) => {
          const monthName = new Date(0, i).toLocaleString('pt-BR', { month: 'long' });
          return (
            <option key={i} value={i + 1}>
              {monthName.charAt(0).toUpperCase() + monthName.slice(1)} {/* Primeira letra maiúscula */}
            </option>
          );
        })}
      </StyledSelect>

      <CalendarIcon />

      <StyledSelect value={selectedYear} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </StyledSelect>
    </DropdownContainer>
  );
};

export default MonthYearDropdown;