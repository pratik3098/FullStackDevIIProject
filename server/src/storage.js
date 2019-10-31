const {Storage}=require('@google-cloud/storage')
const path=require('path')
const gcs= new Storage({
    projectId: 'fullstackdeviiproject-f8413',
    keyFilename: '../../../serviceKey.json'
})
//const default_imageCloud= 'gs://fullstackdeviiproject-f8413.appspot.com/imageCloud/'
//const default_userImg='gs://fullstackdeviiproject-f8413.appspot.com/userImages/'
const default_imageCloud= 'imageCloud/'
const default_userImg='userImages'

async function getBuckets(){
  try{
    const [metadata] = await gcs.bucket("gs://fullstackdeviiproject-f8413.appspot.com").getMetadata();

  for (const [key, value] of Object.entries(metadata)) {
    console.log(`${key}: ${value}`);
  }
  }
  catch(err){
    console.error(err)
  }
}

exports.adduserBucket= function adduserBucket(username){
   username=username.toLowerCase()
   let bucketName= "/imageCloud/"+username//default_imageCloud
   gcs.createBucket(bucketName)
  .then(() => {
    console.log("Log: Bucket creation success");
  })
  .catch(err => {
    console.error('Error: Bucket creation failure', err);
  });
}
exports.adduserProfilePic=async function adduserProfilePic(username, filename){
  username=username.toLowerCase()
  filename=filename.toLowerCase()
  file
  if(filename.charAt(filename.length-1)=='/')
     filename[filename.length-1]=' '
  try{
   await gcs.bucket(default_userImg).upload(filename,{
    gzip: true,
    metadata:{
       cacheControl: 'public, max-age=31536000'
    },
  }
  )
  console.log("Log: File upload success")
  } catch(err){
    console.error('Error: Cannot upload file', err)
  } 
  let names=filename.split('/')
  let name=names[names.length-1]
   
  await gcs.bucket(default_userImg).file(name).move(username).then(()=>{
    console.log("Log: File rename success")
  }).catch(err=>{
    console.error('Error: Cannot rename file', err)
  })
  
}
exports.addUserImage=async function addUserImage(username,filename){
  username=username.toLowerCase()
  filename=filename.toLowerCase()
  if(filename.charAt(filename.length-1)=='/')
  filename[filename.length-1]=' '
  let bucketName= default_imageCloud+ username
  await gcs.bucket().upload(path.join(__dirname,filename),{
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
exports.deleteUserStorage=async function deleteUserStorage(username){
    username=username.toLowerCase()
  
    let bucketName= default_imageCloud+ username
    await gcs.bucket(bucketName).delete().then(()=>{
      console.log("Log: File deletion sucess")
    }).catch(err => {
        console.error('Error: Cannot delete file',err)
    })
    await gcs.bucket(default_userImg).file(username).then(()=>{
      console.log("Log: File deletion sucess")
    }).delete().catch(err=>{
        console.error(`Error: Cannot remove file ${username}`,err)
    })   
}
exports.deleteImageFile=async function deleteImageFile(username,filename){
    username=username.toLowerCase()
    filename=filename.toLowerCase()
    let bucketName= default_imageCloud+ username
    await gcs.bucket(bucketName).file(filename).delete().then(()=>{
       console.log("Log: File deletion sucess")
    }).catch(err=>{
         console.error('Error: Cannot remove file',err)
    })
}
exports.getImageFile=async function getImageFile(username, filename){
  username=username.toLowerCase()
  filename=filename.toLowerCase()
  let bucketName= default_imageCloud + username
  await gcs.bucket(bucketName).file(filename).download({
    destination: "../user_data/" + filename,
  }).then(()=>{
     console.log("Log: File download success")
  }).catch(err=>{
     console.error('Error: Cannot download file',err)
  })
}
exports.getImageList=async function(username){
  username=username.toLowerCase()
  let bucketName= default_imageCloud + username
  let files = await gcs.bucket(bucketName).getFiles()
  return files
}
exports.getImageCount=async function(username){
  username=username.toLowerCase()
  let files= await this.getImageList(username)
  return files.count
} 
try{
// /*this.adduserBucket('Pratik')
 //this.adduserProfilePic('Pratik','../user_data/user.png')
 //this.addUserImage('Pratik',"../1.jpg")
// this.getImageFile('Pratik','1.jpg')
 //this.deleteImageFile('Pratik','1.jpg')
 //this.deleteUserStorage('Pratik') 
 

}
catch(err){
  console.log(err)
}

console.log(path.join(__dirname,"../user_data/"))