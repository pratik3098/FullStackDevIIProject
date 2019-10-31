const {Storage}=require('@google-cloud/storage')
const path=require('path')
const gcs= new Storage({
    projectId: 'fullstackdeviiproject-f8413',
    keyFilename: '../../../serviceKey.json'
}).bucket('gs://fullstackdeviiproject-f8413.appspot.com')


const default_imageCloud= 'imageCloud'
const default_userImg='userImages'

exports.adduserProfilePic=async function adduserProfilePic(username, filename){
  username=username.toLowerCase()
  filename=filename.toLowerCase()
  filename=filename.split('/')
  filename=filename[filename.length-1]
  filepath=path.join(__dirname,`../user_data/${default_userImg}/${username}/${filename}`)

  try{
   await gcs.upload(filepath,{
    destination: `${default_userImg}/${username}/${filename}`,
    gzip: true,
    metadata:{
       cacheControl: 'public, max-age=31536000'
    },
  })
    console.log("Log: File upload success") 
  } catch(err){
    console.error('Error: Cannot upload file', err)
  } 
  
}
exports.addImagebyUser=async function addImagebyUser(username,filename){
  username=username.toLowerCase()
  filename=filename.toLowerCase()
  filename=filename.split('/')
  filename=filename[filename.length-1]
  filepath=path.join(__dirname,`../userdata/${default_imageCloud}/${username}/${filename}`)

  await gcs.upload(filepath,{
    destination: `${default_imageCloud}/${username}/${filename}`,
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
    filepath=`${default_imageCloud}/${username}`
  
    await gcs.delete().then(()=>{
      console.log("Log: File deletion sucess")
    }).catch(err => {
        console.error('Error: Cannot delete file',err)
    })
    await gcs.file(username).then(()=>{
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
 //this.adduserProfilePic('Pratik','user.png').catch(err=>{ console.error(err) })  //-- Working fine
 //this.addUserImage('Pratik',"../1.jpg")
// this.getImageFile('Pratik','1.jpg')
 //this.deleteImageFile('Pratik','1.jpg')
 //this.deleteUserStorage('Pratik') 
 

}
catch(err){
  console.log(err)
}
