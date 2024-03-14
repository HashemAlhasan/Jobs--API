const mongoose=require('mongoose')
const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Please Provide company name '],
        maxlength:50,

    },
    position:{
        type:String,
        required:[true,'Please Provide posistion  name '],
        maxlength:50,
        
    },
    status:{
        type:String ,
    enum:['interview','declined', 'pending'],
    default:'pending',

    },
    createdBy:{
type:mongoose.Types.ObjectId,
ref:'User',
required:[true,'Please Provide the user ']

    },
},{timestamps:true })
module.exports=mongoose.model('Job',jobSchema)