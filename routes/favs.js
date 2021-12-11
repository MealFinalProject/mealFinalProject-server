const router = require("express").Router();

const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");


/* PUT add fav to current user. Create recipe if it do not exist en DB */
router.put("/add-fav-recipe", async (req, res, next) => {
  const { idUser, idApiRecipe, nameRecipe, photoRecipe } = req.body.data;

  console.log("hola");
  console.log(req.body.data);
  console.log(idUser);
  try {
    let recipeTargeted = await Recipe.findOne({ idApi: idApiRecipe });
    if (!recipeTargeted) {
      recipeTargeted = await Recipe.create({
        name: nameRecipe,
        photo: photoRecipe,
        apiId: idApiRecipe,
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
    res.status(200).json("Fav added");
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete-fav-recipe", async (req, res, next) => {
  const { idUser, idApiRecipe } = req.body;

  console.log("hola");
  console.log(req.body);
  console.log(idUser);
  try {
    const recipeTargeted = await Recipe.findOne({ idApi: idApiRecipe });
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
        console.log("borrado", deletedRecipe)
    }
    res.status(200).json("Fav deleted");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
