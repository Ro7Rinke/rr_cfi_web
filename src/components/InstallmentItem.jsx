import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaCalendarAlt, FaCreditCard } from 'react-icons/fa';
import Utils from '../utils';
import { useNavigate } from 'react-router-dom';

const InstallmentContainer = styled.div`
  border: 4px solid #fdd835;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 12px;
  background-color: #222;
  color: #f5f5f5;
  position: relative;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }
`;

const ColorBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;  /* Aumentando a largura da barra */
  height: 100%;
  background-color: ${(props) => props.color || 'transparent'};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const InstallmentTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #fdd835;
  margin-bottom: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  /* Para garantir que o texto longo seja tratado */
`;

const InstallmentValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #d32f2f;  /* Mantendo a cor vermelha, mas um tom mais vibrante */
  margin-bottom: 12px;
`;

const InstallmentDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #bdbdbd;
`;

const InstallmentIconText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;  /* Aumentando o espaçamento entre ícone e texto */
`;

const Separator = styled.hr`
  border: 0;
  border-top: 1px solid #444;
  margin: 15px 0;
`;

const InstallmentItem = ({ installment, isFromEntry }) => {
  const navigate = useNavigate()

    const categories = useSelector((state) => state.categories);
    const category = categories[`${installment.entry.id_category}`];
    const color = category ? category.color : 'transparent';

    // const dateText = new Date(installment.entry.date).toLocaleDateString('pt-BR');
    let installmentNumberText = `${installment.installment_number}`;
    if (installment.entry.total_installments > 1) {
        installmentNumberText += ` / ${installment.entry.total_installments}`;
    }

    const handleClick = () => {
      if(!isFromEntry)
        navigate('/entry-details', {state: {entryId: installment.entry.id}})
    }

    return (
        <InstallmentContainer onClick={handleClick}>
            <ColorBar color={color} />
            <InstallmentTitle>{installment.entry.title}</InstallmentTitle>
            <InstallmentValue>{Utils.formatToBRL(installment.value)}</InstallmentValue>
            <Separator />
            <InstallmentDetails>
                <InstallmentIconText>
                    <FaCalendarAlt /> {Utils.formatDate(isFromEntry ? installment.reference_date : installment.entry.date)}
                </InstallmentIconText>
                <InstallmentIconText>
                    <FaCreditCard /> {installmentNumberText}
                </InstallmentIconText>
            </InstallmentDetails>
        </InstallmentContainer>
    );
};

export default InstallmentItem;