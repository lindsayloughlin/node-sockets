/**
 * Created by lloughlin on 13/7/17.
 */

const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

console.log(__dirname + '../public');
console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail', (newEmail)=>{
    //     console.log('create email', newEmail);
    // });


    socket.on('createMessage', (message) => {
        console.log(`recieved created message ${message}`);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            created: new Date().getTime()
        });
    });

    // socket.emit('createMessage', {
    //     to: 'person',
    //     text: 'message'
    // });

    socket.on('messagerecieved', (message) => {
        console.log('messagerecieved ', message);
    });

    // socket.on('createemail', (email) =>{
    //    console.log('create email' ,email);
    // });

    socket.on('disconnect', () => {
        console.log('User was disconnected from server');
    });
});


let PORT_NUMBER = process.env.PORT || 3000;
server.listen(PORT_NUMBER, () => {
    console.log(`hello world on port ${PORT_NUMBER}`);
});