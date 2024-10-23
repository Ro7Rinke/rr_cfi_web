import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaCalendarAlt, FaCreditCard } from 'react-icons/fa'; // Importando ícones
import Utils from '../utils';

const InstallmentContainer = styled.div`
  border: 4px solid #fdd835;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  background-color: #222;
  color: #f5f5f5;
  position: relative;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

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

const InstallmentTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #fdd835;
  margin-bottom: 12px;
`;

const InstallmentValue = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #b72121;
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
  gap: 5px;
`;

const Separator = styled.hr`
  border: 0;
  border-top: 1px solid #333;
  margin: 15px 0;
`;

const InstallmentItem = ({ installment }) => {
    const categories = useSelector((state) => state.categories);
    const category = categories[`${installment.entry.id_category}`];
    const color = category ? category.color : 'transparent';

    const dateText = new Date(installment.entry.date).toLocaleDateString('pt-BR');
    let installmentNumberText = `${installment.installment_number}`;
    if (installment.entry.total_installments > 1) {
        installmentNumberText += ` / ${installment.entry.total_installments}`;
    }

    return (
        <InstallmentContainer>
            <ColorBar color={color} />
            <InstallmentTitle>{installment.entry.title} mais alguma coisa longa pra adicionar tamanho</InstallmentTitle>
            <InstallmentValue>{Utils.formatToBRL(installment.value)}</InstallmentValue>
            <Separator />
            <InstallmentDetails>
                <InstallmentIconText>
                    <FaCalendarAlt /> {dateText}
                </InstallmentIconText>
                <InstallmentIconText>
                    <FaCreditCard /> {installmentNumberText}
                </InstallmentIconText>
            </InstallmentDetails>
        </InstallmentContainer>
    );
};

export default InstallmentItem;