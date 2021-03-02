const jwt=require('jsonwebtoken')
const User=require('../models/user')


const auth=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt
        const verifyUser=jwt.verify(token,"thisisakeyofuserathenticationandverification")
        console.log(verifyUser);


        const user=await User.findOne({_id:verifyUser._id})
        console.log(user);
        next()
    } catch (error) {
        res.status(404).send(error)
    }
}


module.exports=auth;