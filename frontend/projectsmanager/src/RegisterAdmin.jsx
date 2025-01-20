import { useContext } from "react";
import Register from "./Register";
import { AppContext } from "./AppContext";


function RegisterAdmin( { registerFunction, text } ){
    const { token, isLogged } = useContext(AppContext);
    if(isLogged) return <Register registerFunction={registerFunction} text={text} token={token}/>
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

export default RegisterAdmin;