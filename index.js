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

document.addEventListener("DOMContentLoaded", () => {
  let loginOutBtn = document.getElementById("form-open");

  function closeForm() {
      const formContainer = document.querySelector('.form_container');
      formContainer.classList.add('hide');
      setTimeout(() => {
          formContainer.classList.remove('show');
          formContainer.classList.remove('hide');
      }, 500); // matches the transition duration
  }

  let signup = () => {
      let signup1 = document.querySelector(".signup-1").value;
      let signup2 = document.querySelector(".signup-2").value;
      let signup3 = document.querySelector(".signup-3").value;
      let confPass = document.querySelector("#confirm-pass");

      if (signup2 === signup3) {
          let user = { email: signup1, password: signup2 };
          localStorage.setItem("userValues", JSON.stringify(user));
          localStorage.setItem("login", true);
          loginOutBtn.innerHTML = "Logout";
          showName();
          closeForm();
          setTimeout(() => window.location.reload(), 500); // reload after transition
      } else {
          confPass.innerHTML = "<div class='div-error'><span class='fas fa-times-circle'></span> Your password is not the same </div>";
      }
  }

  function verifyUser() {
      let loggedIn = localStorage.getItem("login");
      if (loggedIn === "true") {
          loginOutBtn.innerHTML = "Logout";
      } else {
          loginOutBtn.innerHTML = "Login";
      }
  }

  let login1 = document.querySelector(".login-1");
  let login2 = document.querySelector(".login-2");

  function logIn(event) {
      event.preventDefault();
      let user = JSON.parse(localStorage.getItem("userValues"));
      if (user && login1.value === user.email && login2.value === user.password) {
          localStorage.setItem("login", true);
          loginOutBtn.innerHTML = "Logout";
          showName();
          closeForm();
          setTimeout(() => window.location.reload(), 500); // reload after transition
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

  let userName = document.querySelectorAll(".username")[0];
  function showName() {
      let loggedIn = localStorage.getItem("login");
      if (loggedIn === "true") {
          let getName = JSON.parse(localStorage.getItem("userValues"));
          userName.innerHTML = getName.email;
      } else {
          userName.innerHTML = "";
      }
  }

  function logout() {
      localStorage.setItem("login", false);
      loginOutBtn.innerHTML = "Login";
      showName();
      window.location.reload();
  }

  loginOutBtn.addEventListener("click", (event) => {
      event.preventDefault();
      if (localStorage.getItem("login") === "true") {
          logout();
      } else {
          document.querySelector('.form_container').classList.add('show');
      }
  });

  document.querySelector(".form_close").addEventListener("click", closeForm);
  document.querySelector(".signup-btn").addEventListener("click", (event) => {
      event.preventDefault();
      signup();
  });
  document.querySelector(".login_form form").addEventListener("submit", logIn);

  window.addEventListener("load", verifyUser);
  window.addEventListener("load", showName);
});
