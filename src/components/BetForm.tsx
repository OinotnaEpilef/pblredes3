import React, { useState } from 'react';
import { placeBet } from '../api';

interface BetFormProps {
  eventId: number;
}

const BetForm: React.FC<BetFormProps> = ({ eventId }) => {
  const [choice, setChoice] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await placeBet(eventId, choice, amount);
    alert('Aposta realizada com sucesso!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Fazer Aposta</h3>
      <input
        type="text"
        placeholder="Escolha"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantia (em wei)"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button type="submit">Apostar</button>
    </form>
  );
};

export default BetForm;
