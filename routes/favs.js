const router = require("express").Router();

const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");


/* PUT add fav to current user. Create recipe if it do not exist en DB */
router.put("/add-fav-recipe", async (req, res, next) => {
  if(!req.body.data) return res.status(400).json({ errorMessage: "Bad Request" });
  const { idUser, idApiRecipe, nameRecipe, photoRecipe } = req.body.data;
  if (!idUser) return res.status(404).json({ errorMessage: "User not found" });
  if (!idApiRecipe || !nameRecipe || !photoRecipe) return res.status(400).json({ errorMessage: "Bad Request: recipe info" });

  try {
    const currentUser = await User.findById(idUser)
    if(!currentUser) return res.status(404).json({ errorMessage: "User not found" });
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
    return res.status(200).json({message: "Fav added"});
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Bad request: " + err });
  }
});

router.delete("/delete-fav-recipe", async (req, res, next) => {
  if(!req.body || Object.keys(req.body).length === 0) return res.status(400).json({ errorMessage: "Bad Request" });
  const { idUser, idApiRecipe } = req.body;
  if(!idUser) return res.status(400).json({ errorMessage: "Bad Request: user info" });
  if(!idApiRecipe) return res.status(400).json({ errorMessage: "Bad Request: recipe info" });
  try {
    const recipeTargeted = await Recipe.findOne({ idApi: idApiRecipe });
    if(!recipeTargeted) return res.status(404).json({errorMessage: "Recipe not found"})
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
    return res.status(200).json({message: "Fav deleted"});
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Bad request: " + err });
  }
});

/* GET current user profile */
router.get("/get-fav-number", async (req, res, next) => {
  if(!req.query || Object.keys(req.query).length === 0) return res.status(400).json({ errorMessage: "Bad Request" });
  const { idApiRecipe } = req.query;
  if (!idApiRecipe) return res.status(404).json({ errorMessage: "Recipe not found" });

  try {
    const currentRecipe = await Recipe.findOne({ idApi: idApiRecipe });
    if(!currentRecipe) return res.status(200).json({numberOfLikes: 0});
    return res.status(200).json({numberOfLikes: currentRecipe.favs_users.length});
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Bad request: " + err });
  }
});

module.exports = router;
