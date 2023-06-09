const CustomError = require("../../../helpers/errors/CustomError");

const customErrorHandler = (err,req,res,next)=>{

    let customError = err;

    console.log(err)



  if (err.name === "SyntaxError"){
    customError = new CustomError("Unexpected Syntax",400);
  }

  if(err.name === "ValidationError"){
    customError = new CustomError(err.message, 400)
  }

  if(err.name === "CastError"){
    customError = new CustomError("Please provide a valid id",400);
  }

  if(err.code === 11000){
    //Duplicate key
    customError = new CustomError("Duplicate Key found: Check your input or rectify",400)
  }
  console.log(customError.message)

    res.status(customError.status || 500)
    .json({
      success:false,
      message: customError.message,
      error: customError
    })
  };
  
  module.exports = customErrorHandler
