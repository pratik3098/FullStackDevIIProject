//const firebase=require('firebase')
const admin = require('firebase-admin')
const path=require('path')
admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname,'../../../serviceKey.json')),
    databaseURL: 'https://fullstackdeviiproject-f8413.firebaseio.com'
})

let database = admin.database()

//let ref = database.ref("restricted_access/secret_document")

/*ref.on("Pratik", function(snapshot) {
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  }) */
  let postData = {
    firstName: 'John',
    lastName: 'Snow',
    uid: 2
  }
  let newPostKey= database.ref('users/').push().key
  database.ref('users/3').set(postData)