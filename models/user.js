// user info
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
})
// const UserSchema = new Schema({
//   username:String,
//   password:String,
//   email:String
// })

module.exports = {
  UserModel: mongoose.model('User', UserSchema)
}
