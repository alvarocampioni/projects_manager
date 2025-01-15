import React, { useContext, useState } from "react";
import { AppContext } from "./AppContext";


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
        <input type="number" placeholder="Work Interval" name="text" className="input" maxLength={3} onChange={handleWorkTime} />
        <br />
        <br />
        <input type="number" placeholder="Rest Interval" name="text" className="input" maxLength={3} onChange={handleRestTime} />
    </label>
    <br />
    <button className="add" onClick={handleSubmit}>SUBMIT</button>
</div>
}

export default TimerInterval;