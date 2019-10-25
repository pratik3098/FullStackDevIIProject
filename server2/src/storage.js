'use strict'
const {Storage}=require('@google-cloud/storage')
const gcs= new Storage({
    projectId: 'fullstackdeviiproject-f8413',
})
const default_imageCloud= 'gs://fullstackdeviiproject-f8413.appspot.com/imageCloud/'
const default_userImg='gs://fullstackdeviiproject-f8413.appspot.com/userImages/'

exports.adduserBucket= function adduserBucket(userName){
   let bucketName= default_imageCloud+ userName
   gcs.createBucket(bucketName)
  .then(() => {
    console.log("Log: Bucket creation success");
  })
  .catch(err => {
    console.error('Error:', err);
  });
}

exports.adduserProfilePic=async function adduserProfilePic(userName, pic){
  if(pic.charAt(pic.length-1)=='/')
     pic[pic.length-1]=' '
  await gcs.bucket(default_userImg).upload(pic,{
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

  let names=pic.split('/')
  let name=names[names.length-1]
   
  await gcs.bucket(default_userImg).file(name).move(userName).then(()=>{
    console.log("Log: File rename success")
  }).catch(err=>{
    console.error('Error: Cannot rename file', err)
  })
  
}
exports.addUserImages=async function addUserImage(username,filename){
  if(pic.charAt(pic.length-1)=='/')
  pic[pic.length-1]=' '
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
         console.error(`Error: Cannot remove file ${fileName}`,err)
    })
}
// this.adduserBucket('Pratik')
// this.deleteUserStorage('Pratik')