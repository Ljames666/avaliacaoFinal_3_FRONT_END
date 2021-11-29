const apiRest = axios.create({
  baseURL: "https://my-messages-apirest.herokuapp.com",
});

if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página", "danger");
  window.location.href = "index.html";
} else {
  alert(`Seja bem vindo!`, "success");
}

function sair() {
  //get logoff
  apiRest
    .get("/logout")
    .then((result) => {
      console.log(result.data.token);
      localStorage.removeItem("token");
      localStorage.removeItem("userLogon");
      localStorage.removeItem("messages");
      localStorage.removeItem("idMsg");
      alert("Saindo", "danger");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    })
    .catch((error) => {
      console.log(error);
    });
}
let token = localStorage.getItem("token");
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
      console.log(result.data);
      readMessage();
    })
    .catch((err) => {
      console.log(err);
    });

  inputDescription = location.reload();
  inputDetails = location.reload();
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
      console.log(result.data.messages);
      let myMessages = result.data.messages;
      localStorage.setItem("messages", JSON.stringify(myMessages));
      let list = document.getElementById("tablePrint");
      list.innerHTML = "";
      for (const item of myMessages) {
        list.innerHTML += `<tr id="rowTable${item.id}">
          <th> ${item.id} </th>
          <td id="${item.id}_t1">${item.description}</td>
          <td id="${item.id}_t2">${item.details}</td>
          <td><div class="d-flex justify-content-evenly">
          <button id="" type="button" class="edit btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editar" onclick="captureMessage(${item.id})">
          Editar</button> <button id="" type="button" class="erase btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#excluir" onclick="captureMessage(${item.id})">
          Excluir</button></div></td>
          </tr>`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function captureMessage(id) {
  localStorage.setItem("idMsg", JSON.stringify(id));
  let des = document.getElementById(`${id}_t1`);
  let det = document.getElementById(`${id}_t2`);
  let descEdit = document.getElementById("descEdit");
  let detalEdit = document.getElementById("detalEdit");
  descEdit.value = des.textContent;
  detalEdit.value = det.textContent;
}

let btnSave = document.getElementById("save");
btnSave.addEventListener("click", updateMessage);

function updateMessage() {
  let message = localStorage.getItem("idMsg");
  let messages = JSON.parse(localStorage.getItem("messages"));
  let des = document.getElementById(`${message}_t1`);
  let det = document.getElementById(`${message}_t2`);
  let descEdit = document.getElementById("descEdit").value;
  let detalEdit = document.getElementById("detalEdit").value;
  let id = localStorage.getItem("userLogon");

  messages.forEach((obj) => {
    if (des.textContent == obj.description && det.textContent == obj.details) {
      apiRest
        .put(
          `/messages/${id}?message=${message}`,
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
          alert(result.data.message, "success");
          readMessage();
        })
        .catch((err) => console.log(err));
    }
  });
}

let btnDelete = document.getElementById("delete");
btnDelete.addEventListener("click", deleteMessage);

function deleteMessage() {
  let message = localStorage.getItem("idMsg");
  let id = localStorage.getItem("userLogon");

  apiRest
    .delete(`/messages/${id}?message=${message}`, {
      headers: {
        authorization: token,
      },
    })
    .then((result) => {
      console.log(result.data);
      alert(result.data.message, "success");

      readMessage();
    })
    .catch((err) => console.log(err));
}
readMessage();

function alert(message, type) {
  let alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  let wrapper = document.createElement("div");
  wrapper.innerHTML +=
    '<div class="alert alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  alertPlaceholder.appendChild(wrapper);
}
