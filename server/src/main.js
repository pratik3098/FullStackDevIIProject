const express=require('express')
const path=require('path')
const firebase=require('firebase')
const bodyParser= require('body-parser')
const multer=require('multer')
const app = express()
const firebaseapp = firebase.initializeApp({ 
apiKey: 'AIzaSyDzZ3EvtGsdX8yGpv7ySn0w2OS2Ov5-JuU',
authDomain: '<your-auth-domain>',
//databaseURL: '<your-database-url>',
projectId: 'fullstackdeviiproject-f8413',
//storageBucket: '<your-storage-bucket>',
//messagingSenderId: '<your-sender-id>'
})

app.set('title','My Gallery')
app.set('view engine','hbs')
app.set('views',path.join(__dirname,"../views"))
app.use(express.static("../views"))
app.use(bodyParser.urlencoded({extended: false}))

app.get('',(req,res)=>{
    
    res.render('index')    
})
app.post('/register',(req,res)=>{
    
    res.render('index')    
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/profile',(req,res)=>{
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