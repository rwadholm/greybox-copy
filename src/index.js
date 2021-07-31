const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("js/socket.io")(http);
var userNum = 0;
const port = 8080;

app.use("/", express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  userNum++;
  var uid = userNum;
  io.emit("connected", uid);
  console.log("User " + uid + " connected");
  socket.on("disconnect", () => {
    io.emit("disconnected", uid);
    console.log("User " + uid + " disconnected");
  });
  socket.on("copy", (copy) => {
    io.emit("copy", copy);
  });
});

http.listen(port, () => {
  console.log("listening on *:8080");
});
