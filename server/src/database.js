const admin = require('firebase-admin')
const path=require('path')
admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname,'../../../serviceKey.json')),
    databaseURL: 'https://fullstackdeviiproject-f8413.firebaseio.com'
})
const firestore=admin.firestore()

exports.setUserData=function setUserData(userName,userData)
{  
  userName=userName.toLowerCase()
  firestore.collection('users').doc(userName).set(userData).catch(err=>{
      throw err
  })
}
exports.getUserData=async function getUserData(userName)
{  
    userName=userName.toLowerCase()
    let res= await firestore.collection('users').doc(userName).get().catch(err=>{
      console.error(err)
  })
    if(typeof res.data() === "undefined")
      return null
    else 
    return res.data()
}
