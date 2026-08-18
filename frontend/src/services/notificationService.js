import axios from "axios";

const API = "http://127.0.0.1:5000";

const getUserId = () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    return user?.id || null;

  } catch {
    return null;
  }
};


export const getNotifications = async () => {

  const userId = getUserId();

  const response = await axios.get(
    `${API}/notifications`,
    {
      params: {
        user_id: userId
      }
    }
  );

  return response.data;
};


export const getUnreadNotificationCount =
  async () => {

    const userId = getUserId();

    const response = await axios.get(
      `${API}/notifications/unread-count`,
      {
        params: {
          user_id: userId
        }
      }
    );

    return response.data.count;
  };


export const markNotificationAsRead =
  async (notificationId) => {

    const response = await axios.put(
      `${API}/notifications/${notificationId}/read`
    );

    return response.data;
  };


export const markAllNotificationsAsRead =
  async () => {

    const userId = getUserId();

    const response = await axios.put(
      `${API}/notifications/read-all`,
      null,
      {
        params: {
          user_id: userId
        }
      }
    );

    return response.data;
  };