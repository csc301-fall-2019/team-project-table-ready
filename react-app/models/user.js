// 'use strict';
// const log = console.log;
const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.Types.ObjectId;
// const TypeId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
// const {MongoClient, ObjectID} = require('mongodb');
const Restaurant = require("./restaurant.js");

const UserSchema = new Schema({
  accountType: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  workFor: {
    type: String,
    required: false,
    default: ""
  },
  image: {
    type: String,
    required: true,
    default: "/images/avatar_sample.png"
  },
  email: String,
  tel: String,
});
User = mongoose.model("User", UserSchema);

UserSchema.pre('remove',function (next) {
  const userID = this._id;
  console.log("USER DELETE");
  Restaurant.find(
    {owner:userID}).then(
    res => {
      res.forEach(re => {
        re.remove()
        console.log(re.name)
      })
    },
    error => {
      console.log("FAILED", error)
    }
  ),next;
  // User.findByIdAndDelete(userID).then(
  //   user => {
  //     console.log("deleted user", user.username)
  //   },
  //   error=>{
  //     console.log("Failed to delete user")
  //   }
  // ),next;
});

module.exports = User;
