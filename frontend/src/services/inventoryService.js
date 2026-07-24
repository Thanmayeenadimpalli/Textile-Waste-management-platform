import axios from "axios";

const API = "http://127.0.0.1:5000";

export const getInventory = async () => {
  return await axios.get(`${API}/inventory`);
};

export const addInventory = async (inventoryData) => {
  return await axios.post(`${API}/inventory`, inventoryData);
};