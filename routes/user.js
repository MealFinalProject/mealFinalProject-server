const router = require("express").Router();

/* GET current user profile */
router.get("/profile", async (req, res, next) => {
//   const idUser = req.session.loggedUser._id;
  console.log("hola")
  console.log(req.headers.authorization)
//   res.status(200).json(req);
//   try {
//     const currentUser = await User.findById(idUser).populate("favs_recipes");
res.status(200).json("profile");
//   } catch (err) {
//     console.log(err);
//   }
});

router.post("/profile/update", async (req, res, next) => {
  console.log("hola")
})
module.exports = router;