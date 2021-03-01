const mongoose=require('mongoose')
// const validator=require('validator')
const bcrpyt=require("bcryptjs")
const { default: validator } = require('validator')
const jwt=require('jsonwebtoken')




const FreelancersSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        // unique:true
    },
    email:{
        type:String,
        unique:true,
        trim: true,
        lowercase:true,
        required:true
        // validate: [{ validator: value => isEmail(value), msg: 'Invalid email.' }]
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("INVALID EMAIL")
        //     }
            
        // }
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    
    password:{
        type:String,
        required:true
        
    },
   confirmpass:{
        type:String,
        // required:true
    }
    
})


FreelancersSchema.methods.genAuthToken=async()=>{
    console.log(this._id)
    try {
        const token= await jwt.sign({_id:this._id},"thisisakeyofuserathenticationandverification")
        console.log(token);
    } catch (error) {
        res.send(error)
        console.log('error'+ error)
    }
}


FreelancersSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrpyt.hash(this.password ,10)
        this.confirmpass=undefined;
    }
    next()
})





const User=new mongoose.model('User',FreelancersSchema)




module.exports= User;