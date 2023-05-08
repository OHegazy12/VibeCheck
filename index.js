const express = require('express');

const fs = require('fs');

const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

const PORT = 3001;

// ------------- WebSocket Stuff -------------
// NOT READY YET
const httpServer = require('http').createServer(app);
const { Server } = require("socket.io")


const io = new Server(httpServer,
    {
        cors: {
            origin: '*',
            // methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
            // credentials: false
        }
    })

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle incoming WebSocket connections
io.on('connection', (socket) => {
    console.log('a user connected');

    // Handle incoming messages
    socket.on('message', (data) => {
        console.log(`received message: ${data}`);
        // Broadcast the message to all connected clients
        io.emit('message', data);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
// ------------- End WebSocket Stuff -------------

// Start the server and listen for incoming connections
httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


app.use(fileUpload());
// app.use(express.urlencoded({extended: false}))

// import routes.js to index.js
const routes = require('./routes/routes');
app.use('/api', routes)


//Default endpoint
app.get('/', (req, res) => {
    res.send('Default / page!')
})

// importing the contents of the .env file
require('dotenv').config();

