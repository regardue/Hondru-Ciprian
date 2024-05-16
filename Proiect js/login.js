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

let login = document.getElementById("login");
login.addEventListener("click", submit);
let email = document.getElementById("email");
let password = document.getElementById("password");

function submit() {
  let loginInfo = localStorage.getItem("loginInfo");
  loginInfo = JSON.parse(loginInfo);
  //   console.log(loginInfo);
  let user = loginInfo.filter(
    (x) => x.email == email.value && x.password == password.value
  );
  // console.log(user);
  if (user.length > 0) {
    // console.log("Login Succesful!");
    toastr["success"]("Success", "Welcome to our RentEase");
    loginUser(user[0].email);
    setTimeout(function () {
      window.location.href = "index.html";
    }, 5000);
  } else {
    toastr["error"]("Error", "Invalid email or password!");
  }
}

// save the user with his own username
function loginUser(username) {
  localStorage.setItem("loggedInUser", JSON.stringify(username));
}


function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash'; // Change icon to eye-slash when showing password
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye'; // Change icon back to eye when hiding password
    }
}

