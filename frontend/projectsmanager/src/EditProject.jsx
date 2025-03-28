import React, { useContext, useState } from "react";
import { editProject } from "./services/ProjectService";
import { AppContext } from "./AppContext";
import TextInput from "./TextInput";
import ButtonInput from "./Button";

function EditForm({ prevName, prevDesc, toggleEditForm }) {
    const [project_name, setProject_name] = useState(prevName || "");
    const [project_description, setProject_description] = useState(prevDesc || "");
    const { projectSelected, token } = useContext(AppContext);
    const { setEdited} = useContext(AppContext);
  
    const handleName = (e) => setProject_name(e.target.value);
    const handleDesc = (e) => setProject_description(e.target.value);
  
    const onEditClick = () => {
      if(!projectSelected) return;
      if (!project_name && !project_description) {
        return;
      }

      let hours_spent = projectSelected.hours_spent;
  
      const data = {
        project_name: project_name || prevName,
        project_description: project_description || prevDesc,
        hours_spent
      };
  
      editProject(projectSelected.project_id, data, token)
        .then((response) => {
          console.log("Project updated:", response.data);
          toggleEditForm();
          projectSelected.project_name = data.project_name;
          projectSelected.project_description = data.project_description;
          setEdited(true);
        })
        .catch((error) => {
          console.error("Error updating project:", error);
        });
    };
  
    return (
      <div className="text-center">
          <label style={{color: "black"}}>Edit Project
            <TextInput text={"Project Name"} handleOnChange={handleName} value={project_name} />
            <TextInput text={"Project Description"} handleOnChange={handleDesc} value={project_description} />
          </label>
          <br />
        <ButtonInput text={"EDIT"} handleOnClick={onEditClick} className={"submit"} />
      </div>
    );
  }
  
  function EditButton() {
    const [isEditing, setIsEditing] = useState(false);
    const { projectSelected } = useContext(AppContext);
  
    const toggleEditForm = () => setIsEditing(!isEditing);
  
    return (
      <div>
        <button className="editBtn" title="Edit current project" onClick={toggleEditForm} disabled={projectSelected ? false : true}>
          <svg height="1em" viewBox="0 0 512 512">
            <path
              fill="#000000"
              d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
            />
          </svg>
        </button>
  
        {isEditing && (
          <EditForm
            prevName={projectSelected.project_name}
            prevDesc={projectSelected.project_description}
            toggleEditForm={toggleEditForm}
          />
        )}
      </div>
    );
  }

  export default EditButton;