import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:8080/hikes';

interface Hike {
  id: number;
  name: string;
  distance: number;
  elevation: number;
  difficulty: string;
  description: string;
}

export const fetchHikes = async (): Promise<Hike[]> => {
  try {
    const response: AxiosResponse<Hike[]> = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching hikes:', error);
    throw error;
  }
};

export const createHike = async (newHike: Omit<Hike, 'id'>): Promise<Hike> => {
  try {
    const response: AxiosResponse<Hike> = await axios.post(BASE_URL, newHike);
    return response.data;
  } catch (error) {
    console.error('Error creating hike:', error);
    throw error;
  }
};

export const updateHike = async (updatedHike: Hike): Promise<Hike> => {
  try {
    const response: AxiosResponse<Hike> = await axios.put(`${BASE_URL}/${updatedHike.id}`, updatedHike);
    return response.data;
  } catch (error) {
    console.error('Error updating hike:', error);
    throw error;
  }
};

export const deleteHike = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting hike:', error);
    throw error;
  }
};
