import React, { useState } from 'react';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState<number | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5001/login', { username });
      const { balance } = response.data;
      setBalance(balance);
      alert(`Bem-vindo, ${username}! Saldo: R$ ${balance.toFixed(2)}`);
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Entrar</button>
      {balance !== null && <p>Seu saldo: R$ {balance.toFixed(2)}</p>}
    </form>
  );
};

export default LoginForm;
