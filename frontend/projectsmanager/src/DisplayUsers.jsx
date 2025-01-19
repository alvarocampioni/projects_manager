import { useState, useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { listUsers } from "./services/AdminService";

function UsersList({ users }){
    return <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "white",
        color: "black",
      }}>
        <table>
        <tbody>
                <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                </tr>
                {users.map((user) => (
                    <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>{user.role}</td>
                    </tr>
                ))}
            </tbody>
        </table> 
        
    </div>
}

function DisplayUsers(){
    const { token } = useContext(AppContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        listUsers(token)
            .then((response) => {
              setUsers(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        });
    return <div>
        <UsersList users={users}/>
        </div>
}

export default DisplayUsers;