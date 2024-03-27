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

function Confirm() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
//   let birthDate = document.getElementById("birthDate");
  let birthDate = getBirthDate();

  let loginInformations = new Logins(
    email.value,
    password.value,
    firstName.value,
    lastName.value,
    birthDate
  );

  if (areInputsField()) {
    if (!validateLength(password)) {
      return true;
    }
    if (!IsItString(password)) {
      return true;
    }
    if (!IsItString(email)) {
      return true;
    }
    if (!IsItString(firstName)) {
      return true;
    }
    if (!IsItString(lastName)) {
      return true;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
      return true;
    }
    let nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    if (!nameRegex.test(firstName.value) || !nameRegex.test(lastName.value)) {
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
}

function Logins(email, password, firstName, lastName, birthDate) {
  this.email = email;
  this.password = password;
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthDate = birthDate;
}

function areInputsField() {
  let inputs = document.querySelectorAll("input");
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      toastr["error"]("Please fill in all the boxes!");
      return false;
    }
  }
  return true;
}

function validateLength(input) {
  let password = input.value;
  if (password.length >= 8) {
    return true;
  }
  toastr["error"]("Your password needs to contain at least 8 characters!");
  return false;
}

function IsItString(input) {
  let x = input.value;
  if (isNaN(x)) {
    return true;
  }
  toastr["error"]("Your validators need to be strings, not numbers!");
  return false;
}

function getBirthDate() {
  let yearSelect = document.getElementById("birthYear");
  let monthSelect = document.getElementById("birthMonth");
  let daySelect = document.getElementById("birthDay");

  let selectedYear = yearSelect.value;
  let selectedMonth = monthSelect.value - 1;
  let selectedDay = daySelect.value;

  let birthDate = new Date(selectedYear, selectedMonth, selectedDay);
  return birthDate.toISOString().slice(0, 10);
}

