import { useContext } from "react";
import Register from "./Register";
import { AppContext } from "./AppContext";


function RegisterAdmin( { registerFunction, text } ){
    const { token } = useContext(AppContext);
    return <Register registerFunction={registerFunction} text={text} token={token}/>
}

export default RegisterAdmin;