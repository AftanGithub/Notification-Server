const bcrypt = require('bcryptjs');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');


exports.registerUser = async (req,res)=>{
    try{
        const {username,password} = req.body;
        const existingUser = await User.findOne({where:{username}});
        if(existingUser) return res.status(400).json({message:"User with this username already exists!"});

        const hashedPass = await bcrypt.hash(password,10);

        const user = await User.create({username,password:hashedPass});

        res.status(201).json({message:"User Registered Sucessfully!",user});
    }catch(err){
        console.log(err);
        res.status(500).json({message:err?.message});
    }
}


exports.loginUser = async (req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({where:{username}});
        if(!user) return res.status(400).json({message:"User not registered!"});

        const isMatching = await bcrypt.compare(password,user.password);
        if(!isMatching) return res.status(400).json({message:"Invalid Password!"});
        const token = jwt.sign({id:user.id,username:user.username},jwtConfig.secretKey,{expiresIn:jwtConfig.expiresIn});

        res.json({token});
    }catch(err){
        console.log(err);
        res.status(500).json({message:err?.message});
    }
}

