const ErrorHandler= require('../utils/ErrorHandeler')
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    if(process.env.NODE_ENV == "Developement_enviroment"){
        res.status(err.statusCode).json({
            success:false,
            message:err.message,
            stack:err.stack,
            error:err
        })
    }
    if(process.env.NODE_ENV == "Production_enviroment"){
        let message=err.message;
        let error= new ErrorHandler(message)

        //validation error
        if(err.name == "validationError"){
            message=Object.values(err.errors).map(values=>values.message)
            error=new ErrorHandler(message);
        }

        //cast Error
        if(err.name="castError"){
            message=` Resource is not Found ${err.path}`,
            error=new ErrorHandler(message)
        }

        //
        res.status(err.statusCode).json({
            success:false,
            message:error.message || "internal Server Error"
        })
    }
}