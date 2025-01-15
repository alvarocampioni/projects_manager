import React, { useEffect, useState, useContext } from "react";
import { listProjectsByUser, editProject } from "./services/ProjectService";
import { AppContext } from "./AppContext";
import CurrentProject from "./CurrentProject";

function ProjectsTable({ isDisplaying, setIsDisplaying }) {
  const { isLogged } = useContext(AppContext);
  const { projectSelected, setProjectSelected } = useContext(AppContext);
  const { user_id } = useContext(AppContext);
  const { token } = useContext(AppContext);
  const { timeCounter, setTimeCounter } = useContext(AppContext);

  const handleSelection = async (event) => {
    if (projectSelected) {
      projectSelected.hours_spent = projectSelected.hours_spent + timeCounter / 3600;
      console.log(projectSelected.hours_spent);
      try {
        await editProject(projectSelected.project_id, projectSelected, token);
      } catch (error) {
        console.error("Error updating project:", error);
      }
      setTimeCounter(0);
    }
    try {
      const response = await listProjectsByUser(user_id, token);
      const updatedProjects = response.data;
      setProjects(updatedProjects);
  
      const newSelectedProject = updatedProjects.find(
        (p) => p.project_id === parseInt(event.target.value)
      );
      setProjectSelected(newSelectedProject);
    } catch (error) {
      console.error("Error selecting projects:", error);
    }
  
    setIsDisplaying(false);
  };

  const [projects, setProjects] = useState([]);

    useEffect(() => {
    if (isDisplaying && isLogged) {
      listProjectsByUser(user_id, token)
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isDisplaying]);

  if(projects.length <= 0){
    return isDisplaying && (<div className="container">
        <h2 className="text-center">{isLogged ? "No projects found" : "Login to create projects"}</h2>
        </div>);
  } else {
    return (
      isDisplaying && (
        <div className="container">
          <h2 className="text-center" style={{color: "black"}}>List of Projects</h2>
          <form>
            {projects.map((project) => (
              <div key={project.project_id} className="project-item">
                <input
                  type="radio"
                  name="select-project"
                  value={project.project_id}
                  onChange={handleSelection}
                />
                <label htmlFor={`radio-${project.project_id}`}>{project.project_name}
                  <span style={{ color: 'black', paddingLeft: "20px" }}>{project.hours_spent.toFixed(2)}h </span> </label>
              </div>
            ))}
          </form>
        </div>
      )
    );
  }
}

function DisplayListButton() {
  const [isDisplaying, setIsDisplaying] = useState(false);

  const toggleIsDisplaying = () => setIsDisplaying(!isDisplaying);

  return (
    <div>
      <CurrentProject />
      <button className="menu" onClick={toggleIsDisplaying}>
        {isDisplaying ? "Hide Projects" : "Show Projects"}
      </button>
      <ProjectsTable isDisplaying={isDisplaying} setIsDisplaying={setIsDisplaying} />
    </div>
  );
}

export default DisplayListButton;
