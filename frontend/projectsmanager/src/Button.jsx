import React from "react"

function ButtonInput({ text, handleOnClick, className, color }) {
    return <button className={className} onClick={handleOnClick} style={{color: {color}}}>{text}</button>
}

export default ButtonInput;