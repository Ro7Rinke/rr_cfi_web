import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../api/rr_cfi_api';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../redux/actions/authTokenActions'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await getAuthToken(username, password)
      if(result.access){
        dispatch(setAuthToken(result))
        navigate('/home')
      }else{
        alert("Usuário ou senha inválidos")
      }
    } catch (error) {
      alert('Falha ao efetuar o login');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  }
};

export default Login;