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
   console.log('Received message', message);
   var li = jQuery('<li></li>');

   li.text(`${message.from} ${message.text}`);

   jQuery('#messages').append(li);
});


socket.on('newEmail', function (message) {
    console.log('New Email', JSON.stringify(message));
});

jQuery('#message-form').on('submit', function(event){
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User123',
        text: jQuery('#message').val()
    });
});