const usersSearchServices = require("../services/usersSearch")

/**
 * @api {get} /api/users/search Get all user in database
 * @apiName GetAllUsers
 * @apiGroup Users
 * @apiVersion  1.0.0
 * @apiDescription Get all user in database
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/users/search`)
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
 * @apiSuccess {Object} List List of users.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   [ 
 *       {
 *         id: user._id,
 *         username: user.username,
 *         avatar_url: user:avatar_url
 *       }
 *   ]
 * 
 */
const getAllUsers = async (req, res) => {
    try {
        const result = await usersSearchServices.getAllUsers()
        return res.status(result.status).json(result.data);
    } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Bad request: " + err });
    }
}

/**
 * @api {put} /api/users/follow/:id Follow a user
 * @apiName FollowUser
 * @apiGroup Users
 * @apiVersion  1.0.0
 * @apiDescription Follow a user
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/users/follow/${userFollowedId}`, {
 *         "data":
 *           {
 *               "userInSessionId" : "userInSession._id"
 *           }
 *       })
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
 * @apiParam {String} userFollowedId User's to follow unique ID.
 * @apiParam (Body) {Object} userInSessionId User's unique ID.
 * 
 * @apiSuccess {Object} message  Successfull message: "User followed".
 * @apiSuccess {Object} User  Updated user info.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "message": "User followed",
 *       "userInSession": {
 *         id: user._id,
 *         username: user.username,
 *         avatar_url: user:avatar_url
 *         favs_recipes: [],
 *         favs_recipes_idApi: [],
 *         comments: [],
 *         followers: [],
 *         followed: [],
 *       }
 *   }
 * 
 * @apiError (400) {Object} BodyAndParams Body must be a json with userInSessionId value. Param must be a string. User must not already follow userFollowed
 * @apiErrorExample {json} Error response: Body And Params
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad Request",
 *              "Already follow"
 *          ]
 *      }
 * 
 * @apiError (404) {Object} Database User must exist in database
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
const followUser = async (req, res) => {
    if(!req.body.data || !req.body.data.userInSessionId) return res.status(400).json({ errorMessage: "Bad Request" });
    if(!req.params || !req.params.id) return res.status(400).json({ errorMessage: "Bad Request" });
    const userInSessionId = req.body.data.userInSessionId
    const userFollowedId = req.params.id
    try{
        const result = await usersSearchServices.followUser(userInSessionId, userFollowedId)
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ errorMessage: "Bad request: " + err });
    }
}

/**
 * @api {put} /api/users/unfollow/:id Unfollow a user
 * @apiName UnfollowUser
 * @apiGroup Users
 * @apiVersion  1.0.0
 * @apiDescription Unfollow a user
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/users/unfollow/${userUnFollowedId}`, {
 *         "data":
 *           {
 *               "userInSessionId" : "userInSession._id"
 *           }
 *       })
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
 * @apiParam {String} userUnFollowedId User's to unfollow unique ID.
 * @apiParam (Body) {Object} userInSessionId User's unique ID.
 * 
 * @apiSuccess {Object} message  Successfull message: "User unfollowed".
 * @apiSuccess {Object} User  Updated user info.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "message": "User unfollowed",
 *       "userInSession": {
 *         id: user._id,
 *         username: user.username,
 *         avatar_url: user:avatar_url
 *         favs_recipes: [],
 *         favs_recipes_idApi: [],
 *         comments: [],
 *         followers: [],
 *         followed: [],
 *       }
 *   }
 * 
 * @apiError (400) {Object} BodyAndParams Body must be a json with userInSessionId value. Param must be a string. User must  follow userUnfollowed
 * @apiErrorExample {json} Error response: Body And Params
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad Request",
 *              "Not follow"
 *          ]
 *      }
 * 
 * @apiError (404) {Object} Database User must exist in database
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
const unfollowUser = async (req, res) => {
    if(!req.body.data || !req.body.data.userInSessionId) return res.status(400).json({ errorMessage: "Bad Request" });
    if(!req.params || !req.params.id) return res.status(400).json({ errorMessage: "Bad Request" });
    const userInSessionId = req.body.data.userInSessionId
    const userUnFollowedId = req.params.id
    try{
        const result = await usersSearchServices.unfollowUser(userInSessionId, userUnFollowedId)
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ errorMessage: "Bad request: " + err });
    }
}

/**
 * @api {get} /api/user/:id Get user by id in database
 * @apiName GetUserById
 * @apiGroup Users
 * @apiVersion  1.0.0
 * @apiDescription Get user by id in database
 * @apiExample {js} Example usage:
 *      axios.get(`http://localhost:5005/api/user/${idUser}`)
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
 * @apiSuccess {Object} targetedUser User by ID.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   { 
 *       targetedUser: {
 *         id: user._id,
 *         username: user.username,
 *         avatar_url: user:avatar_url
 *         favs_recipes: [],
 *         favs_recipes_idApi: [],
 *         comments: [],
 *         followers: [],
 *         followed: [],
 *       }
 *   }
 * 
 * @apiError (400) {Object} Param Param must be a string.
 * @apiErrorExample {json} Error response: Param
 * HTTP/1.1 400 Bad Request
 *      {
 *          "errorMessage": [
 *              "Bad Request"
 *          ]
 *      }
 * 
 * @apiError (404) {Object} Database User must exist in database
 * @apiErrorExample {json} Error response: User not found
 * HTTP/1.1 404 Not Found
 *      {
 *          "errorMessage": [
 *              "User not found"
 *          ]
 *      }
 * 
 * 
 * 
 */
const getUser = async (req, res) => {
    if(!req.params || !req.params.id) return res.status(400).json({ errorMessage: "Bad Request" });
    const userId = req.params.id
    try{
        const result = await usersSearchServices.getUser(userId)
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ errorMessage: "Bad request: " + err });
    }
}

module.exports = {getAllUsers, followUser, unfollowUser, getUser};