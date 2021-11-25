const apiRest = axios.create({
  baseURL: "http://localhost:8081",
});

function store() {
  const name = document.getElementById("_usernameReg").value;
  const email = document.getElementById("_userEmailReg").value;
  const pw = document.getElementById("_passwordReg").value;
  const pw2 = document.getElementById("_repeatPassReg").value;
  // const email = /^(?=@)/;
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const simbols = /(?=.*[@!#$%^&*_()])/;

  if (name.length == 0 || email.length == 0) {
    alert("Por favor, preencha nome e e-mail!", "danger");
  } else if (!email.match(/\S+@\S+\.\S+/)) {
    alert("Preencha o e-mail da forma correta!", "warning");
  } else if (pw.length == 0) {
    alert("Por favor, preencha o password!", "danger");
  } else if (pw.length < 4) {
    alert("Min de  8  caracteres!", "warning");
  } else if (!pw.match(numbers)) {
    alert("Por favor add 1 número", "warning");
  } else if (!pw.match(upperCaseLetters)) {
    alert("Por favor add 1 letra maiúscula!", "warning");
  } else if (!pw.match(lowerCaseLetters)) {
    alert("Por favor add 1 letra minúscula!", "warning");
  } else if (!pw.match(simbols)) {
    alert("Por favor add 1 caractere especial! ", "warning");
  } else if (pw != pw2) {
    alert("Senhas não confere!", "danger");
  } else {
    apiRest
      .post("/cadastro", {
        name: name,
        email: email,
        password: pw,
        reppeatPassword: pw2,
      })
      .then((result) => {
        console.log(result);
        // window.location.href = "index.html";
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

var alertPlaceholder = document.getElementById("liveAlertPlaceholder");

function alert(message, type) {
  var wrapper = document.createElement("div");
  wrapper.innerHTML +=
    '<div class="alert alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

  alertPlaceholder.appendChild(wrapper);
}

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});
