import React, { useState, useEffect } from 'react';
import MonthYearDropdown from '../components/MonthYearDropdown';
import InstallmentItem from '../components/InstallmentItem';
import API from '../api/rr_cfi_api';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../redux/actions/categoriesActions';

// Container para o total das parcelas
const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Alinha o texto à esquerda e o valor à direita */
  padding: 15px;
  background-color: #222; /* Fundo do container */
  border-radius: 8px;
  margin: 10px 0; /* Espaçamento acima e abaixo */
  color: #fdd835; /* Cor do texto */
`;

// Estilizando o container principal
const Container = styled.div`
  padding: 20px; /* Espaçamento interno */
  background-color: #121212; /* Fundo da página */
  color: white; /* Cor do texto */
  min-height: 100vh; /* Para garantir que ocupe toda a altura da tela */
`;

const SpacingDiv = styled.div`
  margin-bottom: 20px; /* Espaçamento de 20px */
`;

const Home = () => {
  const dispatch = useDispatch()

  const categories = useSelector((state) => state.categories)

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

  const updateCategories = async () => {
    try {
      const result = await API.getCategories()
      let categoriesData = {}
      for (const category of result) {
        categoriesData[`${category.id}`] = category.title
      }
      dispatch(setCategories(categoriesData))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    updateCategories()
  }, [])

  useEffect(() => {
    const [month, year] = selectedMonthYear.split('/');
    updateInstallments(month, year);
  }, [selectedMonthYear]);

  const calculateTotals = () => {
    let totals = {
      total: 0,
      categories: {}
    }
    installments.forEach(installment => {
      totals.total += installment.value

      const categoryIndex = `${installment.entry.id_category}`
      if (!totals.categories[categoryIndex])
        totals.categories[categoryIndex] = 0

      totals.categories[categoryIndex] += installment.value
    })

    return totals
  }
  const totals = calculateTotals()

  return (
    <Container>
      <h1>Selecionar Mês e Ano:</h1>
      <MonthYearDropdown onMonthYearChange={setSelectedMonthYear} />

      <TotalContainer>
        <span>Total do Mês:</span>
        <span>R$ {totals.total.toFixed(2)}</span>
      </TotalContainer>
        {Object.entries(totals.categories).map(([categoryId, totalValue]) => (
          <TotalContainer>
            <span>{categories[`${categoryId}`]}:</span>
            <span>R$ {totalValue.toFixed(2)}</span>
          </TotalContainer>
        ))}

      <SpacingDiv />

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