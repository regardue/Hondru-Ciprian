toastr.options = {
  closeButton: false,
  debug: true,
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

let cityInfo = document.getElementById("addCity");
let streetName = document.getElementById("addStreetName");
let streetNumber = document.getElementById("addStreetNumber");
let areaSize = document.getElementById("addAreaSize");
let acExists = document.getElementById("addYesCheckbox");
let buildingYear = document.getElementById("addYearBuilt");
let rentPrice = document.getElementById("addRentPrice");
let avaDate = document.getElementById("addDateAvailable");

function Save(){
  let currentUser = getLoggedInUser();
  if(!currentUser){
    console.error("No user is currently logged in!");
    return;
  }
  let apartment = new List(cityInfo.value, streetName.value, streetNumber.value, areaSize.value, acExists.checked, buildingYear.value, rentPrice.value, avaDate.value);
  loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || [];
  let currentUserInfo = loginInfo.find(user => user.email == currentUser);
  if(currentUserInfo){
    currentUserInfo.apartments = currentUserInfo.apartments || [];
    currentUserInfo.apartments.push(apartment);
  }
  localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
  toastr["success"]("Apartment successfully saved.")
}

function List(cityInfo, streetName, streetNumber, areaSize, acExists, buildingYear, rentPrice, avaDate){
  this.cityInfo = cityInfo;
  this.streetName = streetName;
  this.streetNumber = streetNumber;
  this.areaSize = areaSize;
  this.acExists = acExists;
  this.buildingYear = buildingYear;
  this.rentPrice = rentPrice;
  this.avaDate = avaDate;
}

function getLoggedInUser(){
  return localStorage.getItem("loggedInUser")
}

// log out of the current user

function logoutUser(){ 
  localStorage.removeItem("loggedInUser");
}

// logout button 

let logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", function(){
  logoutUser();
  window.location.href = "login.html";
});