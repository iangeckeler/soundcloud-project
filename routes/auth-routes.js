const router = require('express').Router();
 //auth login, create an object router to import
 
 router.get('/login',(req,res)=>{
     res.render('login')
 })
 
 
 //auth with google
 
 router.get('/spotify',(req,res)=> {
     res.send('logging in with spotify')
 })
 
 module.exports = router;