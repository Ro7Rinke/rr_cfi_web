import React, { useState, useEffect } from 'react';
import MonthYearDropdown from '../components/MonthYearDropdown';
import InstallmentItem from '../components/InstallmentItem';
import API from '../api/rr_cfi_api';

const Home = () => {
  const [selectedMonthYear, setSelectedMonthYear] = useState('10/2024');
  const [installments, setInstallments] = useState([]);

  const updateInstallments = async (month, year) => {
    try {
      const result = await API.getInstallmentsListByMonthYear(month, year);
      setInstallments(result);
    } catch (error) {
      console.error('Erro ao buscar parcelas:', error);
    }
  };

  useEffect(() => {
    const [month, year] = selectedMonthYear.split('/');
    updateInstallments(month, year);
  }, [selectedMonthYear]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Selecionar Mês e Ano:</h1>
      <MonthYearDropdown onMonthYearChange={setSelectedMonthYear} />

      <h2 style={styles.subtitle}>Total de Parcelas do Mês: {selectedMonthYear}</h2>

      {installments.length > 0 ? (
        installments.map((installment, index) => (
          <InstallmentItem key={index} installment={installment} />
        ))
      ) : (
        <p>Nenhuma parcela disponível para {selectedMonthYear}.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '0 20px',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '24px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '18px',
    textAlign: 'center',
  },
};

export default Home;