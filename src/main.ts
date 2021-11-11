import express from "express";
const app = express();
const port: number = 8082;

app.use(express.static(__dirname + "/../public"));

app.listen(port, () => console.log("Iniciou o Front-end..."));
