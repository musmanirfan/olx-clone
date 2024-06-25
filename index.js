const formOpenBtn = document.querySelector("#form-open"),
      home = document.querySelector(".home"),
      formContainer = document.querySelector(".form_container"),
      formCloseBtn = document.querySelector(".form_close"),
      signupBtn = document.querySelector("#signup"),
      loginBtn = document.querySelector("#login"),
      pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

let signup = () => {
  let signup1 = document.querySelector(".signup-1").value;
  let signup2 = document.querySelector(".signup-2").value;
  let signup3 = document.querySelector(".signup-3").value;
  let confPass = document.querySelector("#confirm-pass");


  if (signup2 === signup3) {
    let user = { email: signup1, password: signup2 };
    localStorage.setItem("userValues", JSON.stringify(user));
    localStorage.setItem("login", true);
    window.location.reload();
  } else {
    confPass.innerHTML = "<div class='div-error'><span class='fas fa-times-circle'></span> Your password is not the same </div>";
  }
}

function verifyUser() {
  let loggedIn = localStorage.getItem("login");
  if (loggedIn === "true") {
    // window.location.reload();
  }
}

window.addEventListener("load", verifyUser);

let login1 = document.querySelector(".login-1");
let login2 = document.querySelector(".login-2");

function logIn() {
  let user = JSON.parse(localStorage.getItem("userValues"));
  if (user && login1.value === user.email && login2.value === user.password) {
    localStorage.setItem("login", true);
    window.location.reload();
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Email or Password is Incorrect 🤦‍♀️",
      showConfirmButton: false,
      timer: 1500
    });
  }
}
