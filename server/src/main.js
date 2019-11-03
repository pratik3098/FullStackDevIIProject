const express=require('express')
const path=require('path')
const firebaseApp=require('./app')
const bodyParser= require('body-parser')
const multer=require('multer')
const app = express()

   
let upload1 = multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../user_data/userImages'))
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
app.get('/login',(req,res)=>{
    res.render('registration/login')
})
app.post('/login',(req,res)=>{
    try{
    firebaseApp.signInUser(req.body.email,req.body.password)
    res.redirect('/gallery')
    }catch(err){
        res.render('register',{error: err.message})
    } 
})

app.get('/register',(req,res)=>{
    res.render('registration/register')    
})
app.post('/register',upload.single("profilePic"),(req,res)=>{
    try{
    let file=req.file
    //firebaseApp.registerUser(req.body.firstname,req.body.lastname,req.body.username,req.body.email,req.body.password)
    /*upload= multer({
        dest: '../user_data/'+req.body.username
      })*/
      res.send(file)
   // res.redirect('/login')
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