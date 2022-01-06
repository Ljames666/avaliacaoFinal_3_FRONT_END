const apiRest = axios.create({
  baseURL: "https://my-messages-apirest.herokuapp.com", // com heroku api
  // baseURL: "http://localhost:8081", // localhost api
});

var alertPlaceholder = document.getElementById("liveAlertPlaceholder");

function alertBootstrap(message, type) {
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
