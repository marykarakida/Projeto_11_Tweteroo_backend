import express from "express";
import cors from "cors";

const app = express();

const users = [];
const tweets = [];

app.use(express.json())
app.use(cors());

app.post("/sign-up", (req, res) => {
    const userId = users.length;
    const newUser = { id: userId, ...req.body};

    if (newUser.username === "" || newUser.avatar === "") {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }

    if (users.some(user => user.username === newUser.username)) {
        res.status(400).send("O username inserido já está sendo usado.");
        return;
    }

    if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(newUser.avatar))) {
        res.status(400).send("A extensão da imagem do avatar inserida não é aceita nesse aplicativo.");
        return;
    }

    users.push(newUser);

    res.status(201).send("OK");
})

app.get("/tweets", (req, res) => {
    const page = Number(req.query.page);
    const tweetsPerPage = 10;

    const start = page * (tweetsPerPage * -1);
    const end = tweets.length - (page - 1) * (tweetsPerPage);
    const displayedTweets = tweets.slice(start, end).sort((a, b) => b.id - a.id);

    for (let i = 0 ; i < displayedTweets.length ; i ++) {
        const tweet = {...displayedTweets[i]};
        const tweetUserInfo = users.find(user => user.username === tweet.username);

        tweet.avatar = tweetUserInfo.avatar;

        displayedTweets[i] = tweet;
    }
    
    res.send(displayedTweets);
})

app.post("/tweets", (req, res) => {
    const tweetId = tweets.length;
    const tweet = { id: tweetId, username: req.headers.user, tweet: req.body.tweet };

    tweets.push(tweet);

    res.status(201).send("OK");
})

app.get("/tweets/:username", (req, res) => {
    const username = req.params.username;
    const userTweets = tweets.filter(tweet => tweet.username === username);

    res.send(userTweets);
})

app.listen(5000);