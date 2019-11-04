const admin = require('firebase-admin')
const path=require('path')
/*admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname,'../serviceKey.json')),
    databaseURL: 'https://.firebaseio.com'
}) */
const firestore=admin.firestore()

exports.setUserData=function setUserData(userName,userData)
{  
  if(userName && userName.trim().length>0){
    userName=userName.toLowerCase()
  firestore.collection('users').doc(userName).set(userData).catch(err=>{
      throw err
  })
}
 else 
    {
      console.error("Error: userName "+userName+" not valid username")
    }
}
exports.getUserData=async function getUserData(userName)
{   
  if(userName && userName.trim().length>0){
    userName=userName.toLowerCase()
    let res= await firestore.collection('users').doc(userName).get().catch(err=>{
      console.error(err)
  })
    if(typeof res.data() === "undefined")
      return null
    else 
    return res.data()
 }
 else 
 return null
}
