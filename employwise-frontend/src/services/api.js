import axios from "axios";

export const getUserById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      return response.data; // API returns data in { data: { userObject } } format
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

const API_BASE_URL = "https://reqres.in/api";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Login failed";
  }
};

export const getUsers = async (page = 1) => {
  const response = await axios.get(`${API_BASE_URL}/users?page=${page}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  return await axios.put(`${API_BASE_URL}/users/${id}`, userData);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_BASE_URL}/users/${id}`);
};
