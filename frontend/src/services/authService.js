import axios from "axios";

const API = "http://127.0.0.1:5000";

export const registerUser = async (userData) => {
  return await axios.post(`${API}/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API}/login`, userData);
};