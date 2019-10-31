const firebase=require('firebase')
const admin = require('firebase-admin')
const path=require('path')
admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname,'../../serviceKey.json')),
    databaseURL: 'https://fullstackdeviiproject-f8413.firebaseio.com'
})

const db = admin.database()

let ref = db.ref("restricted_access/secret_document")

ref.on("Pratik", function(snapshot) {
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  })