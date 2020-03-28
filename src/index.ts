import express from "express";
import socketIO from "socket.io";

const port = process.env.PORT || 8080;
const app = express();
const io = socketIO();

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", socket => {
  console.log("a user connected!");
});

app.listen(port, () => {
  console.log(`Let's play some Flunkyball on port ${port}! 🍺`);
});
