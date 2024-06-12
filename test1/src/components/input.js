import { useState } from "react";

function Input() {
  const [validationMessage, setValidationMessage] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  function Validate(event) {
    console.log(event.target.value);
    let inputData = event.target.value;
    if (inputData.includes(`@`)) {
    //   setValidationMessage("Email corect!");
      setShowValidation(false);
    } else {
      setValidationMessage("Email incorect!");
      setShowValidation(true);
    }
  }
  return (
    <>
      <input type="text" onChange={Validate}></input>
      {/* <p>{validationMessage}</p> */}
      <p>{showValidation?validationMessage:""}</p>
    </>
  );
}

export default Input;
