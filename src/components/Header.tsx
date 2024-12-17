import React from 'react';
import { useUser } from './UserContext';

const Header: React.FC = () => {
  const { username, balance } = useUser();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <h1>Casa de Apostas</h1>
      {username && (
        <div>
          <strong>Usuário:</strong> {username} | <strong>Saldo:</strong> R$ {balance.toFixed(2)}
        </div>
      )}
    </header>
  );
};

export default Header;
