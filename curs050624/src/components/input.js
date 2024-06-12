import { useState } from "react";

function Input(){
    function Validate(event){
        const [validationMessage, setValidationMessage]
        console.log(event.target.value)
    }
    return{
        <>
        <input type="text" onChange={Validate}></input>
        <p></p>

        </>
    }
}

export default Input;