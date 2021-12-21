const searchServices = require("../services/search")

/**
 * @api {get} /api/search/results/:q Search Recipes in API 
 * @apiName SearchRecipes
 * @apiGroup Recipes
 * @apiVersion  1.0.0
 * @apiDescription Get recipes from a search in API
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/search/results/${searchText}`)
 *      .then((response) => {
 *          if(response.status === 200) {
 *              console.log("OK")
 *          } else {
 *              console.log("NOK")      
 *          }
 *      })
 *      .catch((error) => {
 *      console.error({ error });
 *      });
 * 
 * @apiParam {String} searchText Text of the search.
 *
 * @apiSuccess {Object} List List of recipes.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   [ 
 *       {
 *         recipe
 *       }
 *   ]
 * 
 * @apiError (400) {Object} ParamAndAPI Param must be a string. API must send a response with status 200.
 * @apiErrorExample {json} Error response: Param
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad Request",
 *              "Bad API response"
 *          ]
 *      }
 * 
 * 
 * 
 */
const searchRecipes = async (req, res) => {
    if(!req.params || !req.params.q) return res.status(400).json({ errorMessage: "Bad Request" });
    const search = req.params.q
    try {
        const result = await searchServices.searchRecipes(search)
        return res.status(result.status).json(result.data);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ errorMessage: "Bad request: " + err });
    }
}

/**
 * @api {get} /api/search-one/:id Search Recipe in API 
 * @apiName SearchRecipe
 * @apiGroup Recipes
 * @apiVersion  1.0.0
 * @apiDescription Get one recipe from search by id in API
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/search-one/${idAPiRecipe}`)
 *      .then((response) => {
 *          if(response.status === 200) {
 *              console.log("OK")
 *          } else {
 *              console.log("NOK")      
 *          }
 *      })
 *      .catch((error) => {
 *      console.error({ error });
 *      });
 * 
 * @apiParam {String} idAPiRecipe  Recipe's unique API ID.
 *
 * @apiSuccess {Object} Recipe One recipe.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   { 
 *     recipe
 *   }
 * 
 * @apiError (400) {Object} ParamAndAPI Param must be a string. API must send a response with status 200.
 * @apiErrorExample {json} Error response: Param
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad Request",
 *              "Bad API response"
 *          ]
 *      }
 * 
 * 
 * 
 */
const searchOneRecipe = async (req, res) => {
    if(!req.params || !req.params.id) return res.status(400).json({ errorMessage: "Bad Request" });
    const id = req.params.id
    try {
        const result = await searchServices.searchOneRecipe(id)
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ errorMessage: "Bad request: " + err });
    }
}

/**
 * @api {get} /api/category/country/:name Search Recipes by Category in API 
 * @apiName SearchByCategory
 * @apiGroup Recipes
 * @apiVersion  1.0.0
 * @apiDescription Get recipes from search by category in API
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/category/country/${category}`)
 *      .then((response) => {
 *          if(response.status === 200) {
 *              console.log("OK")
 *          } else {
 *              console.log("NOK")      
 *          }
 *      })
 *      .catch((error) => {
 *      console.error({ error });
 *      });
 * 
 * @apiParam {String} category Name of category.
 *
 * @apiSuccess {Object} List List of recipes.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   [ 
 *       {
 *         recipe
 *       }
 *   ]
 * 
 * @apiError (400) {Object} ParamAndAPI Param must be a string. API must send a response with status 200.
 * @apiErrorExample {json} Error response: Param
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad Request",
 *              "Bad API response"
 *          ]
 *      }
 * 
 * 
 * 
 */
const searchRecipesByCategory = async (req, res) => {
    if(!req.params || !req.params.name) return res.status(400).json({ errorMessage: "Bad Request" });
    const category = req.params.name
    try {
        const result = await searchServices.searchRecipesByCategory(category)
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ errorMessage: "Bad request: " + err });
    }
}

