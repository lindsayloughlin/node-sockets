

var moment = require('moment');


// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());

var momDate = moment();

momDate.add(1, 'year');

console.log(momDate.format('MMM Do, YYYY'));


var date = moment();
date.add(100, 'year').subtract(9, 'month');

console.log(date.format('h:hh a') + ' ' + date.valueOf());