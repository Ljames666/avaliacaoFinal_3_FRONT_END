function store() {
  var name = document.getElementById("_usernameReg").value;
  var pw = document.getElementById("_passwordReg").value;
  var pw2 = document.getElementById("_repeatPassReg").value;
  // var email = /^(?=@)/;
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;
  var simbols = /(?=.*[@!#$%^&*_()])/;
  var userList = [];
  if (name.length == 0) {
    alert("Por favor, preencha o e-mail!", "danger");
  } else if (!name.match(/\S+@\S+\.\S+/)) {
    alert("Preencha o e-mail da forma correta!", "warning");
  } else if (pw.length == 0) {
    alert("Por favor, preencha o password!", "danger");
  } else if (pw.length < 8) {
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
    userList = JSON.parse(localStorage.getItem("userList") || "[]");

    userList.push({
      user: name,
      password: pw,
      myMessages: [],
    });

    localStorage.setItem("userList", JSON.stringify(userList));
    alert("Sua conta foi criada!", "success");
    window.location.href = "index.html";
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
