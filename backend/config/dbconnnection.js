const mongodb=require('mongoose')

const datadaseconnection=()=>{
    mongodb.connect(process.env.DB_LOCAL_PORT,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(
        console.log(`server running in the port ${process.env.DB_LOCAL_PORT}`)
    ).catch(err=>(
        console.log(`err`)
    ))
}
module.exports=datadaseconnection;