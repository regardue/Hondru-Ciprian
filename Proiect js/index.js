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
let myProfileButton = document.getElementById("myProfile");
let viewFlats = document.getElementById("viewFlats")
let passwordChangeForm = document.getElementById("passwordChangeForm");
let uniqueIdCounter = 0;
welcomeMessage();

function addFlat() {
  // add new flat button
  addContainer.style.display = "block";
}

function closeAddFlat() {
  // close button for popup
  addContainer.style.display = "none";
  // clear inputs
  cityName.value = "";
  streetName.value = "";
  streetNumber.value = "";
  areaSize.value = "";
  acExists.value = "";
  buildingYear.value = "";
  rentPrice.value = "";
  avaDate.value = "";
}

// make the add flats button

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
  if (isDuplicateApartment(newApartment)) {
    // do i want duplicates? yes/no
    // toastr["error"]("Oops! It seems you've already saved this apartment.");
    // return false;
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
  // create new row in the table after you add a new flat
  let existingTable = document.getElementById("apartmentTable");
  if (existingTable) {
    removeApartmentTable();
    createApartmentTable();
  }
  closeAddFlat();
}

// save the apartment in your list

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
  let inputs = document.querySelectorAll("#addFlat input");
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() == "") {
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

// make the view flats button functionability

// create one table row

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
    if (deleteApartment(apartmentId)) {
      tableBody.removeChild(row);
    }
  });
}

// create a row for each apartment saved

function createApartmentRows(tableBody, apartments) {
  apartments.forEach((apartment) => {
    createApartmentRow(tableBody, apartment);
  });
}

// create the table

function createApartmentTable() {
  let table = document.createElement("table");
  table.id = "apartmentTable";
  table.classList.add("apartment__table");

  // create the table head

  let tableHead = table.createTHead().insertRow();
  let headers = [
    "City Name",
    "Street Name",
    "Street Number",
    "Area Size",
    "Does it have AC?",
    "Building Year",
    "Rent Price",
    "Date Available",
    "Favourite",
    "Delete",
  ];

  //

  headers.forEach((headerText) => {
    let th = document.createElement("th");
    th.textContent = headerText;
    tableHead.appendChild(th);
  });

  // create table body

  let tableBody = table.createTBody();
  let loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  // console.log(loginInfo.apartments)
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
  let loggedUserData = loginInfo.find((user) => user.email == loggedInUser)
  if(loggedUserData.apartments.length == 0){
    // console.log("xyx")
    addFlat();
    return;
  }
  loginInfo.forEach((user) => {createApartmentRows(tableBody, user.apartments);
  });
  document.body.appendChild(table);
}

function removeApartmentTable() {
  let table = document.getElementById("apartmentTable");
  if (table) {
    table.remove();
  }
}

function viewFlatsButtonClick() {
  let table = document.getElementById("apartmentTable");
  if (!table) {
    createApartmentTable();
    passwordChangeForm.style.display = "none";
  }
  else{
    removeApartmentTable();
  }
}

viewFlats.addEventListener("click", viewFlatsButtonClick);

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
      let welcomeButton = document.getElementById("welcomeUser");
      if (welcomeButton) {
        welcomeButton.textContent =
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

function profileButtonClick(){
  if (passwordChangeForm.style.display != "flex"){
    passwordChangeForm.style.display = "flex";
    removeApartmentTable();
  }
  else{
    passwordChangeForm.style.display = "none";
  }
}

myProfileButton.addEventListener("click", profileButtonClick);

