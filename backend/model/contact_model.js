const mongosh=require('mongoose')
const validator=require('validator')
const webtoken=require("jsonwebtoken")
const ContactSchema=new mongosh.Schema({
    name:{
        type:String,
        maxlength:[1000,"Enter the blog title with in 1000 words"]
    },
    email:{
        type:String,
        required:[true,"Enter your email"],
        validator:[validator.isEmail,"Enter the valid email "]
    },
    subject:{
        type:String,
        require:[true,"Enter your Blog Discription"],
        maxlength:[1000,"Enter the Blog Discription with in 1000 words"]
    },
    feedback:{
        type:String,
        trim:true,
        require:[true,"Enter your Blog Discription"]
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    
})

ContactSchema.methods.jsonwebtoken= function(){
    return webtoken.sign({id:this.id},process.env.NET_TOKEN,{
        expiresIn:process.env.NET_EXPIRES_TIME
    })
}

let schema=mongosh.model('contact',ContactSchema)
module.exports=schema;
// image:[
//     {
//         image:{
//             type:String,
//             require:true
//         }
//     }
// ],
