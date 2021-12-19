const router = require("express").Router();

const { json } = require("express");
const User = require("../models/User.model");

router.get("/users/search", async (req, res, next) => {
    try{
        let allUsers = await User
        .find()
        .select('username avatar_url')
console.log('hola')
        return res.status(200).json(allUsers)
        
    } catch(err){

        return res.status(500).json({ errorMessage: err.message })
    }
    
})

router.put("/users/follow/:id", async (req, res, next) => {
    try{
        
        let userInSession   = await User.findById(req.body.data.userInSessionId)
        let userFollowed  = await User.findById(req.params.id)
       
        if(!userFollowed.followers.includes(userInSession._id)){
            userFollowed = await User.findByIdAndUpdate(
            userFollowed._id,
            { $push: { followers: userInSession._id} },
            { new: true } 
           )}

        if(!userInSession.followed.includes(userFollowed._id)){
            userInSession =  await User.findByIdAndUpdate(
            userInSession._id,
                { $push: { followed: userFollowed._id} },
                { new: true } 
               )
               return res.status(200).json({msg: 'User followed', userInSession})}
        
       
        
    } catch(err){
        return res.status(500).json({ errorMessage: err.message })
    }
})

router.put("/users/unfollow/:id", async (req, res, next) => {
    try{
        
        let userInSession   = await User.findById(req.body.data.userInSessionId)
        let userUnFollowed  = await User.findById(req.params.id)

        if(userUnFollowed.followers.includes(userInSession._id)){
            userUnFollowed = await User.findByIdAndUpdate(
            userUnFollowed._id,
            { $pull: { followers: userInSession._id} },
            { new: true } 
           )}

        if(userInSession.followed.includes(userUnFollowed._id)){
            userInSession = await User.findByIdAndUpdate(
                userInSession._id,
                { $pull: { followed: userUnFollowed._id} },
                { new: true } 
               )}
               
        return res.status(200).json({msg: 'User unfollowed', userInSession})
       
        
    } catch(err){
        return res.status(500).json({ errorMessage: err.message })
    }
})

module.exports = router;