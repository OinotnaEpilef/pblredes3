import React from 'react';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Sistema de Apostas Descentralizado</h1>
      <EventForm />
      <EventList />
    </div>
  );
};

export default Home;
