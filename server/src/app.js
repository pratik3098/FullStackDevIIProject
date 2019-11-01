const path=require('path')
const auth=require('./authentication')
const storage=require('./storage')
const database=require('./database')

exports.registerUser=function registerUser(firstName,lastName,userName,email,password){
 // try{
   firstName=firstName.toLowerCase()
   lastName=lastName.toLowerCase()
   email=email.toLowerCase()
   passowrd=password.toLowerCase()
   if(userName && userName.trim().length>0)
     userName=userName.toLowerCase()
   else
     userName=email.split("@")[0]
  auth.emailSignUp(email,password).catch(function(err){
       throw (err)
  })
  database.setUserData(userName,{
    userName  : userName,
    firstName : firstName,
    lastName  : lastName,
    email     : email,
    password  : password     
  }).catch(err=>{
    throw (err)
  })
  filepath=path.resolve(__dirname,`../user_data/${userName}/profile.png`)
  storage.adduserProfilePic(userName,filepath).catch(err=>{
    throw err
  })
}
//catch(err){}

this.registerUser("pratik","patil","pratik3098","pratik3098@gmail.com","123456")