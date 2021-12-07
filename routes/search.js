const router = require("express").Router();
const axios = require('axios');

// API
const API_ID = process.env.API_ID
const API_KEY = process.env.API_KEY


/* GET search recipes */
router.get("/search", async (req, res, next) => {
    const search = req.query.name
    try {
        const axiosCall = await axios(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${API_ID}&app_key=${API_KEY}`
        );
        const apiInfo = axiosCall.data.hits; 
        // Get ID and push it in the object
        const recipesInfo = apiInfo.map(element => {
            const index = element.recipe.uri.lastIndexOf("_") + 1
            const id = element.recipe.uri.substr(index)
            element.recipe.id = id;
            return element
        })
        res.json(recipesInfo[0]);
      } catch (err) {
        console.log(err);
    }
});

/* GET search individual recipe  */
router.get("/search/:id", async (req, res, next) => {
    const id = req.params.id
    try {
        const axiosCall = await axios(
            `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${API_ID}&app_key=${API_KEY}`
        );
        const recipeInfo = axiosCall.data; 
        //Add id to api response
        recipeInfo.recipe.id = id    
        res.json(recipeInfo);
      } catch (err) {
        console.log(err);
    }
});

module.exports = router;