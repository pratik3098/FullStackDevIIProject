const path=require('path')
const auth=require('./authentication')
const storage=require('./storage')
const database=require('./database')

exports.registerUser=function registerUser(firstName,lastName,userName,email,password){
  try{
   firstName=firstName.toLowerCase()
   lastName=lastName.toLowerCase()
   email=email.toLowerCase()
   passowrd=password.toLowerCase()
   if(userName && userName.trim().length>0)
     userName=userName.toLowerCase()
   else
     userName=email.split("@")[0]
  auth.emailSignUp(userName,email,password).catch(err=>{
    console.error(err.message)
  })
}catch(err){
  console.error('Error: Signing up user')
}
  try{
    database.setUserData(userName,{
    userName  : userName,
    firstName : firstName,
    lastName  : lastName,
    email     : email,
    password  : password,
    profilePhoto: `userImages/${userName}.png`,
    imageGallery: `imageCloud/${userName}/`
  })
  filepath=path.resolve(__dirname,`../user_data/${userName}/profile.png`)
  storage.adduserProfilePic(userName,filepath)
} catch(err){ 
      throw err
}
}

//this.registerUser("pratik","patil","pratik3099","pratik3099@gmail.com","12345dddd6")