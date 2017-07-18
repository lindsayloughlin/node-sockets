/**
 * Created by lloughlin on 13/7/17.
 */

const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocation} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

console.log(__dirname + '../public');
console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail', (newEmail)=>{
    //     console.log('create email', newEmail);
    // });


    socket.on('join', (params, callback)=>{
        if (!isRealString(params.name)){
            return callback('Name is required')
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // io.emit .. everyone
        // socket.broadcast.emit everyone except socker user
        // socket.emit to a specific user

        socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', {
            from: 'Admin',
            text: `${params.name} has joined`,
            created: new Date().getTime()
        });

        if (!isRealString(params.room)){
            callback('Room is required');
        }
    });

    socket.on('messagerecieved', (message) => {
        console.log('messagerecieved ', message);
    });

    socket.on('createLocationMessage', (coords)=>{
       var user = users.getUser(socket.id);
       console.log('emitting location');
       io.to(user.room).emit('newLocationMessage', generateLocation(user.name, coords.latitude, coords.longitude));
    });

    socket.on('createMessage', (message, callback) => {

        // socket.emit('newMessage', {
        //     message: 'welcome from admin'
        // });

        console.log('got callback')

        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
            callback();
        }

        console.log('received created message' ,message);
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     created: new Date().getTime()
        // });


        //callback({ text: 'callback text'});

    });

    socket.on('disconnect', () => {

        var user = users.removeUser(socket.id);
        console.log('User was disconnected from server');
        if (user) {
            console.log('updating users');
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        }
    });

});




// socket.on('createemail', (email) =>{
//    console.log('create email' ,email);
// });



let PORT_NUMBER = process.env.PORT || 3000;
server.listen(PORT_NUMBER, () => {
    console.log(`hello world on port ${PORT_NUMBER}`);
});