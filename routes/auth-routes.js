const router = require('express').Router();
var SpotifyWebApi = require('spotify-web-api-node');
var request = require('request'); // "Request" library
var needle = require('needle');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
 
 // authenticate clietn with spotify
 var scopes = ['user-read-private', 'user-read-email'],
  redirectUri = '/auth/callback',
  clientId = '79a1865851624850b9a84fb2062c2e2a'//,
  //state = 'some-state-of-my-choiceasdfasf';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: 'https://82ab8960a2854bbabf05b0300b35f959.vfs.cloud9.us-west-2.amazonaws.com/auth/callback',
  clientId: '79a1865851624850b9a84fb2062c2e2a',
  clientSecret: '5311039aef6a482b9361bc21a982ffde'
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes);

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

    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
  },
  function(err) {
    console.log('Something went wrong!', err);
  }
);

 })
 

 

 
 //export to main file app.js
 module.exports = router;