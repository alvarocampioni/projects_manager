import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/v2;projects';
const REST_API_POST_URL = 'http://localhost:8080/api/v2/project';

export const listProjects = () => {
    return axios.get(REST_API_BASE_URL);
}

export const singleProject = (id) => {
  return axios.get(`${REST_API_BASE_URL}/${id}`);
}

export const createProject = async (project, token) => {
  console.log(project);
  try {
    const response = await axios.post(`http://localhost:8080/api/v2/users/project`, project,  {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
  }
};


export const deleteProject = (id, token) => {
    return axios.delete(`http://localhost:8080/api/v2/projects/${id}`,  {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
};

export const editProject = async (id, project, token) => {
    return axios.put(`http://localhost:8080/api/v2/projects/${id}`, project,  {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    });
}

export const listProjectsByUser = (id, token) => {
  return axios.get(`http://localhost:8080/api/v1/users/${id}/projects`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
}
  