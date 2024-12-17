import React, { useState, useEffect } from 'react';
import { getEvents, placeBet } from '../api'; // Assumindo que as funções estejam exportadas de api.ts

interface Event {
  id: number;
  description: string;
  side_a: string;
  side_b: string;
  odds_a: number;
  odds_b: number;
  status: boolean;
  result: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [betChoice, setBetChoice] = useState<string>('');
  const [betAmount, setBetAmount] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(100); // Supondo que o saldo inicial seja 100

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Erro ao carregar os eventos', error);
      }
    };
    fetchEvents();
  }, []);

  const handlePlaceBet = async (eventId: number) => {
    if (betAmount <= 0 || betAmount > userBalance) {
      alert('Quantia inválida');
      return;
    }

    try {
      const betData = {
        event_id: eventId,
        choice: betChoice,
        amount: betAmount,
        user_id: 1, // Exemplo, use o ID do usuário real aqui
      };
      await placeBet(betData.event_id, betData.choice, betData.amount);
      setUserBalance(userBalance - betAmount); // Atualiza o saldo após a aposta
      alert('Aposta realizada com sucesso!');
    } catch (error) {
      console.error('Erro ao realizar aposta:', error);
      alert('Erro ao realizar a aposta. Tente novamente.');
    }
  };

  return (
    <div>
      <h2>Lista de Eventos</h2>
      {events.map((event) => (
        <div key={event.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{event.description}</h3>
          <p>
            <strong>{event.side_a}</strong> vs <strong>{event.side_b}</strong>
          </p>
          <p>
            <strong>Odds:</strong> {event.odds_a} - {event.odds_b}
          </p>
          {event.status && (
            <div>
              <h4>Apostar</h4>
              <select onChange={(e) => setBetChoice(e.target.value)} value={betChoice}>
                <option value="">Escolha um lado</option>
                <option value={event.side_a}>{event.side_a}</option>
                <option value={event.side_b}>{event.side_b}</option>
              </select>
              <input
                type="number"
                placeholder="Quantia da aposta"
                value={betAmount}
                onChange={(e) => setBetAmount(parseFloat(e.target.value))}
                min="1"
              />
              <button onClick={() => handlePlaceBet(event.id)}>Apostar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;
