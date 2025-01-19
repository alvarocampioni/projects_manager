import React, { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import TextInput from "./TextInput";


function TimerInterval(){
    const { setRestTime, setWorkTime } = useContext(AppContext);

    const handleWorkTime = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setWorkTime(value === "" ? "" : Number(value)*60);
        }
    }

    const handleRestTime = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
          setRestTime(value === "" ? "" : Number(value)*60);
        }
    }

    const handleSubmit = () => {
        handleRestTime
        handleWorkTime
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
</div>
}

export default TimerInterval;