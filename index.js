import express from "express";
import cors from "cors";

const app = express();

let usuarios = [];

app.use(express.json())
app.use(cors());

app.post("/sign-up", (req, res) => {
    usuarios.push(req.body);
    res.send("ok")
})


app.listen(5000);