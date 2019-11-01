'use strict'
//const admin=require('firebase-admin')
const firebase=require('firebase')
const path=require('path')
/*admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname,'../../../serviceKey.json')),
    authDomain: 'fullstackdeviiproject-f8413.web.app'
})*/
firebase.initializeApp({
    authDomain: 'fullstackdeviiproject-f8413.web.app',
    projectId: 'fullstackdeviiproject-f8413',
    apiKey: 'AIzaSyDzZ3EvtGsdX8yGpv7ySn0w2OS2Ov5-JuU',
})

const auth=firebase.auth()
//const provider=new firebase.auth.GoogleAuthProvider()
/*provider.setCustomParameters({
    'login_hint': 'user@example.com'
}) */
exports.emailSignUp=function emailSignUp(emailId,password){
    emailId=emailId.toLowerCase()
   auth.createUserWithEmailAndPassword(emailId,password).then(function(res){
        console.log(emailId+' signup successful')
        console.log(res)
    }).catch(err=>{
        console.error('Error: '+err.code+' '+err.message)
        throw (err)
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
        throw (err)
    })
}

