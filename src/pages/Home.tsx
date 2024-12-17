import React from 'react';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import LoginForm from '../components/LoginForm';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Sistema de Apostas Descentralizado</h1>
      <LoginForm/>
      <EventForm/>
      <EventList/>
    </div>
  );
};

export default Home;
