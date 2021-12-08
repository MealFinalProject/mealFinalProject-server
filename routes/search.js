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
        res.status(200).json(recipesInfo);
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
        res.status(200).json(recipeInfo);
      } catch (err) {
        console.log(err);
    }
});

/* GET search category   */
router.get("/category", async (req, res, next) => {
    const category = req.query.category
    try {
        const axiosCall = await axios(
            `https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&cuisineType=${category}&random=true`
         );
        const apiInfo = axiosCall.data.hits; 
        // Get ID and push it in the object
        const recipesInfo = apiInfo.map(element => {
            const index = element.recipe.uri.lastIndexOf("_") + 1
            const id = element.recipe.uri.substr(index)
            element.recipe.id = id;
            return element
        })
        res.status(200).json(recipesInfo);
      } catch (err) {
        console.log(err);
    }
});

//Time between 5-20
//https://api.edamam.com/api/recipes/v2?type=public&app_id=aa72dc35&app_key=31d90debe31c5d2e3e9d132e26b9b768&time=5-20&random=true


/* GET search time below 20mins   */
router.get("/fastrecipes", async (req, res, next) => {
    const time = "1-20"
    try {
        const axiosCall = await axios(
            `https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&time=${time}&random=true`
         );
        const apiInfo = axiosCall.data.hits; 
        // Get ID and push it in the object
        const recipesInfo = apiInfo.map(element => {
            const index = element.recipe.uri.lastIndexOf("_") + 1
            const id = element.recipe.uri.substr(index)
            element.recipe.id = id;
            return element
        })
        res.status(200).json(recipesInfo);
      } catch (err) {
        console.log(err);
    }
});
// Cocktail
// https://api.edamam.com/api/recipes/v2?type=public&app_id=aa72dc35&app_key=31d90debe31c5d2e3e9d132e26b9b768&health=alcohol-cocktail&random=true

/* GET search cocktails   */
router.get("/cocktails", async (req, res, next) => {
    try {
        const axiosCall = await axios(
            `https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&health=alcohol-cocktail&random=true`
         );
        const apiInfo = axiosCall.data.hits; 
        // Get ID and push it in the object
        const recipesInfo = apiInfo.map(element => {
            const index = element.recipe.uri.lastIndexOf("_") + 1
            const id = element.recipe.uri.substr(index)
            element.recipe.id = id;
            return element
        })
        res.status(200).json(recipesInfo);
      } catch (err) {
        console.log(err);
    }
});

module.exports = router;