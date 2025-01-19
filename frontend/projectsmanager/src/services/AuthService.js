import axios from "axios";

const REST_API_AUTH_BASE_URL = 'http://localhost:8080/auth';

export const login = async (data) => {
  try {
    const response = await axios.post(`${REST_API_AUTH_BASE_URL}/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    let errorMessage = error.response?.data || error.message || "Unknown error occurred";
    console.error("Login failed:", errorMessage);
    if(errorMessage.includes("403")) errorMessage = "Wrong email or password";
    return `Login failed: ${errorMessage}`;
  }
}

export const register = async (data) => {
  try {
    const response = await axios.post(`${REST_API_AUTH_BASE_URL}/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return "Registered Successfuly";
  } catch (error) {
    const errorMessage = error.response?.data || error.message || "Unknown error occurred";
    console.error("Register failed:", errorMessage);
    return `Register failed: ${errorMessage}`;
  }
}