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

// DOM elements

let cityName = document.getElementById("addCity");
let streetName = document.getElementById("addStreetName");
let streetNumber = document.getElementById("addStreetNumber");
let areaSize = document.getElementById("addAreaSize");
let acExists = document.getElementById("addYesCheckbox");
let buildingYear = document.getElementById("addYearBuilt");
let rentPrice = document.getElementById("addRentPrice");
let avaDate = document.getElementById("addDateAvailable");
let myProfileButton = document.getElementById("myProfile");
let viewFlats = document.getElementById("viewFlats");
let passwordChangeForm = document.getElementById("passwordChangeForm");
let uniqueIdCounter = 0;
let favouritesButton = document.getElementById("favourites");

// display add new flat form

function addFlat() {
  addContainer.style.display = "block";
}

// hide the add new flat form and clear input fields

function closeAddFlat() {
  addContainer.style.display = "none";
  cityName.value = "";
  streetName.value = "";
  streetNumber.value = "";
  areaSize.value = "";
  acExists.value = "";
  buildingYear.value = "";
  rentPrice.value = "";
  avaDate.value = "";
}

// save apartment data

function Save() {
  let currentUser = getLoggedInUser();

  // validators

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

  // construct apartment object

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

  // check for duplicate apartments
  if (isDuplicateApartment(newApartment)) {
    if (
      confirm(
        "Oops! It seems you've already saved this apartment. Do you want to proceed and save a duplicate?"
      )
    ) {
      saveApartment(newApartment);
    } else {
      toastr["info"]("No changes were made.");
    }
  } else {
    saveApartment(newApartment);
  }
  // create a new row in the table after adding a new flat
  let existingTable = document.getElementById("apartmentTable");
  if (existingTable) {
    removeApartmentTable();
    createApartmentTable();
  }
  closeAddFlat();
}

// save the apartment data to localStorage

function saveApartment(apartment) {
  let currentUser = getLoggedInUser();
  loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  let currentUserInfo = loginInfo.find((x) => x.email == currentUser);
  if (currentUserInfo && apartment) {
    currentUserInfo.apartments = currentUserInfo.apartments || [];
    currentUserInfo.apartments.push(apartment);
  }
  localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
  toastr["success"]("Apartment successfully saved.");
}

// generate unique id for each apartment

function generateUniqueId() {
  let currentUser = getLoggedInUser();
  let loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  let maxId = 0;
  loginInfo.forEach((userInfo) => {
    if (userInfo.email === currentUser && userInfo.apartments) {
      userInfo.apartments.forEach((apartment) => {
        const id = parseInt(apartment.apartmentId);
        if (id > maxId) {
          maxId = id;
        }
      });
    }
  });
  maxId++;
  return maxId.toString();
}

// apartment constructor function

function List(
  cityName,
  streetName,
  streetNumber,
  areaSize,
  acExists,
  buildingYear,
  rentPrice,
  avaDate,
  favourite
) {
  this.cityName = cityName;
  this.streetName = streetName;
  this.streetNumber = streetNumber;
  this.areaSize = areaSize;
  this.acExists = acExists;
  this.buildingYear = buildingYear;
  this.rentPrice = rentPrice;
  this.avaDate = avaDate;
  this.favourite = favourite;
  this.apartmentId = generateUniqueId();
}

// get the currently logged in user

function getLoggedInUser() {
  let loggedInUserString = localStorage.getItem("loggedInUser");
  if (loggedInUserString) {
    return JSON.parse(loggedInUserString);
  } else {
    return null;
  }
}

// log out the current user

function logoutUser() {
  localStorage.removeItem("loggedInUser");
}

// logout button

let logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", function () {
  logoutUser();
  window.location.href = "login.html";
});

// validate if all input fields have values

function areInputsField() {
  let inputs = document.querySelectorAll("#addFlat input");
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() == "") {
      toastr["error"]("Please fill in all the fields.");
      return false;
    }
  }
  return true;
}

// check if input is a number

function isNumber(input) {
  return !isNaN(input);
}

// check if the year built is a valid year

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

// check if the new apartment is a duplicate

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

// create a new table row for an apartment

