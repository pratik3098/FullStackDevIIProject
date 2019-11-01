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
  filename=path.basename(filename)
  filepath=path.resolve(__dirname,`../user_data/${default_userImg}/${username}/${filename}`)

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
  filename=path.basename(filename)
  filepath=path.resolve(__dirname,`../user_data/${default_imageCloud}/${username}/${filename}`)

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
    let userProfile=`${default_userImg}/${username}.jpg`
    await gcs.deleteFiles({prefix: `${default_imageCloud}/${username}/`}).then(()=>{
      console.log('Log: '+username+' bucket deletion sucess')
    }).catch(err => {
        console.error('Error: Cannot delete user bucket',err)
    })
   await gcs.file(userProfile).delete().then(()=>{
      console.log("Log: User Image deletion sucess")
    }).catch(err => {
        console.error('Error: Cannot delete user image',err)
    }) 
  

}
exports.deleteImageFile=async function deleteImageFile(username,filename){
    username=username.toLowerCase()
    filename=path.basename(filename)
    filename=filename.toLowerCase()
    filename=`${default_imageCloud}/${username}/${filename}`
    await gcs.file(filename).delete().then(()=>{
       console.log('Log: '+filename+' deletion sucess')
    }).catch(err=>{
         console.error('Error: Cannot remove '+filename,err)
    })
    
}
exports.getImageFile=async function getImageFile(username, filename){
  username=username.toLowerCase()
  filename=filename.toLowerCase()
  filename=path.basename(filename)
  filepath=path.resolve(__dirname,`../user_data/${default_imageCloud}/${username}/${filename}`)
  await gcs.file(`${default_imageCloud}/${username}/${filename}`).download({
    destination: filepath,
    validation: false
  }).then(()=>{
     console.log("Log: File download success")
  }).catch(err=>{
     console.error('Error: Cannot download file',err)
  })
}
exports.getImageList=async function(username){
  username=username.toLowerCase()
  let files = await gcs.getFiles({prefix: `${default_imageCloud}/${username}}`})
  console.log(files)
  return files
  
}
exports.getImageCount=async function(username){
  username=username.toLowerCase()
  let files= await this.getImageList(username)
  console.log( "Count: " +files.length)
} 
