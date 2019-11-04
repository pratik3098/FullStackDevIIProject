const admin=require('firebase-admin')
const firebase=require('firebase')
firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
}) 
/* 
admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname,'../serviceKey.json')),
    authDomain: '.web.app'
})
*/
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
     
  })
}
exports.emailSignIn=function emailSignIn(email,password){
    Promise.resolve(client.signInWithEmailAndPassword(email, password)).then(res=>{
        console.log(email+ " sign-in successful")
        console.log(res)
    }).catch(err=>{console.error("error: "+error.code+" "+err.message)})
}

exports.signOut=function signOut(){
    Promise.resolve(client.signOut()).then(function(res){
       console.log('User sign out successful')
    }).catch(err=>{
        console.error(err)
    })
}

exports.sendResetEmail=function sendResetEmail(email){
    Promise.resolve(auth.getUserByEmail(email)).then(user=>{
        console.log(user)
    }).then(Promise.resolve(client.sendPasswordResetEmail(email))).catch(err=>{
        console.error(err)
    })
}
