import React from 'react';
import { useParams } from 'react-router-dom';
import BetForm from '../components/BetForm';
import Header from '../components/Header';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Header/>
      <h1>Detalhes do Evento</h1>
      <p>ID do Evento: {id}</p>
      <BetForm eventId={parseInt(id || '0')} />
    </div>
  );
};

export default EventDetails;