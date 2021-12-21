const router = require("express").Router();

const User = require("../models/User.model");

const getAllUsers = async () => {
    let allUsers = await User
    .find()
    .select('username avatar_url')
    return {status: 200, data: allUsers}
}

const followUser = async (userInSessionId, userFollowedId) => {
    let userInSession   = await User.findById(userInSessionId)
    let userFollowed  = await User.findById(userFollowedId)
    if(!userInSession || !userFollowed) return {status: 404, data: { errorMessage: "User not found" }}
    if(userFollowed.followers.includes(userInSession._id) || userInSession.followed.includes(userFollowed._id)) return {status: 400, data: { errorMessage: "Already follow" }} 
    
    userFollowed = await User.findByIdAndUpdate(
        userFollowed._id,
        { $push: { followers: userInSession._id} },
        { new: true } 
    )
    

    userInSession =  await User.findByIdAndUpdate(
        userInSession._id,
        { $push: { followed: userFollowed._id} },
        { new: true } 
        )
    return {status: 200, data: {msg: 'User followed', userInSession}}
}

const unfollowUser = async (userInSessionId, userUnFollowedId) => {
    let userInSession   = await User.findById(userInSessionId)
    let userUnFollowed  = await User.findById(userUnFollowedId)
    if(!userInSession || !userUnFollowed) return {status: 400, data: { errorMessage: "User not found" }}
    if(!userUnFollowed.followers.includes(userInSession._id) && !userInSession.followed.includes(userUnFollowed._id)) return {status: 400, data: { errorMessage: "Not follow" }} 

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
            
        return {status: 200, data: {msg: 'User unfollowed', userInSession}}
}

const getUser = async (userId) => {
    const targetedUser = await User.findById(userId).select('username avatar_url favs_recipes favs_recipes_idApi followers followed')
    .populate("favs_recipes followers followed")
    if(!targetedUser) return {status: 404, data: { errorMessage: "User not found" }}
    return {status: 200, data: {targetedUser}}
}

module.exports = {getAllUsers, followUser, unfollowUser, getUser};