import React, { useContext, useState } from "react";
import { login } from "./services/AuthService";
import { AppContext } from "./AppContext";

function Login(){
    
    const { setUser_id, setToken }= useContext(AppContext);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLogged, setIsLogged } = useContext(AppContext);
    const [hasTried, setHasTried] = useState(false);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        const data = {email, password};
        let responseData = await login(data);

        if(responseData.token && !responseData.token.includes("failed")){
            setIsLogged(true);
            setToken(responseData.token);
            setUser_id(responseData.user_id)
        } else {
            setMessage(responseData);
        }
        setHasTried(true);
    }

    if(!isLogged){
        return <div className="container" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "white",
            color: "black",
          }}> 
        <h1 style={{fontSize: "50px", padding: "30px"}}>Login</h1>
        <label>
            <input type="email" placeholder="Email" name="text" className="input" value={email} onChange={handleEmail} />
            <br />
            <br />
            <input type="text" placeholder="Password" name="text" className="input" value={password} onChange={handlePassword} />
        </label>
        <br />
        <button className="add" onClick={handleLogin}>LOGIN</button>
        <h3>{hasTried ? message : ""}</h3>
    </div>
    } else {
        return <Logout />
    }
}

function Logout() {
    const { isLogged, setIsLogged } = useContext(AppContext);
    const { setUser_id, setToken }= useContext(AppContext);

    const handleLogout = async () => {
        setIsLogged(false);
        setToken('');
        setUser_id('')
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
            <h2 style={{fontSize: "50px", padding: "30px"}}> You are logged in! </h2>
            <button className="skip" onClick={handleLogout}>Logout</button>
        </div>
    }
}

export default Login;