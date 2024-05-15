// Function to populate year dropdown with a range of years
export function populateYearDropdown(yearSelect) {
    let currentYear = new Date().getFullYear();
    for (let i = currentYear - 18; i >= currentYear - 120; i--) {
      let option = document.createElement("option");
      option.text = i;
      option.value = i;
      yearSelect.add(option);
    }
  }
  
  // Function to populate month dropdown with months 1-12
  export function populateMonthDropdown(monthSelect) {
    for (let i = 1; i <= 12; i++) {
      let option = document.createElement("option");
      option.text = i;
      option.value = i;
      monthSelect.add(option);
    }
  }
  
  // Function to update days dropdown based on selected year and month
  export function updateDaysDropdown(yearSelect, monthSelect, daySelect) {
    let year = parseInt(yearSelect.value);
    let month = parseInt(monthSelect.value);
    let daysInMonth = new Date(year, month, 0).getDate();
  
    daySelect.innerHTML = "";
  
    for (let i = 1; i <= daysInMonth; i++) {
      let option = document.createElement("option");
      option.text = i;
      option.value = i;
      daySelect.add(option);
    }
  }
  
  // Function to retrieve formatted birthdate from dropdowns
  export function getBirthDate(yearSelect, monthSelect, daySelect) {
    let year = yearSelect.value;
    let month = monthSelect.value.padStart(2, "0");
    let day = daySelect.value.padStart(2, "0");
    return `${year}-${month}-${day}`;
  }