// let showButton = document.querySelector("#buttonLogin")
// showButton.addEventListener("click",Show)
// function Show(){
//     alert ("WELCOME")
// }

// showButton.onclick=function(){
//     alert("WELCOME")
// }

// function Show(){
//     let newButton = document.createElement("button");
//     newButton.textContent="My new Button";
//     newButton.onclick=function (){
//         alert("Am dat click")
//     }
//     document.body.appendChild(newButton);
// }

// function Show(){
//     let newButton = document.createElement("button");
//     newButton.textContent="My new Button";
//     newButton.addEventListener("click",AlertFunction)
//     document.body.appendChild(newButton);
// }

// function AlertFunction()
// {
//     alert("Hello!");
// }

// function AlertFunction()
// {
//     let me = new User("adutibi","tibi.radu@gmail.com","Tiberiu","Radu",5)
//     let saveToDatabase = JSON.stringify(me);

//     localStorage.setItem("Test",saveToDatabase);
//     // alert(localStorage.getItem("Test"));
//     let storage = localStorage.getItem("Test");
//     storage=JSON.parse(storage);
//     console.log(storage)
// }

// function User (username,email,firstname,lastname,age)
// {
//     this.username=username;
//     this.email=email;
//     this.firstname=firstname;
//     this.lastname=lastname;
//     this.age=age;
// }

let submit = document.querySelector("#submit");
submit.addEventListener("click", Save);

function Save() {
  let username = document.getElementById("inp_username");
  let email = document.getElementById("inp_email");
  let firstname = document.getElementById("inp_firstname");
  let lastname = document.getElementById("inp_lastname");
  let age = document.getElementById("inp_age");

  let userData = new User(
    username.value,
    email.value,
    firstname.value,
    lastname.value,
    age.value
  );
  // console.log(userData)

  // if(userData.username!="" && userData.email!="")
  if (areInputsField()) {
    let users = [];
    users = JSON.parse(localStorage.getItem("user"));
    // if (!validateInputLength(username))
    //   return true;
    // if (!validateInputLength(email))
    //   return true;
    // if (!validateInputLength(firstname))
    //   return true;
    // if (!validateInputLength(lastname))
    //   return true;

    let boolTest = false;
    boolTest =
      validateInputLength(username) &&
      validateInputLength(email) &&
      validateInputLength(firstname) &&
      validateInputLength(lastname);
    if (!boolTest) {
      return true;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
      return true;
    }
    if (usernameAlreadyExists(username.value)) {
      alert("Username already exists");
      return;
    }
    if (!users) {
      users = [];
    }
    users.push(userData);
    localStorage.setItem("user", JSON.stringify(users));
    clearInputs();
    window.location.href="login.html"
  } else {
    alert("Completati toate campurile!");
  }
}

function clearInputs() {
  let inputs = document.querySelectorAll("input");
  for (i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function areInputsField() {
  let inputs = document.querySelectorAll("input");
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      return false;
    }
  }
  return true;
}

function User(username, email, firstname, lastname, age) {
  this.username = username;
  this.email = email;
  this.firstname = firstname;
  this.lastname = lastname;
  this.age = age;
}

function validateInputLength(input) {
  let value = input.value;
  if (value.length > 3) {
    input.style.border = "1px solid black";
    return true;
  }
  input.style.border = "2px solid red";
  return false;
}

function usernameAlreadyExists(username) {
  let storage = localStorage.getItem("user");
  if (storage) {
    storage = JSON.parse(storage);
    for (let ele of storage) {
      if (ele.username.toLowerCase() == username.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  return false;
}
