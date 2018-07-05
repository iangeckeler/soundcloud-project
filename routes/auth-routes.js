const router = require('express').Router();
var SpotifyWebApi = require('spotify-web-api-node');
var request = require('request'); // "Request" library
var needle = require('needle');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost:27017/spotify_db');
//create schema for user (pattern)
var userSchema = new mongoose.Schema({
    userid: String,
    usertoken: String
});
//model (now compiled into model, has methods)
var User = mongoose.model("User",userSchema);
 
 // authenticate client with spotify
 var scopes = ['user-read-private', 'user-read-email'],
  redirectUri = '/auth/callback',
  clientId = '79a1865851624850b9a84fb2062c2e2a',
  state = 'some-state-of-my-choiceasdfasf';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: 'https://82ab8960a2854bbabf05b0300b35f959.vfs.cloud9.us-west-2.amazonaws.com/auth/callback',
  clientId: '79a1865851624850b9a84fb2062c2e2a',
  clientSecret: '5311039aef6a482b9361bc21a982ffde'
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes,state);

console.log(authorizeURL);

 //auth login, create an object "router" to import
 
 router.get('/login',(req,res)=>{
  //pass through the login URL to authorize
     res.render('login', {loginURL: authorizeURL})
 })
 
 
 
 router.get('/callback',(req,res)=> {
  //store code to request access token
  var code = req.query.code;
  console.log(code)
  
   // Retrieve an access token and a refresh token
spotifyApi.authorizationCodeGrant(code).then(
  function(data) {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);

    //make new user to store the token
    User.create({ usertoken: data.body['access-token'], userid:'temporary' }, function (err, small) {
    if (err) {
     console.log('err')
     };
    // saved!
    console.log('saved')
    });
    
    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    
    
    
    //get info about user
    // Get the authenticated user and save them to the database with their access token
   spotifyApi.getMe().then(function(data) {
    //query for new user
    User.findOne({userid: 'temporary'}, function (err, user) {
     if(err){
      console.log('problem finding one')
     }
     //update id
     user.userid = data.body.id;
     user.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
        console.log('saved')
    });
});
    
  }, function(err) {
    console.log('Something went wrong!', err);
  });
  // end get user id
  
  },
  function(err) {
    console.log('Something went wrong!', err);
  }
);

 })
 
User.findOne({ userid: 'ikcgeckeler' },function(err,doc){
 if(err){
  console.log('error')
 }
 var x= doc.userid
 console.log(x)

});

//export to main file app.js
 module.exports = router;