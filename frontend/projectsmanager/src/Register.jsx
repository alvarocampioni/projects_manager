import React, { useContext, useState } from "react";
import { register } from "./services/AuthService";
import { AppContext } from "./AppContext";

function Register(){
    const [message, setMessage] = useState('');
    const [hasTried, setHasTried] = useState(false);
    const [registed, setRegistered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLogged } = useContext(AppContext);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleRegister = async () => {
        const data = {email, password, role: "USER"};
        let newMessage = await register(data)
        
        setMessage(newMessage);
        if(newMessage.includes("Successful")){
            setRegistered(true);
        } else {
            setRegistered(false);
        }
        console.log(message)
        setHasTried(true);
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
    <h1 style={{fontSize: "50px", padding: "30px"}}>Register</h1>
    <label>
        <input type="email" placeholder="Email" name="text" className="input" value={email} onChange={handleEmail} />
        <br />
        <br />
        <input type="text" placeholder="Password" name="text" className="input" value={password} onChange={handlePassword} />
    </label>
    <br />
    <button className="add" onClick={handleRegister}>REGISTER</button>
    <h3>{hasTried ? message : ""}</h3>
    </div>
    
}

export default Register;