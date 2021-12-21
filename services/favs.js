const router = require("express").Router();

const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");


const addFav = async (idUser, idApiRecipe, nameRecipe, photoRecipe) => {

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
  // Add fav
  const updatedUser = await User.findByIdAndUpdate(
    idUser,
    { $push: { favs_recipes: recipeTargeted._id, favs_recipes_idApi: idApiRecipe } },
    { new: true }
  );
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    recipeTargeted._id,
    { $push: { favs_users: idUser } },
    { new: true }
  );
  return {status: 200, data: {message: "Fav added"}}

}

const deleteFav = async (idUser, idApiRecipe) => {
  const currentUser = await User.findById(idUser)
  if(!currentUser) return {status: 404, data: { errorMessage: "User not found" }}
  const recipeTargeted = await Recipe.findOne({ idApi: idApiRecipe });
  if(!recipeTargeted) return {status: 404, data: {errorMessage: "Recipe not found"}}
  if(!currentUser.favs_recipes_idApi.includes(idApiRecipe)) return {status: 404, data: {errorMessage: "Recipe not fav"}}
  // Delete fav
  const updatedUser = await User.findByIdAndUpdate(
    idUser,
    { $pull: { favs_recipes: { $in: recipeTargeted._id },  favs_recipes_idApi: { $in: idApiRecipe } } },
    { new: true }
  );
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    recipeTargeted._id,
    { $pull: { favs_users: { $in: idUser } } },
    { new: true }
  );
  if(updatedRecipe.favs_users.length === 0 && updatedRecipe.comments.length === 0){
      const deletedRecipe = await Recipe.findByIdAndDelete(updatedRecipe._id)
  }
  return {status:200, data:{message: "Fav deleted"}}

}

const getFavNumber = async (idApiRecipe) => {
    const currentRecipe = await Recipe.findOne({ idApi: idApiRecipe });
    if(!currentRecipe) return {status: 200, data: {numberOfLikes: 0}}
    return {status: 200, data: {numberOfLikes: currentRecipe.favs_users.length}}
}

module.exports = {getFavNumber, addFav, deleteFav};
