const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const socket = require("socket.io");
const userRoutes = require('./routes/userRoutesChat');
const messageRoute = require("./routes/messagesRoute");

//dotenv conig
dotenv.config();

//Mongodb connection
connectDB();

//Rest obejct
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(moragan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

//port
const port = process.env.PORT || 8080;

//Listen port
const server = app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

//This line initializes a global Map named onlineUsers. 
//This map is used to store user IDs as keys and their corresponding socket IDs as values. 
//It's used to keep track of which users are currently online.
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});


