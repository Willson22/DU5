import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const getLists = async () => axios.get(`${API_BASE_URL}/lists`);
export const createList = async (data) => axios.post(`${API_BASE_URL}/lists`, data);
export const updateList = async (id, data) => axios.put(`${API_BASE_URL}/lists/${id}`, data);
export const deleteList = async (id) => axios.delete(`${API_BASE_URL}/lists/${id}`);
export const getListDetails = async (id) => axios.get(`${API_BASE_URL}/lists/${id}`);