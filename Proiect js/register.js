toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: "toast-top-center",
  preventDuplicates: true,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

let submit = document.getElementById("submit");
submit.addEventListener("click", Confirm);
let yearSelect = document.getElementById("birthYear");
let monthSelect = document.getElementById("birthMonth");
let daySelect = document.getElementById("birthDay");

function Confirm() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let birthDate = getBirthDate();

  let loginInformations = new Logins(
    email,
    password,
    firstName,
    lastName,
    birthDate
  );

  if (!areInputsField()) {
    return false;
  }
  if(checkDuplicateEmail(email)){
    toastr["error"]("Looks like the e-mail is already taken, please choose another e-mail");
    return false;
  }
  if (password !== confirmPassword) {
    toastr["error"]("Passwords do not match.");
    return false;
  }
  if (!validateLength(password)) {
    return false;
  }
  if (!IsItString(firstName)) {
    return false;
  }
  if (!IsItString(lastName)) {
    return false;
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    toastr["error"]("Please enter a valid email adress.");
    return false;
  }
  let nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    toastr["error"]("Please enter only letters for first and last name!");
    return false;
  }
  let loginInfo = [];
  loginInfo = JSON.parse(localStorage.getItem("storage"));
  if (!loginInfo) {
    loginInfo = [];
  }
  loginInfo.push(loginInformations);
  localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
  toastr["success"]("Success", "Congratulations, you now have an account!");
  window.location.href = "login.html";
}

function Logins(email, password, firstName, lastName, birthDate) {
  this.email = email;
  this.password = password;
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthDate = birthDate;
}

// validare pentru ca toate campurile sa contina ceva

function areInputsField() {
  let inputs = document.querySelectorAll("input");
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === "") {
      toastr["error"]("Please fill in all the fields.");
      return false;
    }
  }
  return true;
}

// validare pentru lungimea de minim 8 charactere

function validateLength(input) {
  if (input.length >= 8) {
    return true;
  }
  toastr["error"]("Your password must contain at least 8 characters.");
  return false;
}

function IsItString(input) {
  if (isNaN(input)) {
    return true;
  }
  toastr["error"]("Your validators need to be strings, not numbers.");
  return false;
}

// dropdown for birthday between 18 and 120 years

document.addEventListener("DOMContentLoaded", function () {
  let currentYear = new Date().getFullYear();
  for (i = currentYear - 18; i >= currentYear - 120; i--) {
    let option = document.createElement("option");
    option.text = i;
    option.value = i;
    yearSelect.add(option);
  }
  for (i = 1; i <= 12; i++) {
    let option = document.createElement("option");
    option.text = i;
    option.value = i;
    monthSelect.add(option);
  }
// dinamically select the day
  function updateDays() {
    let year = parseInt(yearSelect.value);
    let month = parseInt(monthSelect.value);
    let daysInMonth = new Date(year, month, 0).getDate();
    daySelect.innerHTML = "";
    for (i = 1; i <= daysInMonth; i++) {
      let option = document.createElement("option");
      option.text = i;
      option.value = i;
      daySelect.add(option);
    }
  }
  yearSelect.addEventListener("change", updateDays);
  monthSelect.addEventListener("change", updateDays);
});
// add your birthdate dropdown to localstorage, adding a 0 if there is a single digit number
function getBirthDate() {
  let year = document.getElementById("birthYear").value;
  let month = document.getElementById("birthMonth").value;
  let day = document.getElementById("birthDay").value;
  // pad month and day leading with 0 if necessary
  month = month.padStart(2,'0');
  day = day.padStart(2, '0');
  return year + "-" + month + "-" + day;
}
// check email
function checkDuplicateEmail(email){
  let loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  let duplicate = loginInfo.some(function(user){
    return user.email === email;
  })
  return duplicate;
}