/**
 * @api {get} /api/category/time/:name Search Recipes by Daytime in API 
 * @apiName SearchByDaytime
 * @apiGroup Recipes
 * @apiVersion  1.0.0
 * @apiDescription Get recipes from search by Daytime in API
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/category/time/${daytime}`)
 *      .then((response) => {
 *          if(response.status === 200) {
 *              console.log("OK")
 *          } else {
 *              console.log("NOK")      
 *          }
 *      })
 *      .catch((error) => {
 *      console.error({ error });
 *      });
 * 
 * @apiParam {String} daytime Time of day.
 *
 * @apiSuccess {Object} List List of recipes.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   [ 
 *       {
 *         recipe
 *       }
 *   ]
 * 
 * @apiError (400) {Object} ParamAndAPI Param must be a string. API must send a response with status 200.
 * @apiErrorExample {json} Error response: Param
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad Request",
 *              "Bad API response"
 *          ]
 *      }
 * 
 * 
 * 
 */
const searchRecipesByDaytime = async (req, res) => {
    if(!req.params || !req.params.name) return res.status(400).json({ errorMessage: "Bad Request" });
    const daytime = req.params.name
    try {
        const result = await searchServices.searchRecipesByDaytime(daytime)
        return res.status(result.status).json(result.data)
    } catch (err) {
        console.log(err);
        return res.status(400).json({ errorMessage: "Bad request: " + err })
    }
}

/**
 * @api {get} /api/category/fastrecipes Search Recipes by Time of Execution (<20 mins) in API 
 * @apiName SearchByExecutionTime
 * @apiGroup Recipes
 * @apiVersion  1.0.0
 * @apiDescription Get recipes from search by execution time in API
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/category/fastrecipes`)
 *      .then((response) => {
 *          if(response.status === 200) {
 *              console.log("OK")
 *          } else {
 *              console.log("NOK")      
 *          }
 *      })
 *      .catch((error) => {
 *      console.error({ error });
 *      });
 * 
 *
 * @apiSuccess {Object} List List of recipes.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   [ 
 *       {
 *         recipe
 *       }
 *   ]
 * 
 * @apiError (400) {Object} API API must send a response with status 200.
 * @apiErrorExample {json} Error response: Param
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad API response"
 *          ]
 *      }
 * 
 * 
 * 
 */
const searchRecipesByExecutionTime = async (req, res) => {
    const time = "1-20"
    try {
        const result = await searchServices.searchRecipesByExecutionTime(time)
        return res.status(result.status).json(result.data)
    } catch (err) {
        console.log(err);
        return res.status(400).json({ errorMessage: "Bad request: " + err })
    }
}

/**
 * @api {get} /api/category/cocktails Search Recipes of cocktails in API 
 * @apiName SearchByCocktails
 * @apiGroup Recipes
 * @apiVersion  1.0.0
 * @apiDescription Get recipes of cocktails in API
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/category/cocktails`)
 *      .then((response) => {
 *          if(response.status === 200) {
 *              console.log("OK")
 *          } else {
 *              console.log("NOK")      
 *          }
 *      })
 *      .catch((error) => {
 *      console.error({ error });
 *      });
 * 
 *
 * @apiSuccess {Object} List List of recipes.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   [ 
 *       {
 *         recipe
 *       }
 *   ]
 * 
 * @apiError (400) {Object} API API must send a response with status 200.
 * @apiErrorExample {json} Error response: Param
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad API response"
 *          ]
 *      }
 * 
 * 
 * 
 */
const searchCocktails = async (req, res) => {
    try {
        const result = await searchServices.searchCocktails()
        return res.status(result.status).json(result.data)
    } catch (err) {
        console.log(err);
        return res.status(400).json({ errorMessage: "Bad request: " + err })
    }
}

module.exports = {searchRecipes, searchOneRecipe, searchRecipesByCategory, searchRecipesByDaytime, searchRecipesByExecutionTime, searchCocktails};