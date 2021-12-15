const router = require("express").Router();
const bcrypt = require("bcrypt");

const saltRounds = 10;
const User = require("../models/User.model")

const cloudinary = require('cloudinary').v2

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

/* GET current user profile */
router.get("/profile", async (req, res, next) => {
  const idUser = req.headers.id
  
  try {
    const currentUser = await User.findById(idUser);
    
    res.status(200).json(currentUser);

  } catch (err) {
    console.log(err);
    return res.status(404).json({errorMessage: "Bad request: " + err});
  }
});

router.get("/profile/my-recipes/:id", async (req, res, next) => {
  const idUser = req.params.id

  const recipesFavoritesOfUser = await User.findById(idUser).populate('favs_recipes')
  try{

    return res.status(200).json({recipesFavoritesOfUser})

  } catch (err){ 
    console.log(err)
    return  res.status(500).json({ errorMessage: err.message })
  }
  
})

router.post("/profile/update", async (req, res, next) => {
  let { userId, profileImage, newUsername, newPassword, oldPassword, oldProfileImage } = req.body.data

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

  let passwordHashed = oldPassword

    if(newPassword){
      await bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(newPassword, salt))
      .then((hashedPassword) => {
        passwordHashed = hashedPassword
      })
      const isSamePassword = await bcrypt.compare(newPassword, oldPassword)

         if (isSamePassword) {
          return res.status(400).json({ errorMessage: "The password cannot be the same as the one that already exists" })
        }
    }

  

    if(oldProfileImage && profileImage) await cloudinary.uploader.destroy(oldProfileImage, function(result) { console.log(result) })

       const updateUser = await User.findByIdAndUpdate(
          userId,
          { avatar_url: profileImage,
            username: newUsername,
            password: passwordHashed,
          },{new: true})
        console.log('UPDATEUSER',updateUser)
        
        return res.status(200).json({msg: 'Updated user', updateUser})
  
  } catch (err) {
    if(err.codeName === 'DuplicateKey') return res.status(500).json({ errorMessage: "Username already taken" });

    return res.status(500).json({ errorMessage: err.message });
  }
})


module.exports = router;