const admin= require('firebase-admin')
const firebasepath =require('firebase')
const firebase = firebasepath.initializeApp({ 
  apiKey: 'AIzaSyDzZ3EvtGsdX8yGpv7ySn0w2OS2Ov5-JuU',
  projectId: 'fullstackdeviiproject-f8413',
  storageBucket: 'gs://fullstackdeviiproject-f8413.appspot.com/'
  //authDomain: '<your-auth-domain>',
  //databaseURL: '<your-database-url>',
  //messagingSenderId: '<your-sender-id>'
  })
admin.initializeApp({
  credential: admin.credential.cert("../../../serviceKey.json"),
  storageBucket: 'gs://fullstackdeviiproject-f8413.appspot.com/'
})
let bucket = admin.storage().bucket()