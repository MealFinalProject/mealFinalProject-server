const router = require("express").Router();
const bcrypt = require("bcrypt");
const { findOne } = require("../models/User.model");
const saltRounds = 10;
const User = require("../models/User.model")

/* GET current user profile */
router.get("/profile", async (req, res, next) => {
  const idUser = req.headers.id
  try {
    const currentUser = await User.findById(idUser);
    console.log(currentUser)
    return res.status(200).json(currentUser);
  } catch (err) {
    console.log(err);
    return res.status(404).json({errorMessage: "Bad request: " + err});
  }
});

router.post("/profile/update", async (req, res, next) => {
  const { userId, profileImage, newUsername, newPassword, oldPassword } = req.body.data
  console.log(req.body.data)
  try{

    if(!profileImage && !newUsername && !newPassword){
      return res.status(400).json({
        errorMessage: 'There is nothing to update' 
      })
    }

    if(newPassword && newPassword.length < 8){
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    })
    
  }


      return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(newPassword, salt))
      .then((hashedPassword) => 
      bcrypt.compare(newPassword, oldPassword)
      .then( async (isSamePassword) => {
        if (isSamePassword) {
          return res.status(400).json({ errorMessage: "The password cannot be the same as the one that already exists" });
        }
        const updateUser = await User.findByIdAndUpdate(
          userId,
          { avatar_url: profileImage,
            username: newUsername,
            password: hashedPassword,
          },{new: true})
        console.log(updateUser)
        
        return res.status(200).json({msg: 'Updated user'})
      }))



  
  } catch (err) {
    return res.status(500).json({ errorMessage: err.message });
  }
})
module.exports = router;