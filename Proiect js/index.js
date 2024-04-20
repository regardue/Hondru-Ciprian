toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-center",
  preventDuplicates: false,
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
// toastr["error"]("Error", "My error message");
// toastr["info"]("Info", "My info message");
// toastr["success"]("Success", "My Success message");
// toastr["warning"]("Info", "My warning message");

let cityName = document.getElementById("addCity");
let streetName = document.getElementById("addStreetName");
let streetNumber = document.getElementById("addStreetNumber");
let areaSize = document.getElementById("addAreaSize");
let acExists = document.getElementById("addYesCheckbox");
let buildingYear = document.getElementById("addYearBuilt");
let rentPrice = document.getElementById("addRentPrice");
let avaDate = document.getElementById("addDateAvailable");

function addFlat(){ // add new flat button
  addNewFlat.style.display = "block";
}

function closeAddFlat(){ // close button for popup
  addNewFlat.style.display = "none";
}

function Save() {
  let currentUser = getLoggedInUser();
  if (!currentUser) {
    console.error("No user is currently logged in!");
    return;
  }
  if (!areInputsField()) {
    return false;
  }
  if (isNumber(cityName.value)) {
    toastr["error"]("City must not be a number!");
    return false;
  }
  if (isNumber(streetName.value)) {
    toastr["error"]("Street name must not be a number!");
    return false;
  }
  if (!isNumber(streetNumber.value)) {
    toastr["error"]("Street number must be a number!");
    return false;
  }
  if (!isNumber(areaSize.value)) {
    toastr["error"]("Area size must be a number!");
    return false;
  }
  if (!isNumber(buildingYear.value)) {
    toastr["error"]("Year built must be a number!");
    return false;
  }
  if (!yearCheck(buildingYear.value)) {
    toastr["error"]("Building must be built in the last millennia!");
    return false;
  }
  if (!isNumber(rentPrice.value)) {
    toastr["error"]("Rent price must be a number!");
    return false;
  }
  let newApartment = new List(
    cityName.value,
    streetName.value,
    streetNumber.value,
    areaSize.value,
    acExists.checked,
    buildingYear.value,
    rentPrice.value,
    avaDate.value,
    false
  );
  capitalFirstLetter(newApartment, "cityName");
  capitalFirstLetter(newApartment, "streetName");
  if (isDuplicateApartment(newApartment)) { // do i want duplicates? yes/no
    // toastr["error"]("Oops! It seems you've already saved this apartment.");
    // return false;
    if (
      confirm("Oops! It seems you've already saved this apartment. Do you want to proceed and save a duplicate?")
    ) {
      saveApartment(newApartment);
    } else {
      toastr["info"]("No changes were made.");
    }
  } else {
    saveApartment(newApartment);
  }
}

// save the apartment in your list

function saveApartment(apartment) {
  let currentUser = getLoggedInUser();
  loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  let currentUserInfo = loginInfo.find((user) => user.email == currentUser);
  if (currentUserInfo) {
    currentUserInfo.apartments = currentUserInfo.apartments || [];
    currentUserInfo.apartments.push(apartment);
  }
  localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
  toastr["success"]("Apartment successfully saved.");
}

function List(cityName, streetName, streetNumber, areaSize, acExists, buildingYear, rentPrice, avaDate, favourite) {
  this.cityName = cityName;
  this.streetName = streetName;
  this.streetNumber = streetNumber;
  this.areaSize = areaSize;
  this.acExists = acExists;
  this.buildingYear = buildingYear;
  this.rentPrice = rentPrice;
  this.avaDate = avaDate;
  this.favourite = favourite;
}

function getLoggedInUser() {
  return localStorage.getItem("loggedInUser");
}

// log out of the current user

function logoutUser() {
  localStorage.removeItem("loggedInUser");
}

// logout button

let logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", function () {
  logoutUser();
  window.location.href = "login.html";
});

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

// validation for being a number

function isNumber(input) {
  return !isNaN(input);
}

// year built to be an actual year

function yearCheck(input) {
  let currentYear = new Date().getFullYear();
  if (!isNaN(input) && input >= 1000 && input <= currentYear) {
    return true;
  }
}

// capital letter for names

function capitalFirstLetter(object, property) {
  if (object[property] && typeof object[property] === "string") {
    object[property] = object[property].replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }
}

// make a new apartment, check if its the same as the last one

function isDuplicateApartment(newApartment) {
  let loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  let currentUser = getLoggedInUser();
  if (loginInfo.length > 0) {
    let currentUserInfo = loginInfo.find((user) => user.email == currentUser);
    if (currentUserInfo && currentUserInfo.apartments) {
      for (let i = 0; i < currentUserInfo.apartments.length; i++) {
        let existingApartment = currentUserInfo.apartments[i];
        if (
          existingApartment.cityName == newApartment.cityName &&
          existingApartment.streetName == newApartment.streetName &&
          existingApartment.streetNumber == newApartment.streetNumber &&
          existingApartment.areaSize == newApartment.areaSize &&
          existingApartment.acExists == newApartment.acExists &&
          existingApartment.buildingYear == newApartment.buildingYear &&
          existingApartment.rentPrice == newApartment.rentPrice &&
          existingApartment.avaDate == newApartment.avaDate
        ) {
          return true; // duplicate found
        }
      }
    }
  }
  return false; // no duplicate found
}
