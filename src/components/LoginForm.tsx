import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import EventList from './EventList';
import EventForm from './EventForm';

const LoginForm: React.FC = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const { setUsername, setBalance } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5001/login', { username: usernameInput });
      const { balance } = response.data;
      setUsername(usernameInput);
      setBalance(balance);
      alert(`Bem-vindo, ${usernameInput}! Saldo: R$ ${balance.toFixed(2)}`);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao conectar. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <button type="submit">Entrar</button>
      <EventForm/>
      <EventList/>
    </form>
  );
};

export default LoginForm;