function createApartmentRow(tableBody, apartment) {
  let row = tableBody.insertRow();
  Object.entries(apartment).forEach(([key, value]) => {
    if (key == "apartmentId") {
      return;
    }
    let cell = row.insertCell();
    if (key == "acExists") {
      // change true / false from ac to yes / no
      cell.textContent = value ? "Yes" : "Sadge";
    } // reformat date
    else if (key == "avaDate") {
      let [year, month, day] = value.split("-");
      let formattedDate = `${day}-${month}-${year}`;
      cell.textContent = formattedDate;
    } // add $ sign
    else if (key == "rentPrice") {
      cell.textContent = value + "$";
    } // add star icon / replace
    else if (key == "favourite") {
      let starIcon = document.createElement("span");
      starIcon.classList.add("star-icon");
      starIcon.innerHTML = value ? "&#9733;" : "&#9734;";
      cell.appendChild(starIcon);
      starIcon.addEventListener("click", function () {
        apartment.favourite = !apartment.favourite;
        starIcon.innerHTML = apartment.favourite ? "&#9733;" : "&#9734;";
        updateFavouriteStatus(apartment.apartmentId, apartment.favourite);
      });
    } else {
      cell.textContent = value;
    }
  });

  // add delete button

  let deleteCell = row.insertCell();
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete__button");

  // set a delete button to each unique id of your list

  deleteButton.dataset.apartmentId = apartment.apartmentId;
  deleteCell.appendChild(deleteButton);

  // delete row from table when you delete an apartment

  deleteButton.addEventListener("click", function () {
    let apartmentId = deleteButton.dataset.apartmentId;
    let modal = document.getElementById("deleteConfirmationModal");
    modal.style.display = "block";

    document
      .getElementById("confirmDeleteBtn")
      .addEventListener("click", function () {
        if (deleteApartment(apartmentId)) {
          tableBody.removeChild(row);
        }
        modal.style.display = "none";
      });
    document
      .getElementById("cancelDeleteBtn")
      .addEventListener("click", function () {
        modal.style.display = "none";
      });
  });
}

// create a row for each apartment saved

function createApartmentRows(tableBody, apartments) {
  apartments.forEach((apartment) => {
    createApartmentRow(tableBody, apartment);
  });
}

// create the table

let currentTable = null;
let currentFavouritesTable = null;

function createApartmentTable(filterFavourites = false) {
  removeApartmentTable();

  let table = document.createElement("table");
  table.id = "apartmentTable";
  table.classList.add("apartment__table");

  // create the table head

  let tableHead = table.createTHead().insertRow();
  let headers = [
    { text: "City Name", sortBy: "cityName" },
    { text: "Street Name", sortBy: "streetName" },
    { text: "Street Number", sortBy: "streetNumber" },
    { text: "Area Size", sortBy: "areaSize" },
    { text: "Does it have AC?", sortBy: "acExists" },
    { text: "Building Year", sortBy: "buildingYear" },
    { text: "Rent Price", sortBy: "rentPrice" },
    { text: "Date Available", sortBy: "avaDate" },
    { text: "Favourite", sortBy: "favourite" },
    { text: "Delete", sortBy: null },
  ];

  // create table header

  headers.forEach((header) => {
    let th = document.createElement("th");
    th.textContent = header.text;
    tableHead.appendChild(th);
    if (["cityName", "rentPrice", "areaSize"].includes(header.sortBy)) {
      let sortArrows = document.createElement("span");
      sortArrows.classList.add("sort-arrows");

      let upArrow = document.createElement("span");
      upArrow.classList.add("sort-arrow", "up-arrow");
      upArrow.innerHTML = "&#9650;"; // Up arrow symbol

      let downArrow = document.createElement("span");
      downArrow.classList.add("sort-arrow", "down-arrow");
      downArrow.innerHTML = "&#9660;"; // Down arrow symbol

      upArrow.addEventListener("click", function () {
        sortTable(header.sortBy, true);
      });

      downArrow.addEventListener("click", function () {
        sortTable(header.sortBy, false);
      });

      sortArrows.appendChild(upArrow);
      sortArrows.appendChild(downArrow);
      th.appendChild(sortArrows);
    }
  });

  // create table body

  let tableBody = table.createTBody();
  let loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    toastr["error"]("No user logged in!");
    return;
  }

  let currentUserInfo = loginInfo.find((user) => user.email == loggedInUser);

  if (
    !currentUserInfo ||
    !currentUserInfo.apartments ||
    currentUserInfo.apartments.length == 0
  ) {
    toastr["info"]("Please add some apartments first!");
    addFlat();
    return;
  }

  let apartmentsToDisplay = currentUserInfo.apartments;

  if (filterFavourites) {
    apartmentsToDisplay = apartmentsToDisplay.filter(
      (apartment) => apartment.favourite
    );
  }

  createApartmentRows(tableBody, apartmentsToDisplay);
  document.body.appendChild(table);

  // remember what kind of table im showing

  if (filterFavourites) {
    currentFavouritesTable = table;
  } else {
    currentTable = table;
  }
  document.getElementById("viewFlatsContainer").appendChild(table);
}

function sortTable(sortBy, ascending) {
  let loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    toastr["error"]("No user logged in!");
    return;
  }

  let currentUserInfo = loginInfo.find((user) => user.email == loggedInUser);
  if (
    !currentUserInfo ||
    !currentUserInfo.apartments ||
    currentUserInfo.apartments.length == 0
  ) {
    toastr["info"]("Please add some apartments first!");
    addFlat();
    return;
  }

  currentUserInfo.apartments.sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === "rentPrice" || sortBy === "areaSize") {
      aValue = parseFloat(aValue.replace("$", ""));
      bValue = parseFloat(bValue.replace("$", ""));
    }

    if (ascending) {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Update localStorage with the sorted apartments
  localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

  // Re-create the table to reflect the sorted data
  createApartmentTable();
}

