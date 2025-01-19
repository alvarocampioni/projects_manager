import React, { useContext, useState } from "react";
import { login } from "./services/AuthService";
import { AppContext } from "./AppContext";
import TextInput from "./TextInput";

function Login(){
    
    const { setUser_id, setToken, setIsAdmin, setEmail, email }= useContext(AppContext);
    const [message, setMessage] = useState('');
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

        if(responseData.token){
            setIsLogged(true);
            setToken(responseData.token);
            setUser_id(responseData.user_id)
            setIsAdmin(responseData.role === "ADMIN");
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
            <TextInput text={"Email"} handleOnChange={handleEmail} value={email} />
            <TextInput text={"Password"} handleOnChange={handlePassword} value={password} type={"password"} />
        </label>
        <br />
        <button className="submit" onClick={handleLogin}>LOGIN</button>
        <h3>{hasTried ? message : ""}</h3>
    </div>
    } else {
        return <Logout />
    }
}

function Logout() {
    const { isLogged, setIsLogged, setEmail, setUser_id, setToken, setIsAdmin } = useContext(AppContext);
    const handleLogout = async () => {
        setIsLogged(false);
        setToken('');
        setUser_id('')
        setEmail('');
        setIsAdmin(false);
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