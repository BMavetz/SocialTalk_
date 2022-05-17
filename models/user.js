const { Schema, model } = require('mongoose');
const {isEmail} = require("validator");

// Schema to create user model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'invalid email'],
    },
    thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought",
    }
    ],
    friends:[
    {
        type:Schema.Types.ObjectId,
        ref:"user",
    }
    ]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual("numFriends").get(function(){
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;
