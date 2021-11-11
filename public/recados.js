if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página", "danger");
  window.location.href = "index.html";
} else {
  alert(`Seja bem vindo!`, "success");
}

function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLogon.user");
  window.location.href = "index.html";
}

let btnSend = document.querySelector("#_sendMensseger");
btnSend.addEventListener("click", adicionarLinguagem);

function adicionarLinguagem() {
  let inputDescricao = document.getElementById("_title").value;
  let inputDetalhamento = document.getElementById("_descrition").value;

  let userLogon = JSON.parse(localStorage.getItem("userLogon"));

  if (inputDescricao != "" && inputDetalhamento != "") {
    userLogon.myMessages.push({
      descricao: inputDescricao,
      detalhamento: inputDetalhamento,
    });
    localStorage.setItem("userLogon", JSON.stringify(userLogon));
  }
  refreshUsersList();
  inputDescricao = location.reload();
  inputDetalhamento = location.reload();
}

function refreshUsersList() {
  let userList = JSON.parse(localStorage.getItem("userList"));
  let userLogon = JSON.parse(localStorage.getItem("userLogon"));

  userList.forEach((item) => {
    if (userLogon.user == item.user && userLogon.password == item.password) {
      item.myMessages = userLogon.myMessages;
    }
  });

  localStorage.setItem("userList", JSON.stringify(userList));
  printTable();
}

function printTable() {
  let userLogon = JSON.parse(localStorage.getItem("userLogon"));
  let list = document.getElementById("tablePrint");
  list.innerHTML = "";
  let num = 1;
  userLogon.myMessages.forEach((i) => {
    list.innerHTML +=
      `<tr id="rowTable">` +
      `<th> ${num} </th>` +
      `<td id="${num}_t1">${i.descricao}</td>` +
      `<td id="${num}_t2">${i.detalhamento}</td>` +
      `<td><div class="d-flex justify-content-evenly">
      <button id="" type="button" class="edit btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editar" onclick="captureMessage(${num})">
      Editar</button> <button id="" type="button" class="erase btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#excluir" onclick="captureMessage(${num})">
      Excluir</button></div></td>` +
      "</tr>";
    num++;
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

let btnDelete = document.getElementById("delete");
btnDelete.addEventListener("click", deleteMsg);

function deleteMsg() {
  let index = localStorage.getItem("idMsg");
  let userLogon = JSON.parse(localStorage.getItem("userLogon"));

  userLogon.myMessages.splice(parseInt(index) - 1, 1);

  localStorage.setItem("userLogon", JSON.stringify(userLogon));
  printTable();
}
let btnSave = document.getElementById("save");
btnSave.addEventListener("click", updateScraps);

function updateScraps() {
  let id = localStorage.getItem("idMsg");
  let des = document.getElementById(`${id}_t1`);
  let det = document.getElementById(`${id}_t2`);
  let descEdit = document.getElementById("descEdit");
  let detalEdit = document.getElementById("detalEdit");
  let userLogon = JSON.parse(localStorage.getItem("userLogon"));
  let reg1 = false;

  userLogon.myMessages.forEach((obj) => {
    if (des.textContent == obj.descricao && det.textContent == obj.detalhamento && !reg1) {
      obj.descricao = descEdit.value;
      obj.detalhamento = detalEdit.value;
      reg1 = true;
    }
  });

  localStorage.setItem("userLogon", JSON.stringify(userLogon));
  printTable();
}
printTable();

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
