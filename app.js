const express = require("express");
const app = express();
const axios = require("axios")
const port = 8000;

const http = require('http');
const socketIO = require('socket.io');

const cors = require('cors')

const bodyParser = require("body-parser");

// const sequelize = require("./src/db/conn")

const userRouter = require("./routers/userRoutes")

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE']
    // Other options if needed
}));
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE"]
    }
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('apiRequest', async (data, callback) => {
        try {
            callback("processing")

            const response = await someAsyncAPIFunction();

            socket.emit('response', response);

        } catch (error) {
            console.error('API request failed:', error);
        }
    })
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

app.use(express.json());
app.use("/api", userRouter)

server.listen(port, () => {
    console.log(`WebSocket server is running on ${port}`);
});

async function someAsyncAPIFunction() {
    return new Promise((resolve, reject) => {
        axios.get('http://192.168.2.71:9191/customers/stream')
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
