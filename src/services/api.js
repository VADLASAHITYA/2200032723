
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://20.244.56.144/evaluation-service',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const register = async (data) => {
  try {
    const response = await api.post('/register', data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getToken = async (clientId, clientSecret) => {
  try {
    const response = await api.post('/token', {
      clientID: clientId,
      clientSecret: clientSecret
    });
    return response.data;
  } catch (error) {
    console.error('Token fetch error:', error);
    throw error;
  }
};

