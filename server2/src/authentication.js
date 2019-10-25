'use strict'
const firebase=require['firebase']
const auth=firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('profile')
provider.addScope('email')
auth.signInWithPopup(provider).then(function(result) {
    let token = result.credential.accessToken;
    let user = result.user;
})
