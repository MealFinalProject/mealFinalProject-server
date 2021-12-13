const router = require("express").Router();

const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");
const Comment = require("../models/Comment.model");

/* POST create new comment, add comment to current user and selected recipe. Create recipe if it do not exist en DB */
router.post("/add-new-comment", async (req, res) => {
  if(!req.body.data) return res.status(400).json({ errorMessage: "Bad Request" });
  const { idUser, idApiRecipe, nameRecipe, photoRecipe, content } = req.body.data;
  if (!idUser) return res.status(404).json({ errorMessage: "User not found" });
  if (!idApiRecipe || !nameRecipe || !photoRecipe) return res.status(400).json({ errorMessage: "Bad Request: recipe info" });
  if (!content || content.length < 2) return res.status(400).json({ errorMessage: "Bad Request: content is required and must have at least two characters" });
  try {
    const currentUser = await User.findById(idUser)
    if(!currentUser) return res.status(404).json({ errorMessage: "User not found" });
    let recipeTargeted = await Recipe.findOne({ idApi: idApiRecipe });
    if (!recipeTargeted) {
      recipeTargeted = await Recipe.create({
        name: nameRecipe,
        photo: photoRecipe,
        apiId: idApiRecipe,
      });
    }
    // Create comment
    const newComment = await Comment.create({
      content: content,
      username: currentUser.username,
      user: idUser,
      recipe: recipeTargeted._id,
    });
    // Add comment
    const updatedUser = await User.findByIdAndUpdate(
      idUser,
      { $push: { comments: newComment._id } },
      { new: true }
    );
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeTargeted._id,
      { $push: { comments: newComment._id } },
      { new: true }
    );
    return res.status(200).json({message: "Comment added"});
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Bad request: " + err });
  }
});

router.delete("/delete-comment", async (req, res) => {
  if(!req.body || Object.keys(req.body).length === 0) return res.status(400).json({ errorMessage: "Bad Request" });
  const { idUser, idComment } = req.body;
  if(!idUser) return res.status(400).json({ errorMessage: "Bad Request: user info" });
  if(!idComment) return res.status(400).json({ errorMessage: "Bad Request: comment info" });
  try {
    const commentTargeted = await Comment.findById(idComment);
    if (!commentTargeted) return res.status(404).json({ errorMessage: "Comment not found" });
    const { user, recipe } = commentTargeted;
    if (!user || !recipe)
      return res
        .status(409)
        .json({ errorMessage: "Invalid field in database" });
    if (user != idUser)
      return res.status(403).json({ errorMessage: "Not authorized" });
    // Delete fav
    const updatedUser = await User.findByIdAndUpdate(
      user,
      { $pull: { comments: { $in: idComment } } },
      { new: true }
    );
    if(!updatedUser)return res.status(404).json({ errorMessage: "User not found" });
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipe,
      { $pull: { comments: { $in: idComment } } },
      { new: true }
    );
    if(!updatedRecipe)return res.status(404).json({ errorMessage: "Recipe not found" });
    if (
      updatedRecipe.favs_users.length === 0 &&
      updatedRecipe.comments.length === 0
    ) {
      const deletedRecipe = await Recipe.findByIdAndDelete(recipe);
    }
    const deletedComment = await Comment.findByIdAndDelete(commentTargeted._id);
    return res.status(200).json({message: "Comment deleted"});
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Bad request: " + err });
  }
});

/* GET comments from current user */
router.get("/get-user-comments", async (req, res) => {
  if(!req.query || Object.keys(req.query).length === 0) return res.status(400).json({ errorMessage: "Bad Request" });
  const {idUser} = req.query;
  if (!idUser) return res.status(404).json({ errorMessage: "User not found" });
  try {
    const currentUser = await User.findById(idUser).populate("comments");
    if (!currentUser)
      return res.status(404).json({ errorMessage: "User not found" });
    if (!currentUser.comments) return res.status(200).json({ comments: [] });
    return res.status(200).json({ comments: currentUser.comments });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Bad request: " + err });
  }
});

/*GET comments from recipe */
router.get("/get-recipe-comments", async (req, res) => {
  if(!req.query || Object.keys(req.query).length === 0) return res.status(400).json({ errorMessage: "Bad Request" });
  const { idApiRecipe } = req.query;
  if (!idApiRecipe)
    return res.status(404).json({ errorMessage: "Recipe not found" });
  try {
    const recipeTargeted = await Recipe.findOne({
      apiId: idApiRecipe
    }).populate("comments");
    if (!recipeTargeted)
      return res.status(404).json({ errorMessage: "Recipe not found" });
    if (!recipeTargeted.comments) return res.status(200).json({ comments: [] });
    return res.status(200).json({ comments: recipeTargeted.comments });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Bad request: " + err });
  }
});

module.exports = router;
