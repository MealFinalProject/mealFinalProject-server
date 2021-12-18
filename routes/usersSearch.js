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

router.put("/users/search/:id", async (req, res, next) => {
    try{

        return res.status(200).json('hola')
    } catch(err){
        return res.status(500).json({ errorMessage: err.message })
    }
})

module.exports = router;