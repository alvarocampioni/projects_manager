import TextInput from "./TextInput";
import ButtonInput from "./Button";
import { useContext, useState } from "react";
import { adminDeleteUser } from "./services/AdminService";
import { AppContext } from "./AppContext";
import { loadUserById } from "./services/UserService";

function DisplaySelectedUser({ user }){
    return <div>
        <table style={{fontSize: "20px"}}>
        <tbody>
                <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                </tr>
                <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>{user.role}</td>
                </tr>
            </tbody>
        </table> 
        
    </div>
}

function DeleteUserForm(){
    const [selectedUser, setSelectedUser] = useState(null);
    const [userId, setUserId] = useState("");
    const [triedSearch, setTriedSearch] = useState(false);
    const [triedDelete, setTriedDelete] = useState(false);
    const [deleted, setDeleted] = useState(true);
    const { token, isLogged } = useContext(AppContext);
    const [message, setMessage] = useState("");
    const [failed, setFailed] = useState(false);

    const selectUser = async () => {
        try{ 
            setSelectedUser(await loadUserById(userId, token));
            setTriedSearch(false);
        } catch(error){
            setTriedSearch(true);
            setSelectedUser(null);
        }
        setTriedDelete(false);
        setDeleted(false);
        setFailed(false);
    }

    const handleId = (event) => {
        setUserId(event.target.value)
    }

    const handleDeletion = async () => {
        if(!triedDelete) setTriedDelete(true);
        else {
            setMessage(await adminDeleteUser(userId, token));
            setTriedSearch(false);
            if(message.includes("failed")) {
                setDeleted(false);
                setFailed(true);
            }
            else setDeleted(true);
            setTriedDelete(false);
        }
    }

    if(isLogged) return <div>
    <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        backgroundColor: "white",
        color: "black",
      }}>
        <h1 style={{fontSize: "50px", padding: "30px"}}>Delete User By ID</h1>
        <TextInput text={"User ID"} handleOnChange={handleId} type={"text"} />
        <ButtonInput text={"Search User"} handleOnClick={selectUser} className={"submit"} color={"white"} />
        {triedSearch ? <h3 style={{color: "black", fontSize: "20px"}}>User not found</h3> : ""}
        </div>
        <div>
        {selectedUser && !deleted ? <DisplaySelectedUser user={selectedUser.data} /> : ""}
        </div>
        <div style={{
           display: "flex",
           flexDirection: "column",
           justifyContent: "center",
           alignItems: "center",
           height: "20vh",
           }}>
            {selectedUser && !deleted ? <ButtonInput text={"Delete User"} handleOnClick={handleDeletion} className={"skip"} color={"white"} /> : ""}
            {triedDelete && !deleted && !failed ? <h3 style={{color: "black", fontSize: "20px"}}>Click again to confirm deletion</h3> : ""}
            {failed ? <h3 style={{color: "black", fontSize: "20px"}}>{message}</h3> : ""}
            {deleted ? <h3 style={{color: "black", fontSize: "20px"}}>{message}</h3> : ""}
        </div>
        </div>
        else return <div className="container" style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            backgroundColor: "white",
            color: "black",
          }}>
            <h1 style={{fontSize: "30px", textAlign: "center"}}>Login to acess this page !</h1>
          </div>
}

export default DeleteUserForm;