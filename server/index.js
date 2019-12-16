const express = require('express');
const socketio = require('socket.io');

const http = require('http');

//Port to be used
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

//import router module
const router = require('./router')

//socket instant created
const io = socketio(server);

//make socket connection 
io.on('connection', (socket) => {
    console.log('we have a new connection');

    socket.on('join', ({name, room}, callback) => {
        console.log(room, name)
        //callback is used for error handle
        const error = false
        if(error) {
            callback({ error: 'error'})
        }
    })

    socket.on('disconect', () => {
        console.log('user has left')
    })
})

//use it as middleware
app.use(router);

//create a server and run 
server.listen(PORT, () => {
    console.log(`Server has strated on port ${PORT}`)
})

