import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5001';

export const getEvents = async () => {
  const response = await axios.get(`${API_BASE_URL}/events`);
  return response.data;
};

export const createEvent = async (
  description: string,
  sideA: string,
  sideB: string,
  oddsA: number,
  oddsB: number
) => {
  const response = await axios.post(`${API_BASE_URL}/events`, {
    description,
    side_a: sideA,
    side_b: sideB,
    odds_a: oddsA,
    odds_b: oddsB,
  });
  return response.data;
};

export const placeBet = async (eventId: number, choice: string, amount: number) => {
  const response = await axios.post(`${API_BASE_URL}/bet`, { event_id: eventId, choice, amount });
  return response.data;
};
