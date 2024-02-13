import axios, { AxiosError } from 'axios';

export const API_URL = 'http://localhost:3000';

const token = localStorage.getItem('@OZ:token');

export const api = axios.create({
    baseURL: API_URL,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });