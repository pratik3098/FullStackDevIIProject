const express=require('express')
const path=require('path')
const firebaseApp=require('./app')
const bodyParser= require('body-parser')
const multer=require('multer')
const app = express()
const storage=multer.diskStorage({
    destination: '../user_data/',
}
)
let upload = multer({ storage: storage })
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
app.post('/register',(req,res)=>{
    try{
    //firebaseApp.registerUser(req.body.firstname,req.body.lastname,req.body.username,req.body.email,req.body.password)
    /*upload= multer({
        dest: '../user_data/'+req.body.username
      })*/
      console.log(req.file)
    res.redirect('/login')
    }catch(err){
        res.render('register',{error: err.message})
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

/*app.listen(8080,()=>{
    console.log("Server is running on port: 8080")
}) */