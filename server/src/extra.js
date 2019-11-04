//<script src="/__/firebase/7.2.3/firebase-app.js"></script>
//<script src="/__/firebase/init.js"></script>
//<script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-app.js"></script>
const firebase=require('firebase') 
firebase.initializeApp({
    apiKey: "AIzaSyDzZ3EvtGsdX8yGpv7ySn0w2OS2Ov5-JuU",
    databaseURL: "gs://fullstackdeviiproject-f8413.appspot.com",
    projectId: "fullstackdeviiproject-f8413",
})
var storage = firebase.storage();
var userName=document.querySelector("userName").nodeValue;
var default_profile='gs://fullstackdeviiproject-f8413.appspot.com/';
var ref1 = storage.refFromURL(default_profile+'/imageCloud/'+userName)
 

//var profilePic=document.getElementById("profile").src=
console.log(ref1)