import express from "express";
const app = express();
const port = process.env.PORT || 8082;

app.use(express.static(__dirname + "/../public"));

app.listen(port, () => console.log("Iniciou o Front-end..."));
