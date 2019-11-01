'use strict'
const admin=require('firebase-admin')
const path=require('path')
admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname,'../../../serviceKey.json')),
    authDomain: 'fullstackdeviiproject-f8413.web.app'
})
const auth=admin.auth()


exports.emailSignUp=async function emailSignUp(userName,emailId,password){
   
   emailId=emailId.toLowerCase()
   if(userName && userName.trim().length>0)
     userName=userName.toLowerCase()
   else
     userName=email.split("@")[0]

    auth.createUser({
    email: emailId,
    emailVerified: false,
    password: password,
    userName: userName,
    disabled: false
  }).then(function(){
      console.log("User "+ userName+" added")
  }).catch(err=>{
      console.error(err.message)
      throw err.message
     
  })
}
exports.getCurrentUser=function getCurrentUser(){
    let user= auth.currentUser;
    if(user)
     return user
     else 
     return null
}
exports.signOut=function signOut(){
    auth.signOut().then(function(){
       console.log('User sign out successful ')
    }).catch(err=>{
        console.error(err)
    })
}
