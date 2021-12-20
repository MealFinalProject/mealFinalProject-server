const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar_url: {
      type: String
    },
    avatar_public_id:{
      type: String
    },
    favs_recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
    favs_recipes_idApi: [{type: String}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    followers: [{type: Schema.Types.ObjectId,  ref: 'User'}],
    followed: [{type: Schema.Types.ObjectId,  ref: 'User'}]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
