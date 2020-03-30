import express from "express";
import { createServer } from "http";
import socketIO from "socket.io";
import { v4 } from "uuid";

const port = process.env.PORT || 8080;
const app = express();
const http = createServer(app);
const io = socketIO(http);

app.use(express.json());

interface Player {
  id: string;
  name: string;
}

interface Room {
  code: string;
  players: Player[];
}

const rooms: { [key: string]: Room } = {};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const generateRoomCode = () => {
  let roomCode = "";
  for (let i = 0; i < 4; i++) {
    roomCode +=
      alphabet[Math.floor(Math.random() * Math.floor(alphabet.length))];
  }
  return roomCode;
};

app.post("/room", (req, res) => {
  const { name } = req.body as { name: string };
  let code = generateRoomCode();
  while (typeof rooms[code] !== "undefined") {
    generateRoomCode();
  }
  rooms[code] = { code, players: [{ id: v4(), name }] };
  res.json(rooms[code]);
});

io.on("connection", socket => {
  console.log("a user connected!");
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});

http.listen(port, () => {
  console.log(`Let's play some Flunkyball on port ${port}! 🍺`);
});
