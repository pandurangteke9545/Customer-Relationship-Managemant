const express = require('express')
const User = require('../module/user')
const userRouter = express.Router()


userRouter.get("/getUser",async(req,res)=>{

    try {
        const users = await User.findAll();
        console.log(users)
        res.status(200).json({message:"All Users Data", data:users})    
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
    
})

module.exports = {userRouter}