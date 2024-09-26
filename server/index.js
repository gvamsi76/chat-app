const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/config")
const routes = require('./routes/index');
const http = require("http");
const { Server } = require("socket.io");

// console.log(useChart);

app.use(express.json());
app.use(cors());
const server = http.createServer(app);


app.get("/", (req, res) => {
  res.send("Hello Vamshi");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
    let onlineUsers = [];
    // console.log("New Connection : ", socket.id);
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            });
            console.log(onlineUsers, "onlineUsers");
            io.emit("getOnlineusers", onlineUsers);
        
    });

    // add new message 
    socket.on("sendMessage", (message) => {
      console.log(message ,"message")
        const user = onlineUsers.find((user) => user.userId === message.recipcentId);
        if (user) {
            io.to(user.socketId).emit("getMessage" , message);
            io.to(user.socketId).emit("getNotification" , {
                senderId : message.senderId,
                time : new Date(),
                isRead : false,
            });
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((item) => item.socketId !== socket.id);
        io.emit("getOnlineusers", onlineUsers);
    });
});
io.listen(4000)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectDB()
app.use('/api', routes);

app.get((res, req) => {
  res.send("Welcome to our chat app APIs");
});

