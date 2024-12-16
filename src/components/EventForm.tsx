import React, { useState } from 'react';
import { createEvent } from '../api';

const EventForm: React.FC = () => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEvent(description);
    setDescription('');
    alert('Evento criado com sucesso!');
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
      <button type="submit">Criar</button>
    </form>
  );
};

export default EventForm;
