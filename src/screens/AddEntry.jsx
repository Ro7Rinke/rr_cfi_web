import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import API from '../api/rr_cfi_api';
import { useNavigate } from 'react-router-dom';
import Utils from '../utils';

const Container = styled.div`
  padding: 20px;
  background-color: #121212;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px; /* Limita o tamanho máximo do formulário para desktops */
  background-color: #222;
  padding: 20px;
  border-radius: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333;
  color: white;

  &:focus {
    border-color: #fdd835; /* Cor de destaque para foco */
    outline: none;
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333;
  color: white;

  &:focus {
    border-color: #fdd835;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  background-color: #fdd835;
  border: none;
  border-radius: 5px;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e1c006;
  }
`;

const AddEntry = () => {
  const navigate = useNavigate()

  const categories = useSelector((state) => state.categories);
  const transactionTypes = useSelector((state) => state.transactionTypes)

  const [title, setTitle] = useState('');
  const [totalValue, setTotalValue] = useState('0,00');
  const [totalInstallments, setTotalInstallments] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (categories && Object.keys(categories).length > 0) {
      // Define a categoria padrão ao carregar as categorias
      setCategory(Utils.getDefaultCategory(categories));
    }
  }, [categories]);

  const sendEntry = async (entry) => {
    try {
      const result = await API.sendEntry(entry)
      if(result){
        navigate('/home')
      }else{
        alert('Não foi possível criar o lançamento')
      }
    } catch (error) {
      console.log(error)
      alert('Falha ao cadastrar novo lançamento.')
    }
  }

  const handleTotalValueChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (!value) {
      setTotalValue('0,00');
      return;
    }
    value = parseInt(value, 10).toString();
    const formattedValue = (value.length === 1 
      ? '0,0' + value 
      : value.length === 2 
      ? '0,' + value 
      : value.slice(0, -2) + ',' + value.slice(-2)
    );
    setTotalValue(formattedValue);
  };

  const handleFocus = (e) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedTotalValue = parseFloat(totalValue.replace(',', '.'));
    const newEntry = {
      title,
      total_value: formattedTotalValue,
      total_installments: totalInstallments,
      date,
      id_category: category,
      is_periodic: false,
      id_transaction_type: Utils.getDefaultTransactionTypes(transactionTypes)
    };
    sendEntry(newEntry)
  };

  return (
    <Container>
      <h1>Novo Lançamento</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Título:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Valor Total (R$):</Label>
          <Input
            type="text"
            value={totalValue}
            onChange={handleTotalValueChange}
            onFocus={handleFocus}
            required
            maxLength="10"
          />
        </FormGroup>

        <FormGroup>
          <Label>Total de Parcelas:</Label>
          <Input
            type="number"
            value={totalInstallments}
            onChange={(e) => setTotalInstallments(e.target.value)}
            min="1"
            pattern="[0-9]*"
          />
        </FormGroup>

        <FormGroup>
          <Label>Data:</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Categoria:</Label>
          <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
            {Object.keys(categories).map((id) => (
              <option key={id} value={id}>
                {categories[id].title}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Button type="submit">Adicionar Lançamento</Button>
      </Form>
    </Container>
  );
};

export default AddEntry;