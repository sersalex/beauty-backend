const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

module.exports = User
