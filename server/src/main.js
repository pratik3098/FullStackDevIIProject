const express=require('express')
const path=require('path')
const firebaseApp=require('./app')
const bodyParser= require('body-parser')
const multer=require('multer')
const app = express()
app.set('title','My Gallery')
app.set('view engine','hbs')
app.set('views',path.join(__dirname,"../views"))
app.use(express.static("../views"))
app.use(bodyParser.urlencoded({extended: false}))

app.get('',(req,res)=>{
    res.redirect('/login')    
})
app.get('/login',(req,res)=>{
    res.render('registration/login')
})
app.post('/login',(req,res)=>{
    try{
    firebaseApp.registerUser(req.body.firstname,req.body.lastname,req.body.username,req.body.email,req.body.password)
    res.redirect('/gallery')
    }catch(err){
        res.render('register',{error: err.message})
    } 
})

app.get('/register',(req,res)=>{
    res.render('registration/register')    
})
app.post('/register',(req,res)=>{
    try{
    firebaseApp.registerUser(req.body.firstname,req.body.lastname,req.body.username,req.body.email,req.body.password)
    res.redirect('/gallery')
    }catch(err){
        res.render('register',{error: err.message})
    } 
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/gallery',(req,res)=>{
    res.render('gallery/gallery',
    { firstname: 'Mike',
      lastname: 'Snow',
      username: 'mikey455',
      //userimg: '',
      email: 'abcd@gmail.com', 
      imgcount: '10',
      userSince: '01/13/2019'
     })
})

app.listen(8080,()=>{
    console.log("Server is running on port: 8080")
})