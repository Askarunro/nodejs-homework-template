const {Schema, model} = require('mongoose');
const Joi = require("joi");

const schemaUsers = Joi.object({
    password: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    subscription: Joi.string().min(3).max(8),
  });

const users = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: String
  })

  const Users = model("users", users);

module.exports = {Users, schemaUsers};