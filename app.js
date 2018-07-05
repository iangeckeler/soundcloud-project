var express = require('express');
var app = express();
var bodyParser  = require('body-parser')
var path = require('path')
var ejs = require('ejs')
var sdk = require('sdk')
var SpotifyWebApi = require('spotify-web-api-node');
var mongoose = require('mongoose');

//import modules routes
const authRoutes = require('./routes/auth-routes.js');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//set the app
app.set('view engine','ejs')
app.set('views','views')

//setup routes
app.use('/auth/',authRoutes)

app.listen(process.env.PORT, function() {
    console.log('it fucking works bitch')
})

//serve homepage
app.get('/', function(req,res){
    res.render('index')
});