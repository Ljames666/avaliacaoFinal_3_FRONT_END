let btnAccess = document.querySelector("#_acessValid");
btnAccess.addEventListener("click", check);
//checking
function check() {
  var userName = document.getElementById("_username").value;
  var userPw = document.getElementById("_password").value;

  apiRest
    .post("/login", {
      _username: userName,
      _password: userPw,
    })
    .then((result) => {
      alertBootstrap("You are logged in!", "success");
      console.log(result.data.result);
      localStorage.setItem("token", result.data.result.token);
      localStorage.setItem("userLogon", result.data.result.user_id);
      setTimeout(() => {
        window.location.href = "recados.html";
      }, 3000);
    })
    .catch((err) => {
      console.log(err);
      let myError = err.response.status;
      switch (myError) {
        case 418:
          alertBootstrap("Preencha os campos!", "warning");
          break;
        case 400:
          alertBootstrap("Password invalid !", "danger");
          break;
        case 406:
          alertBootstrap("Username invalid!", "danger");
          break;
        case 404:
          alertBootstrap("Usuário inexistente !", "danger");
          setTimeout(() => {
            window.location.href = "cadastro.html";
          }, 2000);
          break;

        default:
          alertBootstrap("Erro de login,tente novamente!", "danger");
          break;
      }
    });
}
