import React, { useEffect, useState } from 'react';
import { getEvents } from '../api';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  description: string;
  odds: number;
  status: boolean;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Eventos</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <Link to={`/event/${event.id}`}>{event.description}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
