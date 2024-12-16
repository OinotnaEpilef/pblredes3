import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5454';

export const getEvents = async () => {
  const response = await axios.get(`${API_BASE_URL}/events`);
  return response.data;
};

export const createEvent = async (description: string) => {
  const response = await axios.post(`${API_BASE_URL}/events`, { description });
  return response.data;
};

export const placeBet = async (eventId: number, choice: string, amount: number) => {
  const response = await axios.post(`${API_BASE_URL}/bet`, { event_id: eventId, choice, amount });
  return response.data;
};
