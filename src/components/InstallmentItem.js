import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const InstallmentContainer = styled.div`
  border: 1px solid #fdd835;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #222;
  color: #fdd835;
`;

const InstallmentInfo = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const InstallmentItem = ({ installment }) => {
    const categories = useSelector((state) => state.categories)

    const dateText = new Date(installment.entry.date).toLocaleDateString('pt-BR')

    let installmentNumberText = `${installment.installment_number}`
    if (installment.entry.total_installments > 1) installmentNumberText += ` / ${installment.entry.total_installments}`

    return (
        <InstallmentContainer>
            <InstallmentInfo><strong>Valor:</strong> R$ {installment.value}</InstallmentInfo>
            <InstallmentInfo><strong>Data:</strong> {dateText}</InstallmentInfo>
            <InstallmentInfo><strong>Parcelas:</strong> {installmentNumberText}</InstallmentInfo>
            <InstallmentInfo><strong>Categoria:</strong> {categories[`${installment.entry.id_category}`]}</InstallmentInfo>
        </InstallmentContainer>
    );
};

export default InstallmentItem;