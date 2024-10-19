import React, { useState, useEffect } from 'react';
import MonthYearDropdown from '../components/MonthYearDropdown';
import InstallmentItem from '../components/InstallmentItem';
import API from '../api/rr_cfi_api';
import styled from 'styled-components';

// Container para o total das parcelas
const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Alinha o texto à esquerda e o valor à direita */
  padding: 15px;
  background-color: #222; /* Fundo do container */
  border-radius: 8px;
  margin: 20px 0; /* Espaçamento acima e abaixo */
  color: #fdd835; /* Cor do texto */
`;

// Estilizando o container principal
const Container = styled.div`
  padding: 20px; /* Espaçamento interno */
  background-color: #121212; /* Fundo da página */
  color: white; /* Cor do texto */
  min-height: 100vh; /* Para garantir que ocupe toda a altura da tela */
`;

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

  const totalValue = installments.reduce((acc, installment) => acc + parseFloat(installment.value), 0).toFixed(2); // Calcula o total

  return (
    <Container>
      <h1>Selecionar Mês e Ano:</h1>
      <MonthYearDropdown onMonthYearChange={setSelectedMonthYear} />

      <TotalContainer>
        <span>Total de Parcelas do Mês:</span>
        <span>R$ {totalValue}</span>
      </TotalContainer>

      {installments.length > 0 ? (
        installments.map((installment, index) => (
          <InstallmentItem key={index} installment={installment} />
        ))
      ) : (
        <p>Nenhuma parcela disponível para {selectedMonthYear}.</p>
      )}
    </Container>
  );
};

export default Home;