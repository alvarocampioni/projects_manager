import axios from "axios";

export const updatePassword = async (id, password, token) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/user/${id}/update`, null, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            password
          }
        });
        return "Password Updated Successfuly";
      } catch (error) {
        let errorMessage = error.response?.data || error.message || "Unknown error occurred";
        console.error("Update failed:", errorMessage);
        if(errorMessage.includes("403")) errorMessage = "Unauthorized";
        return `Update failed: ${errorMessage}`;
      }
}

export const loadUserById = async (id, token) => {
    return axios.get(`http://localhost:8080/api/v1/user/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

}

export const deleteUser = async (id, token) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/user/${id}/delete`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
        return "User Deleted Successfuly";
      } catch (error) {
        const errorMessage = error.response?.data || error.message || "Unknown error occurred";
        console.error("Deletion failed:", errorMessage);
        return `Deletion failed: ${errorMessage}`;
      }
}