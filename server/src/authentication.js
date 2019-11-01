'use strict'
const admin=require('firebase-admin')
const firebase=require('firebase')
const path=require('path')
admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname,'../../../serviceKey.json')),
    authDomain: 'fullstackdeviiproject-f8413.web.app'
})
const auth=admin.auth()
const provider=new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
    'login_hint': 'user@example.com'
})
exports.emailSignUp=function emailSignUp(emailId,password){
    emailId=emailId.toLowerCase()
    auth.createUser({
        email: emailId,
        password: password
    }).then(function(res){
   // auth.createUserWithEmailAndPassword(email, password).then(function(){
        console.log(email+' signup successful')
        console.log(res)
    }).catch(err=>{
        console.error('Error: '+err.code+' '+err.message)
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
this.emailSignUp('pratik3098@gmail.com','12345554444')
