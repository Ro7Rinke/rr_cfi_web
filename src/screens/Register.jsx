import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/rr_cfi_api';
import styled from 'styled-components';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #121212;
  color: #fdd835;
  padding: 0 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background-color: #222;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 40px;
  border: 2px solid #fdd835;
  border-radius: 5px;
  background-color: #333;
  color: #fdd835;
  font-size: 16px;

  &::placeholder {
    color: #fdd835;
    opacity: 0.7;
  }

  box-sizing: border-box;
`;

const Icon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #fdd835;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #fdd835;
  color: #121212;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #e6c400;
  }
`;

const LoginLink = styled.p`
  color: #fdd835;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await API.registerUser(username, email, password);
      if(result){
        alert('Cadastro realizado com sucesso!');
        navigate('/');
      }else{
        alert('Não foi possível criar o usuário')
      }
    } catch (error) {
      alert('Falha ao efetuar o cadastro');
    }
  };

  return (
    <Container>
      <h2>Cadastrar</h2>
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
          <Icon><FaEnvelope /></Icon>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
        <Button type="submit">Cadastrar</Button>
      </Form>
      <LoginLink onClick={() => navigate('/')}>Já tem uma conta? Faça login</LoginLink>
    </Container>
  );
};

export default Register;