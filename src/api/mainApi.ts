import axios from 'axios'

const BASE_URL = `https://api.themoviedb.org/3`
const TOKEN = import.meta.env.VITE_API_TOKEN

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
})
