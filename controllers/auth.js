const {StatusCodes}=require('http-status-codes')

const User=require('../models/User')
const{BadRequestError, UnauthenticatedError}=require('../errors')
const jwt=require('jsonwebtoken')

const regiester = async (req,res)=>{
    const {name,email,password}=req.body
    // if(!name||!email||!password){
    //     throw new BadRequestError('Pleas Provide name email passowrd')
    // // }
    // const salt=await bcrypt.genSalt(10)
    // const hashedPassowrd= await bcrypt.hash(password,salt)
    // const tempUser={name,email,password:hashedPassowrd}

     const user= await User.create({...req.body})
    // const token=  jwt.sign({userId:user._id,userName:user.name},'jwtSecret',{expiresIn:'30d'})
    const tokent=user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token:tokent})
}
const login = async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        throw new BadRequestError('Please Provide email and  password')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Please Provide Valid Creadentials')
    }
    const isPassowrdCorrect=await user.comparePassowrd(password)
    if (!isPassowrdCorrect) {
        throw new UnauthenticatedError('Please Provide Valid Passowrd    ')
        
    }
    const token= user.createJWT()
    res.status(StatusCodes.OK).json({user:{userName:user.name},token})

}

module.exports={
    regiester,
    login
}