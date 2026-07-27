import axios from "axios";

const API = "http://127.0.0.1:5000";

// Inventory CRUD
export const getInventory = () =>
  axios.get(`${API}/inventory`);

export const addInventory = (inventoryData) =>
  axios.post(`${API}/inventory`, inventoryData);

export const updateInventory = (id, inventoryData) =>
  axios.put(`${API}/inventory/${id}`, inventoryData);

export const deleteInventory = (id) =>
  axios.delete(`${API}/inventory/${id}`);

// Inventory Analytics
export const getInventoryStats = async () => {
  const response = await axios.get(`${API}/inventory-stats`);
  return response.data;
};