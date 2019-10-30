const firebase=require['firebase']
const database=firebase.database()
database.enableLogging(true, true)




exports.refreshDatabase=function refreshDatabase(){
    database.goOnline()
}