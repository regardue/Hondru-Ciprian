import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("default");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  function Email(event) {
    if (event.target.value.length < 5) {
      setEmail("Email-ul este prea scut.");
    } else {
      setEmail("");
    }
  }
  function Password(event) {
    if (event.target.value.length < 5) {
      setPassword("Parola este prea scuta.");
    } else {
      setPassword("");
    }
  }
  function Name(event) {
    if (event.target.value.length < 5) {
      setName("Numele este prea scut.");
    } else {
      setName("");
    }
  }
  function Surname(event) {
    if (event.target.value.length < 5) {
      setSurname("Prenumele este prea scut.");
    } else {
      setSurname("");
    }
  }
  function ButtonRegister() {
    if (!email && !password && !name && !surname) {
      alert("Butonul merge!");
    } else {
      alert("Butonul nu merge!");
    }
  }
  return (
    <div className="mainContainer">
      <div>
        <h3>Email</h3>
        <input type="text" onChange={Email}></input>
        <p>{email == "default" ? "" : email}</p>
      </div>
      <div>
        <h3>Password</h3>
        <input type="text" onChange={Password}></input>
        <p>{password}</p>
      </div>
      <div>
        <h3>Name</h3>
        <input type="text" onChange={Name}></input>
        <p>{name}</p>
      </div>
      <div>
        <h3>Surname</h3>
        <input type="text" onChange={Surname}></input>
        <p>{surname}</p>
      </div>
      <div>
        <button onClick={() => ButtonRegister()}>Register</button>
      </div>
    </div>
  );
}

export default Register;
