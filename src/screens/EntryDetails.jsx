import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InstallmentItem from '../components/InstallmentItem';
import Utils from '../utils';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../api/rr_cfi_api';
import { FaCalendarAlt, FaCreditCard } from 'react-icons/fa';
import Modal from 'react-modal';

// Estilizando o container principal
const Container = styled.div`
  padding: 20px;
  background-color: #1c1c1c;
  color: white;
  min-height: 100vh;
`;

// Título e separador de cor da categoria
const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: #fdd835; /* Amarelo para o título */
`;

const CategorySeparator = styled.hr`
  border: none;
  height: 4px;
  background-color: ${(props) => props.color || '#555'};
  margin-bottom: 20px;
`;

// Estilizando a seção de informações principais
const InfoSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

// Estilizando os textos das informações
const InfoText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.isYellow ? '#fdd835' : '#bdbdbd')}; /* Amarelo se isYellow, cinza caso contrário */
`;

const InstallmentValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #d32f2f; /* Vermelho para o valor */
`;

const ThinSeparator = styled.hr`
  border: none;
  height: 1px;
  background-color: #444;
  margin: 20px 0;
`;

// Estilizando os ícones
const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* Aumentando o espaçamento entre ícone e texto */
  color: ${(props) => (props.isIconYellow ? '#fdd835' : '#bdbdbd')}; /* Amarelo para os ícones */
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between; /* Para garantir que os textos fiquem alinhados */
  align-items: center; /* Para alinhar os itens verticalmente */
`;

// Estilizando os botões
const ButtonContainer = styled.div`
  display: flex;
  margin: 20px 0;
`;

const Button = styled.button`
  flex: 1;
  color: #222;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const EditButton = styled(Button)`
  background-color: #fdd835;
`;

const DeleteButton = styled(Button)`
  background-color: #d32f2f;

  &:hover {
    background-color: #b71c1c;
  }
`;

// Estilizando o modal de confirmação
const ModalContent = styled.div`
  background-color: #1c1c1c; /* Cor de fundo escura */
  padding: 20px;
  border-radius: 10px;
  color: white;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;

const ModalTitle = styled.h2`
  color: #fdd835; /* Amarelo para o título */
  margin-bottom: 20px;
`;

const ModalText = styled.p`
  font-size: 18px;
  color: #bdbdbd; /* Cinza para o texto */
  margin-bottom: 30px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const ConfirmButton = styled.button`
  flex: 1;
  background-color: #d32f2f;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b71c1c;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: #555;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #777;
  }
`;

const EntryDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { entryId } = location.state;

  const categories = useSelector((state) => state.categories);
  const [installments, setInstallments] = useState([]);
  const [entry, setEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryColor = categories[`${entry?.id_category}`]?.color || '#555';

  const fetchEntry = async () => {
    try {
      setEntry(await API.getEntry(entryId));
    } catch (error) {
      console.log(error);
      alert('Não foi possível recuperar o lançamento');
      navigate('/home');
    }
  };

  const fetchInstallments = async () => {
    try {
      setInstallments(await API.getInstallmentsByEntry(entryId));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEntryInstallments = async () => {
    try {
      await fetchEntry();
      await fetchInstallments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEntryInstallments();
  }, []);

  const handleDelete = async () => {
    try {
      const result = await API.deleteEntry(entryId)
      console.log(result)
      navigate('/home')
    } catch (error) {
      alert("Falha ao excluir lançamento")
    }
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return !entry ? null : (
    <Container>
      {/* Título e separador colorido */}
      <Title>{entry.title}</Title>
      <CategorySeparator color={categoryColor} />

      {/* Informações principais */}
      <InfoSection>
        <InfoRow>
          <InfoText isYellow>Valor Total:</InfoText>
          <InstallmentValue>{Utils.formatToBRL(entry.total_value)}</InstallmentValue>
        </InfoRow>
        <InfoRow>
          <InfoText isYellow>Parcelas:</InfoText>
          <IconText isIconYellow={false}>
            <FaCreditCard /> {entry.total_installments}
          </IconText>
        </InfoRow>
        <InfoRow>
          <InfoText isYellow>Categoria:</InfoText>
          <InfoText>{categories[entry.id_category]?.title || 'Sem Categoria'}</InfoText>
        </InfoRow>
        <InfoRow>
          <InfoText isYellow>Data:</InfoText>
          <IconText isIconYellow={false}>
            <FaCalendarAlt /> {Utils.formatDate(entry.date)}
          </IconText>
        </InfoRow>
      </InfoSection>

      {/* Botões de Editar e Excluir */}
      <ButtonContainer>
        <EditButton onClick={() => console.log('Editar')}>Editar</EditButton>
        <DeleteButton onClick={openModal}>Excluir</DeleteButton>
      </ButtonContainer>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmar Exclusão"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fundo escurecido
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            padding: '0',
            background: 'transparent',
            maxWidth: '90%', // Para garantir que não exceda 90% da largura da tela
            maxHeight: '90%', // Para garantir que não exceda 90% da altura da tela
          },
        }}
      >
        <ModalContent>
          <ModalTitle>Deseja excluir este lançamento?</ModalTitle>
          <ModalText>Todas as parcelas vinculadas também serão deletadas.</ModalText>
          <ModalButtonContainer>
            <ConfirmButton onClick={handleDelete}>Confirmar</ConfirmButton>
            <CancelButton onClick={closeModal}>Cancelar</CancelButton>
          </ModalButtonContainer>
        </ModalContent>
      </Modal>

      {/* Separador fino */}
      <ThinSeparator />

      {/* Listagem de parcelas */}
      {installments.length > 0 ? (
        installments.map((installment, index) => (
          <InstallmentItem key={index} installment={installment} isFromEntry={true} />
        ))
      ) : (
        <p>Nenhuma parcela disponível.</p>
      )}
    </Container>
  );
};

export default EntryDetails;