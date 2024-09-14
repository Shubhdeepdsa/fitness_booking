import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Fetch available classes
export const getClasses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/classes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Book a class
export const bookClass = async (userId, classId, date) => {
  try {
    const response = await axios.post(`${BASE_URL}/book`, {
      userId,
      classId,
      date,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cancel a booking
export const cancelBooking = async (userId, classId, date) => {
  try {
    const response = await axios.post(`${BASE_URL}/cancel`, {
      userId,
      classId,
      date,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch user bookings
export const getUserBookings = async (userId, page = 1, limit = 5) => {
  try {
    const response = await axios.get("http://localhost:5000/user/bookings", {
      params: { userId, page, limit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
