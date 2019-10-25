const express=require('express')
const path=require('path')
const firebaselib=require('firebase')
const bodyParser= require('body-parser')
const app = express()
//const firebase = firebaselib.initializeApp({ ... })
app.set('title','My Gallery')
app.set('view engine','hbs')
app.set('views',path.join(__dirname,"../views"))
app.use(express.static("../views"))
app.use(bodyParser.urlencoded({extended: false}))

app.get('',(req,res)=>{
    
    res.render('index')    
})

app.listen(8080,()=>{
    console.log("Server is running on port: 8080")
})