const express = require("express");
const app = express();
const cors = require('cors');
const db = require("./models");
const UserRoutes = require('./routes/users.route');
const NotificationRoutes = require('./routes/notifications.route');
const http = require("http");
const socketIo = require("socket.io");

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin:"*"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const server = http.createServer(app);  
const io = socketIo(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

// Middleware to make io accessible in routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

//routes
app.use('/users/',UserRoutes);
app.use('/notifications/',NotificationRoutes);

db.sequelize.sync({ force: process.env.ENV==="DEV" }).then(() => {
    console.log("Drop and re-sync db.");
  });

// app.get('/',(req,res)=>{
//     res.send("Hello From Server!");
// })

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handling disconnection
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});



app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}...`);
});

