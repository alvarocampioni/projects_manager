import React, { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import TextInput from "./TextInput";

function Register({ registerFunction, text, token }){
    const [message, setMessage] = useState('');
    const [hasTried, setHasTried] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLogged, isAdmin } = useContext(AppContext);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleRegister = async () => {
        const data = {email, password};
        let newMessage;
        if(token) newMessage = await registerFunction(data, token);
        else newMessage = await registerFunction(data);
        setMessage(newMessage);
        setHasTried(true);
    }

    if(isLogged && !isAdmin){
        return <div className="container" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "white",
            color: "black",
          }}>
            <h2 style={{fontSize: "50px", padding: "30px"}}> You are logged in! <br /> Logout to Register...</h2>
        </div>
    }
    return <div className="container" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white",
        color: "black",
      }}> 
    <h1 style={{fontSize: "50px", padding: "30px"}}>Register {text}</h1>
    <label>
        <TextInput text={"Email"} handleOnChange={handleEmail} value={email} />
        <TextInput text={"Password"} handleOnChange={handlePassword} value={password} type={"password"} />
    </label>
    <br />
    <button className="submit" onClick={handleRegister}>REGISTER</button>
    <h3>{hasTried ? message : ""}</h3>
    </div>
    
}

export default Register;