var express = require('express');
var app = express();
var parse = require('body-parser')

var path = require('path')

var app = express();

app.set('view engine','ejs')
app.set('views','views')

app.listen(process.env.PORT, function() {
    console.log('it fucking works bitch')
})

app.get('/', function(req,res){
    res.render('index')
});