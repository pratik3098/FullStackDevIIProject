const admin=require('firebase-admin')
const firebase=require('firebase')
const path=require('path')
firebase.initializeApp({
    apiKey: "AIzaSyDzZ3EvtGsdX8yGpv7ySn0w2OS2Ov5-JuU",
    authDomain: "fullstackdeviiproject-f8413.firebaseapp.com",
    projectId: "fullstackdeviiproject-f8413",
})  
/*admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname,'../../../serviceKey.json')),
    authDomain: 'fullstackdeviiproject-f8413.web.app'
})*/
const auth=admin.auth()
const client=firebase.auth()

exports.emailSignUp=function emailSignUp(userName,emailId,password){
   
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
exports.emailSignIn=function emailSignIn(email,password){
    Promise.resolve(client.signInWithEmailAndPassword(email, password)).then(res=>{
        console.log(email+ " sign-up successful")
    }).catch(err=>{console.error("error: "+error.code+" "+err.message)})
}

exports.signOut=function signOut(){
    Promise.resolve(client.signOut()).then(function(res){
       console.log('User sign out successful')
    }).catch(err=>{
        console.error(err)
    })
}

