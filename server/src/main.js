const express=require('express')
const path=require('path')
const firebaseApp=require('./app')
const bodyParser= require('body-parser')
const multer=require('multer')
const app = express()
const fs=require('fs')
let upload1 = multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../user_data/userImages/'))
    },
    filename: function (req, file, cb) {
      cb(null, 'profile.png')
    }
  }) })
let upload2 = multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../user_data/imageCloud/'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname+'-'+Date.now())
    }
  }) })
app.set('title','My Gallery')
app.set('view engine','hbs')
app.set('views',path.join(__dirname,"../views"))
app.use(express.static("../views"))
app.use(bodyParser.urlencoded({extended: false}))

app.get('',(req,res)=>{
    res.redirect('/login')    
})
app.get('/about',(req,res)=>{
  res.render('about/index')
})
app.get('/login',(req,res)=>{
    res.render('registration/login')
})

app.post('/login',(req,res)=>{
    try{
    firebaseApp.signInUser(req.body.email,req.body.password)
    console.log("sign-in Successful")
    res.redirect('/gallery')
    }catch(err){
        res.redirect('/forgot')
    } 
})

app.get('/register',(req,res)=>{
    res.render('registration/register')    
})
app.post('/register',upload1.single("profilePic"),(req,res)=>{
    try{
    firebaseApp.registerUser(req.body.firstname,req.body.lastname,req.body.username,req.body.email,req.body.password)
    firebaseApp.uploadUserProfilePic(req.body.username,'profile.png')
    //fs.unlink(path.resolve(__dirname,'../user_data/profile.png'))
    res.redirect('/login')
   res.send(req.file)
    }catch(err){
       console.error(err)
    } 
})
app.get('/forgot',(req,res)=>{
          res.render('./registration/forgot')
})
app.post('/forgot',(req,res)=>{
    try{
        firebaseApp.sendResetEmail(req.body.email)
        res.redirect('/login')
        }catch(err){
            res.redirect('/forgot')
        } 
})

app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/gallery',(req,res)=>{
  res.render('gallery/gallery')
})
app.post('/upload2',upload2.single("pic"),(req,res)=>{

    res.redirect('/gallery')
})
app.post('/upload2',(req,res)=>{
  try{
  firebaseApp.signInUser(req.body.email,req.body.password)
  res.redirect('/gallery')
  }catch(err){
      res.render('register',{error: err.message})
  } 
})

app.listen(8080,()=>{
    console.log("Server is running on port: 8080")
}) 