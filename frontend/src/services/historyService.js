import axios from "axios";

const API = "http://127.0.0.1:5000";

export const getHistory = async () => {
  const response = await axios.get(`${API}/history`);
  return response.data;
};