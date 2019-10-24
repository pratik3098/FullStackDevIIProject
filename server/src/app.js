const path=require('path')
const fs = require('fs')
const firebase=require('firebase')
const express= require('express')
const bodyParser= require('body-parser');
const app = express()
app.set('view engine','hbs')
app.set('views',path.join(__dirname,"../views"))
app.use(express.static("../views"))
app.use(bodyParser.urlencoded({extended: false}))

app.get('',(req,res)=>{
    res.render('index')    
})


app.post('/submit',(req, res)=>{
     try{
        if(isValidKey(req.body.privateKey))
          mywallet= new Wallet(req.body.privateKey,req.body.provider)
     else if(req.body.seed.length>0)
          mywallet =new Wallet(req.body.privateKey,req.body.provider,req.body.seed)
     else
          throw "Invalid key"
     }
     catch(err){ 
         res.redirect('/')
     }
    res.redirect('/mywallet')

})
app.get('/mywallet',(req,res)=>{
    if(typeof mywallet == "undefined")
      res.redirect('/')
    else
    renderWalletData(res)
})

app.listen(8080,()=>{
    console.log("Server is running on port: 8080")
}) 

