const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const socketio = require("socket.io");
const {
  getUser,
  getUsersInRoom,
  addUser,
  removeUser,
} = require("./controllers/users");

const router = require("./routes/index");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(router);

// socket working

io.on("connection", (socket) => {
  console.log("new connection");

  // ************************************************************
  // onJoin Chat Room
  //
  socket.on("join", ({ name, room }, callback) => {
    console.log("new join");
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(error);
    if (error) return callback(error);
    socket.emit("message", {
      user: "Chat Bot",
      text: `Welcome to the chat room ${room}`,
    });

    socket.broadcast
      .to(room)
      .emit("message", { user: "Chat Bot", text: `${name} has joined!` });
    socket.join(room);
    io.to(room).emit("roomData", { room: room, users: getUsersInRoom(room) });
    callback();
  });
  //
  // ************************************************************

  // ************************************************************
  // onSendMessage By User
  //
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(user, "user");
    console.log(message);
    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });
  //
  // ************************************************************

  // ************************************************************
  //on disconnect
  //
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "Chat Bot",
        txt: "${user.name has left}",
      });
    }
    console.log("user had left");
  });
  //
  // ************************************************************
});

// port
const port = 7000;

// start server
server.listen(port, () => {
  console.log("=========================================");
  console.log(`Server Listen At Port: ${port}`);
  console.log("=========================================");
});
