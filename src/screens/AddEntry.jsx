import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import API from '../api/rr_cfi_api';
import { useNavigate, useLocation } from 'react-router-dom';
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

const ButtonContainer = styled.div`
display: flex;
width: 100%;
gap: 10px;
`;

const Button = styled.button`
flex: 1;
padding: 10px;
font-size: 18px;
font-weight: bold;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s;
color: ${({ color }) => (color === 'gray' ? '#ddd' : 'black')};
background-color: ${({ color }) => (color === 'gray' ? '#666' : '#fdd835')};

&:hover {
  background-color: ${({ color }) => (color === 'gray' ? '#555' : '#e1c006')};
}
`;

const AddEntry = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const entryId = location.state?.entryId;

  const categories = useSelector((state) => state.categories);
  const transactionTypes = useSelector((state) => state.transactionTypes)

  const [title, setTitle] = useState('');
  const [totalValue, setTotalValue] = useState('0,00');
  const [totalInstallments, setTotalInstallments] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState(null);
  const [entry, setEntry] = useState(null);

  const fetchEntry = async () => {
    try {
      const result = await API.getEntry(entryId)
      setEntry(result)
    } catch (error) {
      alert('Falha ao carregar o lançamento')
      navigate('/home')
    }
  }

  useEffect(() => {
    if(entry){
      setTitle(entry.title);
      setTotalValue(Utils.formatValue(entry.total_value * 100));
      setTotalInstallments(entry.total_installments);
      setDate(new Date(entry.date).toISOString().split('T')[0]);
      setCategory(entry.id_category);
    }
  }, [entry])

  useEffect(() => {
    if(entryId)
      fetchEntry()
  }, [])

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
        navigate(-1)
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
    const formattedValue = Utils.formatValue(value)
    setTotalValue(formattedValue);
  };

  const handleFocus = (e) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedTotalValue = parseFloat(totalValue.replace(',', '.'));
    let newEntry = {
      title,
      total_value: formattedTotalValue,
      total_installments: totalInstallments,
      date,
      id_category: category,
      is_periodic: false,
      id_transaction_type: Utils.getDefaultTransactionTypes(transactionTypes)
    }
    if(entryId)
      newEntry.id = entryId

    sendEntry(newEntry)
  };

  return (
    <Container>
      <h1>{entryId ? 'Editar Lançamento' : 'Novo Lançamento'}</h1>
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

        <ButtonContainer>
          {entryId ? (
            <>
              <Button type="button" color="gray" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </>
          ) : (
            <Button type="submit">Adicionar Lançamento</Button>
          )}
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default AddEntry;