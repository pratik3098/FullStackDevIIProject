const express=require('express')
const path=require('path')
const firebaseApp=require('./app')
const firebase=require('firebase')
const bodyParser= require('body-parser')
const multer=require('multer')
const app = express()

app.set('title','My Gallery')
app.set('view engine','hbs')
app.set('views',path.join(__dirname,"../views"))
app.use(express.static("../views"))
app.use(bodyParser.urlencoded({extended: false}))

app.get('',(req,res)=>{
    
    res.render('index')    
})
app.post('/register',(req,res)=>{
    try{
    firebaseApp.registerUser(req.body.firstName,req.body.lastName,req.body.userName,req.body.email,req.body.password)
    res.redirect('/gallery')
    }catch(err){
        res.render('register',{error: err.message})
    } 
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/gallery',(req,res)=>{
    res.render('profile',
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