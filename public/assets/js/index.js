const apiRest = axios.create({
  baseURL: "http://localhost:8081",
});

let btnAccess = document.querySelector("#_acessValid");
btnAccess.addEventListener("click", check);
//checking
function check() {
  var userName = document.getElementById("_username").value;
  var userPw = document.getElementById("_password").value;

  apiRest
    .post("/login", {
      username: userName,
      password: userPw,
    })
    .then((result) => {
      alert("You are logged in!", "success");
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("userLogon", result.data.userLogon.id);
      setTimeout(() => {
        window.location.href = "recados.html";
      }, 3000);
    })
    .catch((err) => {
      let myError = err.response.status;
      switch (myError) {
        case 418:
          alert("Preencha os campos!", "warning");
          break;
        case 400:
          alert("Password invalid !", "danger");
          break;
        case 406:
          alert("Username invalid!", "danger");
          break;
        case 404:
          alert("Usuário inexistente !", "danger");
          setTimeout(() => {
            window.location.href = "cadastro.html";
          }, 2000);
          break;

        default:
          alert("Erro de login,tente novamente!", "danger");
          break;
      }
    });
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
