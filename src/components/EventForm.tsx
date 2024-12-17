import React, { useState } from 'react';
import { createEvent } from '../api';
import Header from './Header';

const EventForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [oddsA, setOddsA] = useState('');
  const [oddsB, setOddsB] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent(description, sideA, sideB, parseFloat(oddsA), parseFloat(oddsB));
      setDescription('');
      setSideA('');
      setSideB('');
      setOddsA('');
      setOddsB('');
      alert('Evento criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      alert('Erro ao criar evento. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Novo Evento</h2>
      <input
        type="text"
        placeholder="Descrição do evento"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Lado A"
        value={sideA}
        onChange={(e) => setSideA(e.target.value)}
      />
      <input
        type="text"
        placeholder="Lado B"
        value={sideB}
        onChange={(e) => setSideB(e.target.value)}
      />
      <input
        type="number"
        placeholder="Odds Lado A"
        value={oddsA}
        onChange={(e) => setOddsA(e.target.value)}
      />
      <input
        type="number"
        placeholder="Odds Lado B"
        value={oddsB}
        onChange={(e) => setOddsB(e.target.value)}
      />
      <button type="submit">Criar</button>
    </form>
  );
};

export default EventForm;
