import React, { useState } from 'react';
import MonthYearDropdown from '../components/MonthYearDropdown'; // Componente de seleção de mês/ano
import InstallmentItem from '../components/InstallmentItem'; // Componente de exibição da parcela

const Home = () => {
  const [selectedMonthYear, setSelectedMonthYear] = useState('Outubro/2024'); // Definindo um mês e ano inicial

  // Exemplo de dados de parcelas
  const installments = [
    { value: 500.00, date: '2024-10-10', number: 1, status: 'Pago', month: 'Outubro', year: 2024 },
    { value: 300.00, date: '2024-10-20', number: 2, status: 'Pendente', month: 'Outubro', year: 2024 },
    { value: 400.00, date: '2024-11-05', number: 1, status: 'Pago', month: 'Novembro', year: 2024 },
    { value: 400.00, date: '2023-11-05', number: 1, status: 'Pago', month: 'Novembro', year: 2023 },
    // Adicione mais parcelas conforme necessário
  ];

  // Dividindo o selectedMonthYear para obter mês e ano separadamente
  const [selectedMonth, selectedYear] = selectedMonthYear.split('/');

  // Filtrar parcelas do mês e ano selecionado
  const filteredInstallments = installments.filter(inst => 
    inst.month === selectedMonth && inst.year.toString() === selectedYear
  );

  return (
    <div>
      <h1>Selecionar Mês e Ano:</h1>
      <MonthYearDropdown onMonthYearChange={setSelectedMonthYear} />

      <h2>Total de Parcelas do Mês: {selectedMonth} / {selectedYear}</h2>

      {filteredInstallments.length > 0 ? (
        filteredInstallments.map((installment, index) => (
          <InstallmentItem key={index} installment={installment} />
        ))
      ) : (
        <p>Nenhuma parcela disponível para {selectedMonth} / {selectedYear}.</p>
      )}
    </div>
  );
};

export default Home;