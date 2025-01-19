import axios from "axios";

const REST_API_AUTH_BASE_URL = 'http://localhost:8080/auth';

export const createAdmin = async (data, token) => {
    try {
      const response = await axios.post(`${REST_API_AUTH_BASE_URL}/create-admin`, data, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
      return "Admin Registered Successfuly";
    } catch (error) {
      const errorMessage = error.response?.data || error.message || "Unknown error occurred";
      console.error("Register failed:", errorMessage);
      return `Register failed: ${errorMessage}`;
    }
  }

export const listUsers = (token) => {
    return axios.get('http://localhost:8080/api/v1/users', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
}

export const adminDeleteUser = async (id, token) => {
    try {
        await axios.delete(`http://localhost:8080/api/v1/user/admin/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        return "Deleted User Successfuly";
      } catch (error) {
        let errorMessage = error.response?.data || error.message || "Unknown error occurred";
        if(errorMessage.includes("400")) errorMessage = "Can't delete own account here";
        return `Deletion failed: ${errorMessage}`;
      }
}