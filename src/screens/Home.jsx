import React, { useState, useEffect, useRef } from 'react';
import MonthYearDropdown from '../components/MonthYearDropdown';
import InstallmentItem from '../components/InstallmentItem';
import API from '../api/rr_cfi_api';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../redux/actions/categoriesActions';
import Utils from '../utils';
import { useNavigate } from 'react-router-dom';
import { setTransactionTypes } from '../redux/actions/transactionTypesActions';
import { setAuthToken } from '../redux/actions/authTokenActions';
import { initialStateAuthToken } from '../redux/reducers/authTokenReducer';

// Container para o menu e total
const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative; /* Necessário para o posicionamento do dropdown */
`;

// Estilizando o botão do menu
const MenuButton = styled.button`
  background-color: #fdd835;
  color: black;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #ffeb3b;
  }
`;

// Estilizando o dropdown para ocupar a linha inteira
const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: #333333;
  color: white;
  border-radius: 8px;
  padding: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: ${(props) => (props.show ? 'block' : 'none')};
  border: 2px solid #555; /* Adicionando borda ao dropdown */
`;

// Estilizando cada item do menu com separador e centralizando o texto
const MenuItem = styled.div`
  padding: 12px 20px;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #444; /* Separador entre os itens */

  &:hover {
    background-color: #444444;
  }

  &:last-child {
    border-bottom: none; /* Remove a borda inferior do último item */
  }
`;

// Container para o total das parcelas
const TotalContainer = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between; /* Alinha o texto à esquerda e o valor à direita */
  padding: 15px;
  background-color: #333333; /* Fundo do container */
  border-radius: 8px;
  margin: 10px 0; /* Espaçamento acima e abaixo */
  color: #fdd835; /* Cor do texto */
  position: relative;
`;

// Barra colorida lateral
const ColorBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 100%;
  background-color: ${(props) => props.color || 'transparent'};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

// Estilo para o valor das parcelas em vermelho
const ValueText = styled.span`
  color: #bdbdbd; /* Cor vermelha para os valores */
`;

// Estilizando o container principal
const Container = styled.div`
  padding: 20px; /* Espaçamento interno */
  background-color: #1c1c1c; /* Fundo da página */
  color: white; /* Cor do texto */
  min-height: 100vh; /* Para garantir que ocupe toda a altura da tela */
  padding-bottom: 160px;
`;

const SpacingDiv = styled.div`
  margin-bottom: 20px; /* Espaçamento de 20px */
`;

// Estilizando o botão flutuante
const FloatingButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 40px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #fdd835;
  color: #222;
  border: 6px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
  opacity: 0.57;
  aspect-ratio: 1 / 1; /* Mantém a proporção */

  &:hover {
    background-color: #ffeb3b;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const getCurrentMonthYear = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Obter o mês (de 0-11) e ajustar para 01-12
    const year = now.getFullYear();
    return `${month}/${year}`;
  };

  const [selectedMonthYear, setSelectedMonthYear] = useState(getCurrentMonthYear());
  const [installments, setInstallments] = useState([]);

  const orderInstallmentsByDate = (installments, isNewerFirst) => {
    installments.sort((a, b) =>
      isNewerFirst ? new Date(b.entry.date) - new Date(a.entry.date) : new Date(a.entry.date) - new Date(b.entry.date)
    );
  };

  const updateInstallments = async (month, year) => {
    try {
      const result = await API.getInstallmentsListByMonthYear(month, year);
      orderInstallmentsByDate(result, false);
      setInstallments(result);
    } catch (error) {
      console.error('Erro ao buscar parcelas:', error);
    }
  };

  const updateCategories = async () => {
    try {
      const result = await API.getCategories();
      let categoriesData = {};
      for (const category of result) {
        categoriesData[`${category.id}`] = category;
      }
      dispatch(setCategories(categoriesData));
    } catch (error) {
      console.error(error);
    }
  };

  const updateTransactionTypes = async () => {
    try {
      const result = await API.getTransactionTypes();
      let transactionTypesData = {};
      for (const transactionType of result) {
        transactionTypesData[`${transactionType.id}`] = transactionType;
      }
      dispatch(setTransactionTypes(transactionTypesData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    updateCategories();
    updateTransactionTypes();
  }, []);

  useEffect(() => {
    const [month, year] = selectedMonthYear.split('/');
    updateInstallments(month, year);
  }, [selectedMonthYear]);

  const calculateTotals = () => {
    let totals = {
      total: 0,
      categories: {},
    };
    installments.forEach((installment) => {
      totals.total += installment.value;

      const categoryIndex = `${installment.entry.id_category}`;
      if (!totals.categories[categoryIndex]) totals.categories[categoryIndex] = 0;

      totals.categories[categoryIndex] += installment.value;
    });

    return totals;
  };
  const totals = calculateTotals();

  const handleAddEntry = () => {
    navigate('/addEntry');
  };

  const handleLogout = () => {
    Utils.removeAllCookies()
    dispatch(setAuthToken(initialStateAuthToken))
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false); // Fecha o menu ao clicar fora dele
    }
  };

  return (
    <Container>

      <MenuContainer>
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>Menu</MenuButton>
        <DropdownMenu ref={menuRef} show={menuOpen}>
          {/* <MenuItem onClick={() => navigate('/settings')}>Configurações</MenuItem> */}
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </DropdownMenu>
      </MenuContainer>

      <MonthYearDropdown onMonthYearChange={setSelectedMonthYear} />

      <TotalContainer>
        <span>Total do Mês:</span>
        <ValueText>{Utils.formatToBRL(totals.total)}</ValueText>
      </TotalContainer>

      {Object.entries(totals.categories).map(([categoryId, totalValue]) => {
        const category = categories[categoryId];
        const color = category ? category.color : 'transparent';

        return (
          <TotalContainer key={categoryId}>
            <ColorBar color={color} />
            <span>{category.title}:</span>
            <ValueText>{Utils.formatToBRL(totalValue)}</ValueText>
          </TotalContainer>
        );
      })}

      <SpacingDiv />

      {installments.length > 0 ? (
        installments.map((installment, index) => <InstallmentItem key={index} installment={installment} />)
      ) : (
        <p>Nenhuma parcela disponível para {selectedMonthYear}.</p>
      )}

      {/* Botão flutuante */}
      <FloatingButton onClick={handleAddEntry}>+</FloatingButton>
    </Container>
  );
};

export default Home;