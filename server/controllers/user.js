const User = require('../models/usermodel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSignUp=async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password)
    {
        return res.status(400).json({message:"All fields are required"})
    }
    let user = await User.findOne({email})
    if(user){
        return res.status(400).json({error:"User already exists"})
    }
    const hashPwd=await bcrypt.hash(password,10)
    const newUser=await User.create({
        username,email,password:hashPwd
    })
    let token= jwt.sign({username:newUser.username,email,id:newUser._id},process.env.SECRET_KEY)
    return res.status(200).json({token,user:newUser})
}

const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.status(400).json({message:"All fields are required"})
    }
    let user=await User.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        let token= jwt.sign({email,id:user._id},process.env.SECRET_KEY)
        return res.status(200).json({token,user})
    }
    else{
        return res.status(400).json({error:"Invalid credentials"})
    }
}

const getUser=async(req,res)=>{
    const user = await User.findById(req.params.id)
    res.json({username:user.username,email:user.email})
}

module.exports={userSignUp,userLogin,getUser}