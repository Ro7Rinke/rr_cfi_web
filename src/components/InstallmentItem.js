import React from 'react';
import styled from 'styled-components';

const InstallmentContainer = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const InstallmentInfo = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const InstallmentItem = ({ installment }) => {
    let installmentNumberText = `${installment.installment_number}`
    if(installment.entry.total_installments > 1) installmentNumberText += ` / ${installment.entry.total_installments}`

    return (
        <InstallmentContainer>
        <InstallmentInfo><strong>Valor:</strong> R$ {installment.value}</InstallmentInfo>
        <InstallmentInfo><strong>Data:</strong> {installment.entry.date}</InstallmentInfo>
        <InstallmentInfo><strong>Número da Parcela:</strong> {installmentNumberText}</InstallmentInfo>
        <InstallmentInfo><strong>Categoria:</strong> {installment.entry.id_category}</InstallmentInfo>
        </InstallmentContainer>
    );
};

export default InstallmentItem;