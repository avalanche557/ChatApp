const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

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
        const {error, user } = addUser({id: socket.id, name, room})
        if(error) {
            return callback(error)
        }
        //send the first default message to the user;
        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        //send message to all the user except the current user
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined !`})

        socket.join(user.room);

        io.to(user.room).emit('roomData' ,{room: user.room, users: getUsersInRoom(user.room)})

        callback();
    })

    //listing for the message from the user and then  send in to that chat room
    socket.on('sendMessage', (message, callback) => {
        console.log('sendMessage')
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message})
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})


        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        console.log('socket', user)
        if(user) {
            io.to(user.room).emit('message', {user: 'admin', text:`${user.name} has left`})
            //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
})

//use it as middleware
app.use(router);
app.use(cors());

//create a server and run 
server.listen(PORT, () => {
    console.log(`Server has strated on port ${PORT}`)
})

