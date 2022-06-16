import express from "express";
import cors from "cors";

const app = express();

let usuarios = [];
let tweets = [];

app.use(express.json())
app.use(cors());

app.post("/sign-up", (req, res) => {
    usuarios.push(req.body);
    res.send("OK")
})

app.get("/tweets", (req, res) => {
    const tenLastTweets = tweets.slice(-10);
    
    res.send(tenLastTweets);
})

app.post("/tweets", (req, res) => {
    const tweet = req.body;

    for (let i = 0 ; i < usuarios.length ; i ++) {
        const user = usuarios[i];
        if (user.username === tweet.username) {
            tweet.avatar = user.avatar;
            break;
        }
    }

    tweets.push(tweet);
    res.send("OK");
})


app.listen(5000);