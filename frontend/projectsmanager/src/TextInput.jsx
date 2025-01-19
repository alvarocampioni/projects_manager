import React from "react";

function TextInput({ text, handleOnChange, value, maxLength, type }){
    return<form>
        <br />
        <input
          type={type || "text"}
          placeholder={text}
          name="text"
          className="input"
          value={value}
          onChange={handleOnChange}
          maxLength={maxLength}
        />
        <br />
    </form>
}

export default TextInput;