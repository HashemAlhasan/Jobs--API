const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError ={
    statusCode:err.statusCode||StatusCodes.INTERNAL_SERVER_ERROR,
    msge:err.message||'Something went wrong try again later'
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if(err.name==='CastError'){
    customError.msge=`No id find with ${err.value}`
    customError.statusCode=StatusCodes.NOT_FOUND 
  }
  if (err.name==='ValidationError'){
   // console.log(Object.values(err.errors));
    customError.msge=Object.values(err.errors).map((item)=>item.message).join(',')
    customError.statusCode=StatusCodes.BAD_REQUEST
  }
  if(err.code&& err.code===11000){
    customError.msge=`Duplicate value enterd for ${Object.keys(err.keyValue)} field please choose another value  `
    customError.statusCode=StatusCodes.BAD_REQUEST
  }
//return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg:customError.msge })
}

module.exports = errorHandlerMiddleware
