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
  let nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  let loginInformations = new Logins(
    email,
    password,
    firstName,
    lastName,
    birthDate,
    ""
  );
  // validations
  if (!areInputsField()) {
    return false;
  }
  if (checkDuplicateEmail(email)) {
    toastr["error"](
      "Looks like the e-mail is already taken, please choose another e-mail"
    );
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
  if (!emailRegex.test(email)) {
    toastr["error"]("Please enter a valid email adress.");
    return false;
  }
  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    toastr["error"]("Please enter only letters for first and last name!");
    return false;
  }
  let loginInfo = [];
  loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  if (!loginInfo) {
    loginInfo = [];
  }
  loginInfo.push(loginInformations);
  localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
  toastr["success"]("Success", "Congratulations, you now have an account!");
  setTimeout(function(){
    window.location.href = "login.html";
  }, 5000);
}

function Logins(email, password, firstName, lastName, birthDate, apartments) {
  this.email = email;
  this.password = password;
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthDate = birthDate;
  this.apartments = apartments;
}

// validation for all inputs to have something inside

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

// validation for character length to be minimum 8

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
  for (let i = currentYear - 18; i >= currentYear - 120; i--) {
    let option = document.createElement("option");
    option.text = i;
    option.value = i;
    yearSelect.add(option);
  }
  for (let i = 1; i <= 12; i++) {
    let option = document.createElement("option");
    option.text = i;
    option.value = i;
    monthSelect.add(option);
  }

  // dinamically select the day

  function updateDays() {
    let year = parseInt(yearSelect.value);
    let month = parseInt(monthSelect.value);
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    let currentDay = new Date().getDate();
    // calculate minimum age to be 18
    let minBirthYear = currentYear - 18;
    if (month > currentMonth || (month == currentMonth && currentDay > 1)) {
      minBirthYear -= 1; // if birthday month hasnt passed yet, ask the user to be 1 year older;
    }
    let maxBirthYear = currentYear - 120;
    if (year < maxBirthYear) {
      year = maxBirthYear;
    } else if (year > minBirthYear) {
      year = minBirthYear;
    }

    let daysInMonth = new Date(year, month, 0).getDate();
    daySelect.innerHTML = "";

    for (let i = 1; i <= daysInMonth; i++) {
      let option = document.createElement("option");
      option.text = i;
      option.value = i;
      console.log(month, currentMonth);
      if (year == minBirthYear && month > currentMonth) {
        //disable options for earlier months than propper 18 age
        option.disabled = true;
      }
      if (year == minBirthYear && month == currentMonth && i > currentDay) {
        // disable options for earlier days than propper 18 age
        option.disabled = true;
      }
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
  month = month.padStart(2, "0");
  day = day.padStart(2, "0");
  return year + "-" + month + "-" + day;
}

// check email

function checkDuplicateEmail(email) {
  let loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  let duplicate = loginInfo.some(function (user) {
    return user.email === email;
  });
  return duplicate;
}
