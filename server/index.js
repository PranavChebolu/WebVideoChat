import express from 'express';
import cors from 'cors';//change in production
import http from 'http';
import { Server } from 'socket.io';

const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
//general socket io server
const io = new Server(server, {
    cors: {
        origins: "*:*",
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
        pingTimeout: 7000,
        pingInterval: 3000
    }
});

//use socket variable when someone connects

// Middlewares
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.post("/test", (req, res) => {
    console.log(req.body.hello)
    res.send({ "hello": "to you" })
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

console.log("hello");
server.listen(8081, () => {
    console.log("server is running")
});