import React, { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { deleteUser, updatePassword } from "./services/UserService";
import TextInput from "./TextInput";
import ButtonInput from "./Button";

function ChangePasswordForm() {
  const [password, setPassword] = useState('');
  const { user_id, token } = useContext(AppContext);
  const [response, setResponse] = useState('');

  const handlePassword = (event) => {
    console.log(user_id);
    setPassword(event.target.value);
  }

  const handleEdit = async () => {
    setResponse(await updatePassword(user_id, password, token));
  }

    return <div className="text-center">
    <label style={{color: "black"}}>Change Password
      <TextInput text={"New Password "} handleOnChange={handlePassword} value={password} />
    </label>
    <br />
  <ButtonInput text={"EDIT"} handleOnClick={handleEdit} className={"submit"} />
  <h3>{response}</h3>
</div>
}

function UserSettings (){
    const { email, user_id, isLogged, token } = useContext(AppContext);
    const { setEmail, setUser_id, setIsLogged, setToken, setIsAdmin } = useContext(AppContext);
    const [triedDelete, setTriedDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const toggleIsEditing = () => {
      setIsEditing(!isEditing);
    }

    const handleDeletion = async () => {
      if(!triedDelete) setTriedDelete(true);
      else{
        await deleteUser(user_id, token);
        setIsLogged(false);
        setToken('');
        setUser_id('')
        setEmail('');
        setIsAdmin(false);
      }
    }

    if(isLogged){
      return <div className="container" style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "white",
          color: "black",
        }}>
          <h2 style={{fontSize: "50px", padding: "30px"}}> Welcome Back ! </h2>
          <h3 style={{fontSize: "25px"}}>Email: {email}</h3>
          <button className="menu" onClick={toggleIsEditing}>Change Password</button>
          {isEditing ? <ChangePasswordForm isEditing={isEditing} toggleIsEditing={toggleIsEditing}/> : ""}
          {!isEditing ? <button className="skip" style={{width: "170px"}} onClick={handleDeletion}>Delete Account</button> : ""}
          {triedDelete ? <h3>Click again to confirm deletion</h3> : ""}
      </div>
    } else {
      return <div className="container" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white",
        color: "black",
      }}>
        <h2 style={{fontSize: "50px", padding: "30px"}}> Account Deleted ! </h2>
    </div>
    }
}

export default UserSettings;