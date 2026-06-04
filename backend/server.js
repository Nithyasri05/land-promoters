const server=require('./app')
const dotevn=require('dotenv')
const path=require('path')
const datadaseconnection = require('./config/dbconnnection')

dotevn.config({path:path.join(__dirname,'config/config.env')})
datadaseconnection()

server.listen(process.env.PORT,()=>{
    console.log(`server running in the port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})