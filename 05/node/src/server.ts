import express from 'express';

const app = express();

const PORT = 3333;

app.get("/", (req, res) => {
    return res.send("Hello!");
});

app.post("/", (req, res) => {
    return res.send("hello from POST!");
});

app.listen(PORT, () => { console.log(`running at port ${PORT}`); });