welcomeMessage();

function removeApartmentTable() {
  if ((passwordChangeForm.style.display = "block")) {
    passwordChangeForm.style.display = "none";
  }
  if (currentTable) {
    currentTable.remove();
    currentTable = null;
  }
  if (currentFavouritesTable) {
    currentFavouritesTable.remove();
    currentFavouritesTable = null;
  }
}

let currentTableType = null;

function viewFlatsButtonClick() {
  if (passwordChangeForm.style.display == "block") {
    passwordChangeForm.style.display = "none";
  }
  if (currentTableType == "all") {
    removeApartmentTable();
    currentTableType = null;
  } else {
    createApartmentTable();
    currentTableType = "all";
  }
}

function favouritesButtonClick() {
  if (passwordChangeForm.style.display == "block") {
    passwordChangeForm.style.display = "none";
  }
  if (currentTableType == "favourites") {
    removeApartmentTable();
    currentTableType = null;
  } else {
    createApartmentTable(true);
    currentTableType = "favourites";
  }
}

viewFlats.addEventListener("click", viewFlatsButtonClick);
favouritesButton.addEventListener("click", favouritesButtonClick);

function deleteApartment(apartmentId) {
  let currentUser = getLoggedInUser();
  let loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  let currentUserInfo = loginInfo.find((x) => x.email == currentUser);
  if (currentUserInfo) {
    let index = currentUserInfo.apartments.findIndex(
      (apartment) => apartment.apartmentId == apartmentId
    );
    if (index != -1) {
      currentUserInfo.apartments.splice(index, 1);
      localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
      toastr["success"]("Apartment successfully deleted.");
      return true;
    }
  }
  toastr["error"]("Failed to delete apartment.");
  return false;
}

// save favourite prefference to localstorage

function updateFavouriteStatus(apartmentId, favouriteStatus) {
  let currentUser = getLoggedInUser();
  let loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  let currentUserInfo = loginInfo.find((x) => x.email == currentUser);
  if (currentUserInfo) {
    let apartmentIndex = currentUserInfo.apartments.findIndex(
      (apartment) => apartment.apartmentId == apartmentId
    );
    if (apartmentIndex != -1) {
      currentUserInfo.apartments[apartmentIndex].favourite = favouriteStatus;
      localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
    }
  }
}

// display welcome message

function welcomeMessage() {
  let loggedInUser = getLoggedInUser();
  if (loggedInUser) {
    let loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
    let currentUserInfo = loginInfo.find((x) => x.email == loggedInUser);
    if (currentUserInfo) {
      document.getElementById("newPassword").value = currentUserInfo.password;
      document.getElementById("newRepeatPassword").value =
        currentUserInfo.password;
      document.getElementById("newFirstName").value = currentUserInfo.firstName;
      document.getElementById("newLastName").value = currentUserInfo.lastName;
      document.getElementById("newBirthDate").value = currentUserInfo.birthDate;
      let welcomeSpan = document.getElementById("welcomeUser");
      if (welcomeSpan) {
        welcomeSpan.textContent =
          "Welcome, " +
          currentUserInfo.lastName +
          " " +
          currentUserInfo.firstName +
          "!";
      }
    }
  }
}

// My Profile Button

function profileButtonClick() {
  if (passwordChangeForm.style.display != "block") {
    removeApartmentTable();
    currentTableType = null;
    passwordChangeForm.style.display = "block";
  } else {
    passwordChangeForm.style.display = "none";
  }
}

myProfileButton.addEventListener("click", profileButtonClick);

function changeInfo() {
  let newPassword = document.getElementById("newPassword").value;
  let repeatPassword = document.getElementById("newRepeatPassword").value;
  let newFirstName = document.getElementById("newFirstName").value;
  let newLastName = document.getElementById("newLastName").value;
  let newBirthDate = document.getElementById("newBirthDate").value;

  if (newPassword != repeatPassword) {
    toastr["error"]["Passwords do not match. Please try again."];
  }

  let loggedInUser = getLoggedInUser();
  let loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  let currentUserInfo = loginInfo.find((user) => user.email === loggedInUser);

  if (currentUserInfo) {
    // update user`s info with the new values
    currentUserInfo.password = newPassword;
    currentUserInfo.firstName = newFirstName;
    currentUserInfo.lastName = newLastName;
    currentUserInfo.birthDate = newBirthDate;
    // update info in storage
    localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
    toastr["success"]("Information updated successfully.");
  } else {
    toastr["error"]("User information not found.");
  }
}

function toggleActiveState(button) {
  button.classList.toggle("active");
  let buttons = document.querySelectorAll(".button");
  buttons.forEach((btn) => {
    if (btn != button) {
      btn.classList.remove("active");
    }
  });
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const icon = input.nextElementSibling.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.className = "fas fa-eye-slash";
  } else {
    input.type = "password";
    icon.className = "fas fa-eye";
  }
}

// burger menu

function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("active");
}
