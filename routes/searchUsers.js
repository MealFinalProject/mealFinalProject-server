const router = require("express").Router();

const { json } = require("express");
const User = require("../models/User.model");

router.get("/search/users", async (req, res, next) => {
    try{
        let allUsers = await User
        .find()
        .select('username avatar_url')

        return res.status(200).json(allUsers)

    } catch(err){

        return res.status(500).json({ errorMessage: err.message })
    }
    
})

router.put("/search/users/:id" async (rea, res, next) => {
    try{
        return res.status(200).json('hola')
    } catch(err){
        return res.status(500).json({ errorMessage: err.message })
    }
})

module.exports = router;