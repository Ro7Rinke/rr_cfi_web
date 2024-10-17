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
  return (
    <InstallmentContainer>
      <InstallmentInfo><strong>Valor:</strong> R$ {installment.value}</InstallmentInfo>
      <InstallmentInfo><strong>Data:</strong> {installment.date}</InstallmentInfo>
      <InstallmentInfo><strong>Número da Parcela:</strong> {installment.number}</InstallmentInfo>
      <InstallmentInfo><strong>Status:</strong> {installment.status}</InstallmentInfo>
    </InstallmentContainer>
  );
};

export default InstallmentItem;