const router = require("express").Router();

const User = require("../models/User.model")

/* GET current user profile */
router.get("/profile", async (req, res, next) => {
  const idUser = req.headers.id
  console.log("hola")
  console.log(req.headers.id)
  console.log(idUser)
  try {
    const currentUser = await User.findById(idUser);
    console.log(currentUser)
    res.status(200).json(currentUser);
  } catch (err) {
    console.log(err);
  }
});

router.post("/profile/update", async (req, res, next) => {
  console.log("hola")
})
module.exports = router;