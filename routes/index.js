const router = require("express").Router();
const authRoutes = require("./auth");
const searchRoutes = require("./search");

/* GET home page */
router.get("/", (req, res, next) => {
  console.log("get gome page")
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/", searchRoutes);

module.exports = router;
