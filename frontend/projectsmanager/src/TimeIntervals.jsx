import React, { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import TextInput from "./TextInput";


function TimerInterval(){
    const { setRestTime, setWorkTime } = useContext(AppContext);
    const [changed, setChanged] = useState(false);
    const [submit, setSubmit] = useState(false);

    const handleWorkTime = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setWorkTime(value === "" ? "" : Number(value)*60);
            setSubmit(false);
            setChanged(true);
        }
    }

    const handleRestTime = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
          setRestTime(value === "" ? "" : Number(value)*60);
          setSubmit(false);
          setChanged(true);
        }
    }

    const handleSubmit = () => {
        handleRestTime
        handleWorkTime
        setSubmit(true);
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
    <h1 style={{fontSize: "50px", padding: "30px"}}>Set Time Intervals</h1>
    <h3 style={{fontSize: "20px", padding: "30px"}} >(Minutes)</h3>
    <label>
      <TextInput text={"Work Interval"} handleOnChange={handleWorkTime} maxLength={3} />
      <TextInput text={"Rest Interval"} handleOnChange={handleRestTime} maxLength={3} />
    </label>
    <br />
    <button className="submit" onClick={handleSubmit}>SUBMIT</button>
    {submit && changed ? <h3>Time intervals updated</h3> : ""}
</div>
}

export default TimerInterval;