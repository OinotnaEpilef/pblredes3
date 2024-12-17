import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from '../src/components/UserContext';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import EventForm from './components/EventForm';
import EventDetails from './pages/EventDetails';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/create-event" element={<EventForm />} />
          <Route path='`/event/${event.id}`' element={<EventDetails />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
