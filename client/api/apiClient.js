import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${process.env.SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  validateStatus() {
    return true;
  },
});
