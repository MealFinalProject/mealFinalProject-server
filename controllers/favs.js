const favsService = require("../services/favs")

/**
 * @api {get} /api/favs/get-fav-number Get Recipe Number Of Favs
 * @apiName GetRecipeNumberOfFavs
 * @apiGroup Favs
 * @apiVersion  1.0.0
 * @apiDescription Get favs number from a recipe
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/favs/get-fav-number?idApiRecipe=${id}`)
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
 * @apiParam {String} idApiRecipe Recipe's unique API ID.
 *
 * @apiSuccess {Object} numberOfLikes Recipe Number of Favs.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   { 
 *       "numberOfLikes": 4
 *   }
 * 
 * @apiError (400) {Object} Query Query must be a string.
 * @apiErrorExample {json} Error response: Query
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad Request"
 *          ]
 *      }
 * 
 * @apiError (404) {Object} Query Query must have a idApiRecipe field.
 * @apiErrorExample {json} Error response: Recipe not found
 * HTTP/1.1 404 Not Found
 *      {
 *          "errorMessage": [
 *              "Recipe not found"
 *          ]
 *      }
 * 
 * 
 */
const getFavNumber = async (req, res) => {
    if(!req.query || Object.keys(req.query).length === 0) return res.status(400).json({ errorMessage: "Bad Request" });

    const { idApiRecipe } = req.query;
    if (!idApiRecipe) return res.status(404).json({ errorMessage: "Recipe not found" });

    try{
        const result = await favsService.getFavNumber(idApiRecipe)
        return res.status(result.status).json(result.data)
    } catch(err) {
        console.log(err);
        return res.status(400).json({ errorMessage: "Bad request: " + err });
    }
}

/**
 * @api {put} /api/favs/add-fav-recipe Add New Fav
 * @apiName AddFav
 * @apiGroup Favs
 * @apiVersion  1.0.0
 * @apiDescription Add a new fav in a recipe
 * @apiExample {js} Example usage:
 *      axios.put("http://localhost:5005/api/favs/add-fav-recipe", {
 *       data: {
 *         idUser: user._id,
 *         idApiRecipe: id,
 *         nameRecipe: label,
 *         photoRecipe: image
 *       }
 *      })
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
 * @apiParam (Body) {Object} idUser User's unique ID.
 * @apiParam (Body) {Object} idApiRecipe Recipe's unique API ID.
 * @apiParam (Body) {Object} nameRecipe Name of the recipe.
 * @apiParam (Body) {Object} photoRecipe Image URL.
 *
 * @apiSuccess {Object} message  Successfull message: "Fav added".
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "message": "Fav added"
 *   }
 * 
 * @apiError (400) {Object} BodyFormat Body must be a json with idUser, idApiRecipe, nameRecipe and photoRecipe values.
 * @apiErrorExample {json} Error response: Body
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad Request",
 *              "User not found",
 *              "Bad Request: recipe info"
 *          ]
 *      }
 * 
 * 
 * @apiError (404) {Object} Database User must exist in the database
 * @apiErrorExample {json} Error response: User not found
 * HTTP/1.1 404 Not Found
 *      {
 *          "errorMessage": [
 *              "User not found"
 *          ]
 *      }
 * 
 * 
 */
const addFav = async (req, res) => {
  if(!req.body.data) return res.status(400).json({ errorMessage: "Bad Request" });
  const { idUser, idApiRecipe, nameRecipe, photoRecipe } = req.body.data;
  if (!idUser) return res.status(400).json({ errorMessage: "User not found" });
  if (!idApiRecipe || !nameRecipe || !photoRecipe) return res.status(400).json({ errorMessage: "Bad Request: recipe info" });

  try {
    const result = await favsService.addFav(idUser, idApiRecipe, nameRecipe, photoRecipe)
    return res.status(result.status).json(result.data)
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Bad request: " + err });
  }
}

/**
 * @api {delete} /api/favs/delete-fav-recipe Delete Fav
 * @apiName DeleteFav
 * @apiGroup Favs
 * @apiVersion  1.0.0
 * @apiDescription Delete a fav in a recipe
 * @apiExample {js} Example usage:
 *      axios.delete("http://localhost:5005/api/favs/delete-fav-recipe", {
 *         idUser: user._id,
 *         idApiRecipe: id
 *      })
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
 * @apiParam (Body) {Object} idUser User's unique ID.
 * @apiParam (Body) {Object} idApiRecipe Recipe's unique API ID.
 *
 * @apiSuccess {Object} message  Successfull message: "Fav deleted".
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "message": "Fav deleted"
 *   }
 * 
 * @apiError (400) {Object} BodyFormat Body must be a json with idUser and idApiRecipe values.
 * @apiErrorExample {json} Error response: Body
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad Request",
 *              "Bad Request: User info",
 *              "Bad Request: recipe info"
 *          ]
 *      }
 * 
 * 
 * @apiError (404) {Object} Database User and recipe must exist in the database. User must have targeted recipe in favs list
 * @apiErrorExample {json} Error response: User and recipe not found
 * HTTP/1.1 404 Not Found
 *      {
 *          "errorMessage": [
 *              "User not found",
 *              "Recipe not found",
 *              "Recipe not fav"
 *          ]
 *      }
 * 
 * 
 */
const deleteFav = async (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0) return res.status(400).json({ errorMessage: "Bad Request" });
    const { idUser, idApiRecipe } = req.body;
    if(!idUser) return res.status(400).json({ errorMessage: "Bad Request: user info" });
    if(!idApiRecipe) return res.status(400).json({ errorMessage: "Bad Request: recipe info" });
    try {
        const result = await favsService.deleteFav(idUser, idApiRecipe)
        return res.status(result.status).json(result.data)
    } catch (err) {
      console.log(err);
      return res.status(400).json({ errorMessage: "Bad request: " + err });
    }
}

module.exports = {getFavNumber, addFav, deleteFav};