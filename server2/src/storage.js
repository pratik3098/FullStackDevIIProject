'use strict'
const {Storage}=require('@google-cloud/storage')
const {google} = require('googleapis')
const oauth2Client =new google.auth.OAuth2(
  '487348274649-ohk1r76kso3c2j81e0la5q2urs4mo8k4.apps.googleusercontent.com',
  ''
)
const gcs= new Storage({
    projectId: 'fullstackdeviiproject-f8413',
    apiKey: 'AIzaSyAjzVXTW6CNfvEKUXw3C_r84vv9QtJgU9Y',
    auth: oauth2Client,
})
const default_imageCloud= 'gs://fullstackdeviiproject-f8413.appspot.com/imageCloud/'
const default_userImg='gs://fullstackdeviiproject-f8413.appspot.com/userImages/'

/*exports.adduserBucket= function adduserBucket(userName){
   let bucketName= default_imageCloud+ userName
   gcs.createBucket(bucketName)
  .then(() => {
    console.log("Log: Bucket creation success");
  })
  .catch(err => {
    console.error('Error: Bucket creation failure', err);
  });
}

exports.adduserProfilePic=async function adduserProfilePic(userName, filename){
  if(filename.charAt(filename.length-1)=='/')
     filename[filename.length-1]=' '
  await gcs.bucket(default_userImg).upload(filename,{
    gzip: true,
    metadata:{
       cacheControl: 'public, max-age=31536000'
    },
  }
  ).then(()=>{
    console.log("Log: File upload success")
  }).catch(err=>{
    console.error('Error: Cannot upload file', err)
  } 
  )

  let names=filename.split('/')
  let name=names[names.length-1]
   
  await gcs.bucket(default_userImg).file(name).move(userName).then(()=>{
    console.log("Log: File rename success")
  }).catch(err=>{
    console.error('Error: Cannot rename file', err)
  })
  
}
exports.addUserImage=async function addUserImage(username,filename){
  if(filename.charAt(filename.length-1)=='/')
  filename[filename.length-1]=' '
  let bucketName= default_imageCloud+ userName
  await gcs.bucket(bucketName).upload(filename,{
    gzip: true,
    metadata:{
       cacheControl: 'public, max-age=31536000'
    },
  }).then(()=>{
    console.log("Log: File upload success")
  }).catch(err=>{
    console.error('Error: Cannot upload file',err)
  })
}
exports.deleteUserStorage=async function deleteUserStorage(userName){
    let bucketName= default_imageCloud+ userName
    await gcs.bucket(bucketName).delete().then(()=>{
      console.log("Log: File deletion sucess")
    }).catch(err => {
        console.error('Error: Cannot delete file',err)
    })
    await gcs.bucket(default_userImg).file(userName).then(()=>{
      console.log("Log: File deletion sucess")
    }).delete().catch(err=>{
        console.error(`Error: Cannot remove file ${userName}`,err)
    })   
}
exports.deleteImageFile=async function deleteImageFile(userName,fileName){
    let bucketName= default_imageCloud+ userName
    await gcs.bucket(bucketName).file(fileName).delete().then(()=>{
       console.log("Log: File deletion sucess")
    }).catch(err=>{
         console.error('Error: Cannot remove file',err)
    })
}
exports.getImageFile=async function getImageFile(userName, fileName){
  let bucketName= default_imageCloud + userName
  await gcs.bucket(bucketName).file(fileName).download({
    destination: "../user_data/" + fileName,
  }).then(()=>{
     console.log("Log: File download success")
  }).catch(err=>{
     console.error('Error: Cannot download file',err)
  })
}
exports.getImageList=async function(username){
  let bucketName= default_imageCloud + username
  let files = await gcs.bucket(bucketName).getFiles()
  return files
}
exports.getImageCount=async function(username){
  let files= await this.getImageList(username)
  return files.count
}
try{
 this.adduserBucket('Pratik')
 /*this.adduserProfilePic('Pratik',"../user.jpg")
 this.addUserImage('Pratik',"../1.jpg")
 this.getImageFile('Pratik','1.jpg')
 this.deleteImageFile('Pratik','1.jpg')
 this.deleteUserStorage('Pratik') 
 */
}
catch(err){
  console.log(err)
}
 