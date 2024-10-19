import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/rr_cfi_api';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../redux/actions/authTokenActions';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #121212; /* Cor de fundo escura */
  color: #fdd835; /* Amarelo */
  padding: 0 20px; /* Adiciona espaçamento lateral */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%; /* Largura total do formulário */
  max-width: 400px; /* Largura máxima do formulário */
  background-color: #222; /* Fundo do formulário */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%; /* Largura total do input */
  padding: 10px 40px; /* Espaço interno */
  border: 2px solid #fdd835; /* Amarelo */
  border-radius: 5px;
  background-color: #333; /* Fundo dos inputs */
  color: #fdd835; /* Texto amarelo */
  font-size: 16px;

  &::placeholder {
    color: #fdd835; /* Cor do placeholder */
    opacity: 0.7; /* Opacidade do placeholder */
  }

  /* Limita a largura do input */
  box-sizing: border-box; /* Adiciona border e padding à largura total */
`;

const Icon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #fdd835; /* Amarelo */
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #fdd835; /* Amarelo */
  color: #121212; /* Texto escuro */
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px; /* Espaço acima do botão */
  width: 100%; /* Largura total do botão */
  box-sizing: border-box; /* Adiciona border e padding à largura total */

  &:hover {
    background-color: #e6c400; /* Tom mais escuro de amarelo ao passar o mouse */
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await API.getAuthToken(username, password);
      if (result.access) {
        dispatch(setAuthToken(result));
        navigate('/home');
      } else {
        alert('Usuário ou senha inválidos');
      }
    } catch (error) {
      alert('Falha ao efetuar o login');
    }
  };

  return (
    <Container>
      <h2>RR_CFI</h2>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Icon><FaUser /></Icon>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
            required
          />
        </InputContainer>
        <InputContainer>
          <Icon><FaLock /></Icon>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
        </InputContainer>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;