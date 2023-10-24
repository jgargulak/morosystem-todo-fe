import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the tasks", error);
    return [];
  }
};

export const createTask = async (text: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, { text });
    return response.data;
  } catch (error) {
    console.error("There was an error creating the task", error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/tasks/${id}`);
    return id;
  } catch (error) {
    console.error("There was an error deleting the task", error);
    throw error;
  }
};

export const updateTask = async (id: number, text: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks/${id}`, { text });
    return response.data;
  } catch (error) {
    console.error("There was an error updating the task", error);
    throw error;
  }
};

export const completeTask = async (id: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks/${id}/complete`);
    return response.data;
  } catch (error) {
    console.error("There was an error complete the task", error);
    throw error;
  }
};

export const incompleteTask = async (id: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks/${id}/incomplete`);
    return response.data;
  } catch (error) {
    console.error("There was an error incomplete the task", error);
    throw error;
  }
};
