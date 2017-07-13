/**
 * Created by lloughlin on 13/7/17.
 */

const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

console.log(__dirname + '../public');
console.log(publicPath );

var app = express();

app.use(express.static(publicPath));

let PORT_NUMBER = process.env.PORT || 3000;
app.listen(PORT_NUMBER, ()=>{

    console.log(`hello world on port ${PORT_NUMBER}`);
});