import express from "express";
import cors from "cors";

const app = express();

let usuarios = [];
let tweets = [];

app.use(express.json())
app.use(cors());

app.post("/sign-up", (req, res) => {
    usuarios.push(req.body);
    res.send("ok")
})

app.get("/tweets", (req, res) => {
    res.send(tweets);
})


app.listen(5000);