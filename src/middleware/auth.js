const jwt=require('jsonwebtoken')
const User=require('../models/user')
const Client=require('../models/client')

const auth=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt
        const verifyUser=jwt.verify(token,"thisisakeyofuserathenticationandverification")
        console.log(verifyUser);

        //Freelancer's side
        const user=await User.findOne({_id:verifyUser._id})
        console.log(user);
        

        //updated Later for client side
        const client=await Client.findOne({_id:verifyUser._id})
        console.log(client)
        
        
        next()
    } catch (error) {
        res.status(404).send(error)
    }
}


module.exports=auth;