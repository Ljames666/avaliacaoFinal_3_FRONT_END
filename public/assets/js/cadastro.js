function store() {
  const name = document.getElementById("_nameReg").value;
  const username = document.getElementById("_usernameReg").value;
  const email = document.getElementById("_userEmailReg").value;
  const pw = document.getElementById("_passwordReg").value;
  const pw2 = document.getElementById("_repeatPassReg").value;
  // const email = /^(?=@)/;
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const simbols = /(?=.*[@!#$%^&*_()])/;

  if (name.length == 0 || username.length == 0 || email.length == 0) {
    alertBootstrap("Por favor, preencha nome e e-mail!", "danger");
  } else if (!email.match(/\S+@\S+\.\S+/)) {
    alertBootstrap("Preencha o e-mail da forma correta!", "warning");
  } else if (pw.length == 0) {
    alertBootstrap("Por favor, preencha o password!", "danger");
  } else if (pw.length < 8) {
    alertBootstrap("Min de  8  caracteres!", "warning");
  } else if (!pw.match(numbers)) {
    alertBootstrap("Por favor add 1 número", "warning");
  } else if (!pw.match(upperCaseLetters)) {
    alertBootstrap("Por favor add 1 letra maiúscula!", "warning");
  } else if (!pw.match(lowerCaseLetters)) {
    alertBootstrap("Por favor add 1 letra minúscula!", "warning");
  } else if (!pw.match(simbols)) {
    alertBootstrap("Por favor add 1 caractere especial! ", "warning");
  } else if (pw != pw2) {
    alertBootstrap("Senhas não confere!", "danger");
  } else {
    apiRest
      .post("/cadastro", {
        name: name,
        username: username,
        email: email,
        password: pw,
      })
      .then((result) => {
        console.log(result);
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        alertBootstrap(err.response.data.message, "danger");
      });
  }
}
