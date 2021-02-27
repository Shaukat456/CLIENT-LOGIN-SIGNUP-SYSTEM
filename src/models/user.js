const mongoose=require('mongoose')
// const validator=require('validator')
const bcrpyt=require("bcryptjs")
const { default: validator } = require('validator')


const VisitorSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("INVALID EMAIL")
        //     }
            
        // }
    },
    password:{
        type:String,
        required:true
        
        
        
    },
    phonenumber:{
        type:Number,
    }
    
})


VisitorSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrpyt.hash(this.password ,10)
    }
})





const User=new mongoose.model('User',VisitorSchema)


// VisitorSchema.pre('save', function(next){
//     var user = this ;
//     User.find($or [{fullname: user.fullname}, {email: user.email}],
//               function(err, users){
//       if(err) {
//         return next(err);
//       } else if(users) {
//         if (_.find(users , {email: user.email})){
//           user.invalidate('email', 'email is already registered'); 
//           next( new Error("email is already registered"));
//         }
//         else if (_.find(users , {fullname: user.fullname})){
//           user.invalidate('username', 'username is already taken'); 
//           next( new Error("username is already taken"));
//         }
//       }
//       else{
//         next();
//       }   
//     })
//   })





module.exports= User;