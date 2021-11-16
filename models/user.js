const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    artistDetails: {
      name: String,
      surname: String,
      stageName: String,
      email: String,
      country: String,
      localization: String,
    },
    clients: [{ type: Object, ref: 'Client' }],
  },
  { timestamps: true },
)

const clientSchema = new Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    realname: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: false,
    },
    rate: {
      name: Number,
    },
  },
  { timestamps: true },
)

mongoose.model('Client', clientSchema)
const User = mongoose.model('User', userSchema)

module.exports = User
