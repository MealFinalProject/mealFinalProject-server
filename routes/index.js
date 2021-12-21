const router       = require("express").Router();
const authRoutes   = require("./auth");
const userRoutes   = require("./user");

const favsController = require("../controllers/favs")
const commentController = require("../controllers/comments")
const searchController = require("../controllers/search")
const usersSearchController = require("../controllers/usersSearch");

/* GET home page */
router.get("/", (req, res, next) => {
  console.log("get gome page")
  res.json("All good in here");
});

// Auth
router.use("/auth", authRoutes);
// User
router.use("/", userRoutes);
// Search
router.get("/search/results/:q", searchController.searchRecipes);
router.get("/search-one/:id", searchController.searchOneRecipe);
router.get("/category/country/:name", searchController.searchRecipesByCategory);
router.get("/category/time/:name", searchController.searchRecipesByDaytime);
router.get("/category/fastrecipes", searchController.searchRecipesByExecutionTime);
router.get("/category/cocktails", searchController.searchCocktails);
// Favs
router.get("/favs/get-fav-number", favsController.getFavNumber);
router.put("/favs/add-fav-recipe", favsController.addFav);
router.delete("/favs/delete-fav-recipe", favsController.deleteFav);
//Comments
router.post("/comments/add-new-comment", commentController.addComment);
router.delete("/comments/delete-comment", commentController.deleteComment);
router.get("/comments/get-user-comments", commentController.getUserComments);
router.get("/comments/get-recipe-comments", commentController.getRecipeComments);
// Users search
router.get("/users/search", usersSearchController.getAllUsers);
router.put("/users/follow/:id", usersSearchController.followUser);
router.put("/users/unfollow/:id", usersSearchController.unfollowUser);
router.get("/user/:id", usersSearchController.getUser);


module.exports = router;
