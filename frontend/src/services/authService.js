import axios from "axios";

const API = "http://127.0.0.1:5000";

export const registerUser = async (userData) => {
  return await axios.post(`${API}/register`, userData);
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API}/login`,
    userData
  );

  // Store the logged-in user's information
  if (response.data) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email
      })
    );
  }

  return response;
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");

    return user
      ? JSON.parse(user)
      : null;

  } catch (error) {
    console.error(
      "Error reading current user:",
      error
    );

    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};