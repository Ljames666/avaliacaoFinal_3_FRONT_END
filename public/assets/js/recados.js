if (localStorage.getItem("token") == null) {
  alertBootstrap("Você precisa estar logado para acessar essa página", "danger");
  window.location.href = "index.html";
} else {
  alertBootstrap(`Seja bem vindo!`, "success");
}
let token = localStorage.getItem("token");
function sair() {
  apiRest
    .delete(`/login/${token}`)
    .then((result) => {
      console.log(result.data.token);
      localStorage.removeItem("token");
      localStorage.removeItem("userLogon");
      localStorage.removeItem("messages");
      localStorage.removeItem("idMsg");
      alertBootstrap("Saindo", "danger");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    })
    .catch((error) => {
      console.log(error);
    });
}

readMessage();

let btnSend = document.querySelector("#_sendMensseger");
btnSend.addEventListener("click", createMessage);

function createMessage() {
  let inputDescription = document.getElementById("_title").value;
  let inputDetails = document.getElementById("_descrition").value;
  let id = localStorage.getItem("userLogon");
  apiRest
    .post(
      `/messages/${id}`,
      {
        description: inputDescription,
        details: inputDetails,
      },
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((result) => {
      console.log(result);
      alertBootstrap(result.data.message, "success");
      readMessage();
      inputDescription = location.reload();
      inputDetails = location.reload();
    })
    .catch((err) => {
      alertBootstrap(err.response.data.message, "danger");
    });
}

function readMessage() {
  // get
  let id = localStorage.getItem("userLogon");
  apiRest
    .get(`/messages/${id}`, {
      headers: {
        authorization: token,
      },
    })
    .then((result) => {
      console.log(result.data);
      let myMessages = result.data;
      let mId = 1;
      let list = document.getElementById("tablePrint");
      list.innerHTML = "";
      for (const item of myMessages) {
        list.innerHTML += `<tr class="text-light" >
          <th> ${mId} </th>
          <td >${item.description}</td>
          <td >${item.details}</td>
          <td><div class="d-flex justify-content-evenly">
          <button type="button" class="edit btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editar" onclick="captureMessage('${item.id}')">
          Editar</button> <button  type="button" class="erase btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#excluir" onclick="captureMessage('${item.id}')">
          Excluir</button></div></td>
          </tr>`;

        mId++;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
function captureMessage(id) {
  console.log(id);
  localStorage.setItem("idMsg", id);
}

let btnSave = document.getElementById("save");
btnSave.addEventListener("click", updateMessage);

function updateMessage() {
  let id = localStorage.getItem("idMsg");
  let descEdit = document.getElementById("descEdit").value;
  let detalEdit = document.getElementById("detalEdit").value;

  apiRest
    .put(
      `/messages/${id}`,
      {
        description: descEdit,
        details: detalEdit,
      },
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((result) => {
      alertBootstrap(result.data.message, "success");
      readMessage();
    })
    .catch((err) => alertBootstrap(err.response.data.message, "danger"));
}

let btnDelete = document.getElementById("delete");
btnDelete.addEventListener("click", deleteMessage);

function deleteMessage() {
  let id = localStorage.getItem("idMsg");

  apiRest
    .delete(`/messages/${id}`, {
      headers: {
        authorization: token,
      },
    })
    .then((result) => {
      alertBootstrap("message deleted successfully", "success");

      readMessage();
    })
    .catch((err) => alertBootstrap(err.response.data.message, "danger"));
}
