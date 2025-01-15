import { useEffect, useContext } from 'react';
import { AppContext } from "./AppContext";


function CurrentProject() {
    const { projectSelected, edited, setEdited } = useContext(AppContext);

    useEffect(() => {
        if (projectSelected || edited) {
            setEdited(false);
        }
    }, [projectSelected, edited, setEdited]); 

    if(projectSelected || edited){
        return <div className="text-center" style={{fontSize: "30px"}}>
            <h1 style={{color: "black", fontSize: "35px"}}>Currently Working on:</h1>
            <h2 style={{color: "black", fontSize: "30px"}}>{projectSelected.project_name}</h2>
            <br />
            <h3 style={{color: "black", fontSize: "30px"}}>Description:</h3>
            <p style={{color: "black", fontSize: "30px"}}>{projectSelected.project_description}</p>
        </div>
    }
}

export default CurrentProject;