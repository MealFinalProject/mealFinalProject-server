const router = require("express").Router();
const axios = require('axios');
const {isLoggedIn} = require("../middleware/route-guard")

// API
const API_ID = process.env.API_ID
const API_KEY = process.env.API_KEY


/* GET search recipes */
router.get("/search", async (req, res, next) => {
    console.log(req.query)
    console.log(res.locals)
    const search = req.query.title
    try {
        const axiosCall = await axios(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${API_ID}&app_key=${API_KEY}`
        );
        const recipesInfo = axiosCall.data; 
        console.log(recipesInfo)
      } catch (err) {
        console.log(err);
    }
});