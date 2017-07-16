/**
 * Created by lloughlin on 13/7/17.
 */


var socket = io();

// Sad panda
socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createemail', {
    //     to: 'some1@test.com',
    //     text: 'hey you'
    // });
    //
    // socket.emit('messagerecieved', {
    //
    //     from: 'someone',
    //     text: 'some message'
    // });

});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function(message){
   console.log(`Received message ${message}`);
});


socket.on('newEmail', function (message) {
    console.log('New Email', JSON.stringify(message));
});