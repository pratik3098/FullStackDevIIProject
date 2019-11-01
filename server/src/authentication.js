'use strict'
const admin=require('firebase-admin')
const path=require('path')
admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname,'../../../serviceKey.json')),
    authDomain: 'fullstackdeviiproject-f8413.web.app'
})
const auth=admin.auth()
const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('profile')
provider.addScope('email')
auth.signInWithPopup(provider).then(function(result) {
    let token = result.credential.accessToken;
    let user = result.user;
})
