const mongoose=require('mongoose')
const becrypt=require('bcryptjs')
const jwt= require('jsonwebtoken')
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Provied the name  '],
        minlength:3,
        maxlength:50

    },
    email:{
        type:String,
        required:[true,'Please Provied the emial  '],
        
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please Provide Valid Email']
,
unique:true
    },
    password:{
        type:String,
        required:[true,'Please Provied the password  '],
        minlength:6,
        

    },
})
UserSchema.pre('save',async function(){
    const salt= await becrypt.genSalt(10);
    this.password=await becrypt.hash(this.password,salt)
   
})
UserSchema.methods.createJWT=function(){
    return jwt.sign({userId:this._id,userName:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
UserSchema.methods.comparePassowrd=async function(canditatePassword){
    const isMatch=await becrypt.compare(canditatePassword,this.password)
    return isMatch
}
module.exports=mongoose.model('User',UserSchema)