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

socket.on('newLocationMessage',function(message){
   var li = jQuery('<li></li>');
   var a = jQuery('<a target="_blank">My Current location</a>')
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(event){
    event.preventDefault();

    const element = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User123',
        text: element.val()
    },function() {
        // clear the input
        element.val('');
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    let sendLocation = 'Send location';
    if (!navigator.geolocation) {
        return alert('geo location is not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
       //success
        locationButton.removeAttr('disabled').text(sendLocation);
        socket.emit('createLocationMessage',{
           latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
       console.log('position ', position);
    }, function() {
        // fail
        locationButton.removeAttr('disabled').text(sendLocation);
        alert('unable to fetch location');
    })
});