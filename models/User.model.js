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
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
