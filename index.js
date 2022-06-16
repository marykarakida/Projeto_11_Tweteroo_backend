import express from "express";
import cors from "cors";

const app = express();

let users = [];
let tweets = [];

app.use(express.json())
app.use(cors());

app.post("/sign-up", (req, res) => {
    const userId = users.length;
    const user = { id: userId, ...req.body};

    users.push(user);

    res.send("OK")
})

app.get("/tweets", (req, res) => {
    const tenLastTweets = tweets.slice(-10);
    
    res.send(tenLastTweets);
})

app.post("/tweets", (req, res) => {
    const tweetId = tweets.length;
    const tweet = { id: tweetId, ...req.body };

    for (let i = 0 ; i < users.length ; i ++) {
        const user = users[i];
        if (user.username === tweet.username) {
            tweet.avatar = user.avatar;
            break;
        }
    }

    tweets.push(tweet);
    res.send("OK");
})


app.listen(5000);