import React, { useContext, useState } from "react";
import { createProject } from "./services/ProjectService";
import { AppContext } from "./AppContext";

function AddProjectButton(){
  const [isDisplaying, setIsDisplaying] = useState(false);
  const toggleIsDisplaying = () => setIsDisplaying(!isDisplaying)

  return <div>
    <button className="menu" onClick={toggleIsDisplaying}>Add Project</button>
    <Add isDisplaying={isDisplaying}/>
  </div>
}

function AddProject(){
  const [project_name, setName] = useState("");
  const [project_description, setDesc] =  useState("");
  const { token } = useContext(AppContext);
  const { isLogged } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  }

  const handleDesc = (event) => {
    setDesc(event.target.value);
  }

  const handleSubmit = async () => {
    if (!project_name) {
      setErrorMessage("Project name is required.");
      setSuccessMessage("");
      return;
    }

    const data = {
      project_name,
      project_description: project_description || "No description",
      hours_spent: 0
    };

    try {
      await createProject(data, token);
      setSuccessMessage("Project created successfully!");
      setErrorMessage("");
      setName("");
      setDesc(""); 
    } catch (error) {
      setErrorMessage("Error creating project. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
  <div className="container" style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "white",
      color: "black",
    }}> 
  <h1 style={{fontSize: "50px", padding: "30px"}}>{isLogged ? "Add New Project" : "Login to add projects"}</h1>
      <label>
          <input type="text" placeholder="Project Name" name="text" className="input" maxLength={30} value={project_name} onChange={handleName} />
          <br />
          <br />
          <input type="text" placeholder="Project Description" name="text" className="input" value={project_description} onChange={handleDesc} />
      </label>
      <br />
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <button className="add" onClick={handleSubmit} disabled={!isLogged}>ADD</button>
    </div>
  );
}

export default AddProject;
