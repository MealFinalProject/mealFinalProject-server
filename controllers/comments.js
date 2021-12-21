const commentsServices = require("../services/comments")

/**
 * @api {post} /api/comments/add-new-comment Add New Comment
 * @apiName AddComment
 * @apiGroup Comments
 * @apiVersion  1.0.0
 * @apiDescription Add a new comment in a recipe
 * @apiExample {js} Example usage:
 *      axios.post("http://localhost:5005/api/comments/add-new-comment", {
 *       data: {
 *         idUser: user._id,
 *         idApiRecipe: id,
 *         nameRecipe: label,
 *         photoRecipe: image,
 *         content: content
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
 * @apiParam (Body) {Object} content Comment content.
 *
 * @apiSuccess {Object} message  Successfull message: "Comment added".
 * @apiSuccess {Object} comment  New comment.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "message": "Comment added",
 *       "newComment": {
 *           "content": "Ok",
 *           "username": "prueba",
 *           "user": "user._id",
 *           "recipe": "idApiRecipe",
 *           "_id": "_id",
 *           "createdAt": "2021-12-21T14:16:16.313Z",
 *           "updatedAt": "2021-12-21T14:16:16.313Z",
 *           "__v": 0
 *       }
 *   }
 * 
 * @apiError (400) {Object} BodyFormat Body must be a json with idUser, idApiRecipe, nameRecipe, photoRecipe and content values. Content must have at least two characters
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
 * @apiErrorExample {json} Error response: Content
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad Request: content is required and must have at least two characters"
 *          ]
 *      }
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
const addComment = async (req, res) => {
    if(!req.body.data) return res.status(400).json({ errorMessage: "Bad Request" });
    const { idUser, idApiRecipe, nameRecipe, photoRecipe, content } = req.body.data;
    if (!idUser) return res.status(400).json({ errorMessage: "User not found" });
    if (!idApiRecipe || !nameRecipe || !photoRecipe) return res.status(400).json({ errorMessage: "Bad Request: recipe info" });
    if (!content || content.length < 2) return res.status(400).json({ errorMessage: "Bad Request: content is required and must have at least two characters" });
    try {
      const result = await commentsServices.addComment(idUser, idApiRecipe, nameRecipe, photoRecipe, content)
      return res.status(result.status).json(result.data);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ errorMessage: "Bad request: " + err });
    }
}

/**
 * @api {delete} /api/comments/delete-new-comment Delete Comment
 * @apiName DeleteComment
 * @apiGroup Comments
 * @apiVersion  1.0.0
 * @apiDescription Delete a comment in a recipe
 * @apiExample {js} Example usage:
 *      axios.delete("http://localhost:5005/api/comments/delete-new-comment", {
 *         idUser: user._id,
 *         idComment: id
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
 * @apiParam (Body) {Object} idComment Comment's unique ID.
 *
 * @apiSuccess {Object} message  Successfull message: "Comment deleted".
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "message": "Comment deleted"
 *   }
 * 
 * @apiError (400) {Object} BodyFormat Body must be a json with idUser and idComment values.
 * @apiErrorExample {json} Error response: Body
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad Request",
 *              "Bad Request: User info",
 *              "Bad Request: comment info"
 *          ]
 *      }
 * 
 * @apiError (403) {Object} Authorization User only can delete his own comments
 * @apiErrorExample {json} Error response: User not authorized
 * HTTP/1.1 403 Forbidden
 *      {
 *          "errorMessage": [
 *              "Not authorized"
 *          ]
 *      }
 * 
 * @apiError (404) {Object} Database User and recipe must exist in the database
 * @apiErrorExample {json} Error response: User and recipe not found
 * HTTP/1.1 404 Not Found
 *      {
 *          "errorMessage": [
 *              "User not found",
 *              "Recipe not found"
 *          ]
 *      }
 * 
 * @apiError (409) {Object} Database Comment must include field user owner and recipe owner in database
 * @apiErrorExample {json} Error response: Invalid database object
 * HTTP/1.1 409 Conflict
 *      {
 *          "errorMessage": [
 *              "Invalid field in database"
 *          ]
 *      }
 * 
 * 
 */
const deleteComment = async (req, res) => {
  if(!req.body || Object.keys(req.body).length === 0) return res.status(400).json({ errorMessage: "Bad Request" });
  const { idUser, idComment } = req.body;
  if(!idUser) return res.status(400).json({ errorMessage: "Bad Request: user info" });
  if(!idComment) return res.status(400).json({ errorMessage: "Bad Request: comment info" });
  try {
    const result = await commentsServices.deleteComment(idUser, idComment)
    return res.status(result.status).json(result.data);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Bad request: " + err });
  }
}

/**
 * @api {get} /api/comments/get-user-comments Get User Comments
 * @apiName GetUserComments
 * @apiGroup Comments
 * @apiVersion  1.0.0
 * @apiDescription Get comments from a user
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/comments/get-user-comments?idUser=${id}`)
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
 * @apiParam {String} idUser User's unique ID.
 *
 * @apiSuccess {Object} comments User Comments List.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   { 
 *       "comments": [{
 *           "content": "Ok",
 *           "username": "prueba",
 *           "user": "user._id",
 *           "recipe": "idApiRecipe",
 *           "_id": "_id",
 *           "createdAt": "2021-12-21T14:16:16.313Z",
 *           "updatedAt": "2021-12-21T14:16:16.313Z",
 *           "__v": 0
 *       }]
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
 * @apiError (404) {Object} QueryAndDatabase Query must have a idUser field. User must exist in database
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
const getUserComments = async (req, res) => {
  if(!req.query || Object.keys(req.query).length === 0) return res.status(400).json({ errorMessage: "Bad Request" });
  const {idUser} = req.query;
  if (!idUser) return res.status(404).json({ errorMessage: "User not found" });
  try {
    const result = await commentsServices.getUserComments(idUser)
    return res.status(result.status).json(result.data);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Bad request: " + err });
  }
}

/**
 * @api {get} /api/comments/get-recipe-comments Get Recipe Comments
 * @apiName GetRecipeComments
 * @apiGroup Comments
 * @apiVersion  1.0.0
 * @apiDescription Get comments from a recipe
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/comments/get-recipe-comments?idApiRecipe=${id}`)
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
 * @apiSuccess {Object} comments Recipe Comments List.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   { 
 *       "comments": [{
 *           "content": "Ok",
 *           "username": "prueba",
 *           "user": "user._id",
 *           "recipe": "idApiRecipe",
 *           "_id": "_id",
 *           "createdAt": "2021-12-21T14:16:16.313Z",
 *           "updatedAt": "2021-12-21T14:16:16.313Z",
 *           "__v": 0
 *       }]
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
const getRecipeComments = async (req, res) => {
  if(!req.query || Object.keys(req.query).length === 0) return res.status(400).json({ errorMessage: "Bad Request" });
  const { idApiRecipe } = req.query;
  if (!idApiRecipe)
    return res.status(404).json({ errorMessage: "Recipe not found" });
  try {
    const result = await commentsServices.getRecipeComments(idApiRecipe)
    return res.status(result.status).json(result.data);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Bad request: " + err });
  }
}


module.exports = {addComment, deleteComment, getUserComments, getRecipeComments};
