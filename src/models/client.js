const mongoose=require('mongoose')
// const validator=require('validator')
const bcrpyt=require("bcryptjs")
const { default: validator } = require('validator')
const jwt=require('jsonwebtoken')




const ClientSchema=mongoose.Schema({
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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
})


ClientSchema.methods.genAuthToken= async function() {
    // console.log(this._id)
    try {
        const ctokenGen=  jwt.sign({_id:this._id.toString()},"thisisakeyofuserathenticationandverification")
        this.tokens=this.tokens.concat({token:ctokenGen})
        // console.log(token);
         await this.save()
        return ctokenGen
    } catch (error) {
        // res.send(error)
        console.log('error'+ error)
    }
}


ClientSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrpyt.hash(this.password ,10)
        this.confirmpass=undefined;
    }
    next()
})





const Client=new mongoose.model('Client',ClientSchema)




module.exports= Client;