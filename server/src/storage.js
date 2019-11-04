const {Storage}=require('@google-cloud/storage')
const path=require('path')
const gcs= new Storage({
    projectId: 'fullstackdeviiproject-f8413',
    keyFilename: '../serviceKey.json'
}).bucket('gs://fullstackdeviiproject-f8413.appspot.com')

const default_imageCloud= 'imageCloud'
const default_userImg='userImages'

exports.adduserProfilePic=function adduserProfilePic(username, filename){
  username=username.toLowerCase()
  filename=filename.toLowerCase()
  filename=path.basename(filename)
  //filepath=path.resolve(__dirname,`../user_data/${default_userImg}/${username}/${filename}`)
  filepath=path.resolve(__dirname,`../user_data/${default_userImg}/${filename}`)
  let ext=filepath.split('.')
  filename=username+'.'+ext[ext.length-1]
    Promise.resolve(gcs.upload(filepath,{
    destination: `${default_userImg}/${filename}`,
    gzip: true,
    metadata:{
       cacheControl: 'public, max-age=31536000'
    },
  })).then(()=>{ console.log("Log: File upload success") }).catch((err)=>{
    console.error('Error: Cannot upload file')
    throw err
  })
  
}
exports.addImagebyUser=function addImagebyUser(username,filename){
  username=username.toLowerCase()
  filename=filename.toLowerCase()
  filename=path.basename(filename)
  filepath=path.resolve(__dirname,`../user_data/${default_imageCloud}/${username}/${filename}`)
    Promise.resolve(gcs.upload(filepath,{
    destination: `${default_imageCloud}/${username}/${filename}`,
    gzip: true,
    metadata:{
       cacheControl: 'public, max-age=31536000'
    },
  })).then(()=>{ console.log("Log: File upload success")})
  .catch(err=>{
      throw err
  })
}

exports.deleteUserStorage=function deleteUserStorage(username){
    username=username.toLowerCase()
    let userProfile=`${default_userImg}/${username}.jpg`
   
    Promise.resolve(gcs.deleteFiles({prefix: `${default_imageCloud}/${username}/`})).then(()=>{
        console.log('Log: '+username+' bucket deletion sucess')
    }).catch(err=>{
        console.error('Error: Cannot delete user bucket')
        throw (err)
    })
      

    Promise.resolve(gcs.file(userProfile).delete()).then(()=>{ console.log("Log: User Image deletion sucess")}).catch(err=>{
        console.error('Error: Cannot delete user image')
        throw (err)
    })
  

}
exports.deleteImageFile=function deleteImageFile(username,filename){
    username=username.toLowerCase()
    filename=path.basename(filename)
    filename=filename.toLowerCase()
    filename=`${default_imageCloud}/${username}/${filename}`
    
    Promise.resolve(gcs.file(filename).delete()).then(res=>{
        console.log('Log: '+filename+' deletion sucess')
    }).catch(err=>{ 
    console.error('Error: Cannot remove '+filename)
    throw (err)})
    
   
}
exports.getImageFile=function getImageFile(username, filename){
  username=username.toLowerCase()
  filename=filename.toLowerCase()
  filename=path.basename(filename)
  filepath=path.resolve(__dirname,`../user_data/${default_imageCloud}/${filename}`)

  Promise.resolve(gcs.file(`${default_imageCloud}/${username}/${filename}`).download({
    destination: filepath,
    validation: false
  })).then(function(){console.log("Log: File download success")}).catch(err=>{
  console.error('Error: Cannot download file')
    throw (err) })
  
}
exports.getImageList=async function getImageList(username){
  username=username.toLowerCase()
  let files = await gcs.getFiles({prefix: `${default_imageCloud}/${username}}`})
  //console.log(files)
  return files
  
}
exports.getImageCount=async function getImageCount(username){
  username=username.toLowerCase()
  let files= await this.getImageList(username)
  return files.length
} 
