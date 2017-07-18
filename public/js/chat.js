/**
 * Created by lloughlin on 13/7/17.
 */


var socket = io();
const FORMAT = 'h:mm a';

function scrollToBottom(){
    // selectors
    var messages = jQuery('#messages');

    // heights
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    const scroll = clientHeight + scrollTop + newMessageHeight + lastMessageHeight;
    console.log(scroll + ' ' +scrollHeight);

    if ( (clientHeight + scrollTop + newMessageHeight + lastMessageHeight) <= scrollHeight) {
        console.log('Should scroll');
        messages.scrollTop(scrollHeight);
    }
}

// Sad panda
socket.on('connect', function () {
    console.log('Connected to server');

    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(errors){
       if (errors){
           alert(errors);
           window.location.href = '/';
       } else {
         console.log('welcome to room');
       }
    });
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

socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

socket.on('disconnect', function () {
    console.log('disconnected from server');

    //socket.io('')
});

socket.on('newMessage', function(message){
   console.log('Received message', message);
   var template = jQuery('#message-template').html();
   var html = Mustache.render(template, {
       text: message.text,
       createdAt: moment(message.createdAt).format(FORMAT),
       from: message.from
   });
   jQuery('#messages').append(html);
    scrollToBottom();

   // var li = jQuery('<li></li>');
   //
   // var formattedTime = moment(message.createdAt).format(FORMAT);
   // li.text(`${message.from} ${formattedTime}: ${message.text}`);
   // jQuery('#messages').append(li);
});


socket.on('newEmail', function (message) {
    console.log('New Email', JSON.stringify(message));
});

socket.on('newLocationMessage',function(message){
   var li = jQuery('<li></li>');

   var formattedTime = moment(message.createdAt).format(FORMAT);
   var template = jQuery('#location-template').html();
   var html = Mustache.render(template, {
        url: message.url,
       from: message.from,
       createdAt: formattedTime
   });
    console.log('new location message ', html);
   jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function(event){
    //console.log('submitting message');
    event.preventDefault();
    const element = jQuery('[name=message]');
    //console.log('value: ', element.val());
    socket.emit('createMessage', {
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