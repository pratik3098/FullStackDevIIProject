const {Storage}=require('@google-cloud/storage')
const gcs= new Storage({
    projectId: 'fullstackdeviiproject-f8413',
})
const default_imageCloud= 'gs://fullstackdeviiproject-f8413.appspot.com/imageCloud/'
const default_userImg='gs://fullstackdeviiproject-f8413.appspot.com/userImages/'
const imgCloud = gcs.bucket(default_imageCloud)
const userImg  =gcs.bucket(default_userImg)

exports.adduserBucket= function adduserBucket(userName){
   let bucketName= default_imageCloud+ userName
   gcs.createBucket(bucketName)
  .then(() => {
    console.log("Bucket successfuly created.");
  })
  .catch(err => {
    console.error('Error:', err);
  });
}

exports.adduserProfilePic=function adduserProfilePic(){
     
}

async deleteUserStorage(userName){
    let bucketName= default_imageCloud+ userName
    await gcs.bucket(bucketName).delete().catch(err => {
        console.error('Error:',err)
    })
    await gcs.bucket(default_userImg).file(userName).delete().catch(err=>{
        console.error(`Error: Cannot remove file ${userName}`,err)
    })   
}
async deleteImageFile(userName,fileName){
    let bucketName= default_imageCloud+ userName
    await gcs.bucket(bucketName).file(fileName).delete().catch(err=>{
         console.error(`Error: Cannot remove file ${fileName}`,err)
    })
}
this.adduserBucket('Pratik')
this.deleteUserStorage('Pratik')