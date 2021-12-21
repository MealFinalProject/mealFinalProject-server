const router = require("express").Router();

const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");
const Comment = require("../models/Comment.model");

/* POST create new comment, add comment to current user and selected recipe. Create recipe if it do not exist en DB */
const addComment = async (idUser, idApiRecipe, nameRecipe, photoRecipe, content) => {
    const currentUser = await User.findById(idUser)
    if(!currentUser) return {status: 404, data: { errorMessage: "User not found" }}
    let recipeTargeted = await Recipe.findOne({ idApi: idApiRecipe });
    if (!recipeTargeted) {
      recipeTargeted = await Recipe.create({
        name: nameRecipe,
        photo: photoRecipe,
        idApi: idApiRecipe,
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
    return {status: 200, data: {message: "Comment added", newComment}}
}

const deleteComment = async ( idUser, idComment ) => {
    const commentTargeted = await Comment.findById(idComment);
    if (!commentTargeted) return {status: 404, data: { errorMessage: "Comment not found" }}
    const { user, recipe } = commentTargeted;
    if (!user || !recipe) return {status: 409, data: { errorMessage: "Invalid field in database" }}
    if (user != idUser) return {status: 403, data: { errorMessage: "Not authorized" }}
    // Delete fav
    const updatedUser = await User.findByIdAndUpdate(
      user,
      { $pull: { comments: { $in: idComment } } },
      { new: true }
    );
    if(!updatedUser) return {status: 404, data: { errorMessage: "User not found" }}
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipe,
      { $pull: { comments: { $in: idComment } } },
      { new: true }
    );
    if(!updatedRecipe) return {status: 404, data: { errorMessage: "Recipe not found" }}
    if (
      updatedRecipe.favs_users.length === 0 &&
      updatedRecipe.comments.length === 0
    ) {
      const deletedRecipe = await Recipe.findByIdAndDelete(recipe);
    }
    const deletedComment = await Comment.findByIdAndDelete(commentTargeted._id);
    return {status: 200, data: {message: "Comment deleted"}}
}

const getUserComments = async (idUser) => {
    const currentUser = await User.findById(idUser).populate("comments");
    if (!currentUser) return {status: 404, data: { errorMessage: "User not found" }}
    if (!currentUser.comments) return {status: 200, data: { comments: [] }}
    return {status: 200, data: { comments: currentUser.comments }}
}

const getRecipeComments = async (idApiRecipe) => {
    const recipeTargeted = await Recipe.findOne({idApi: idApiRecipe}).populate("comments");
    if (!recipeTargeted || !recipeTargeted.comments) return {status: 200, data: { comments: [] }}
    return {status: 200, data: { comments: recipeTargeted.comments }}
}

module.exports = {addComment, deleteComment, getUserComments, getRecipeComments};
