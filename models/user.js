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
    signatureKey: String,
    currencies: Array,
    personalDetails: {
      name: String,
      surname: String,
      stageName: String,
      email: String,
      country: String,
      localization: String,
    },
    licensions: [{ type: Object, ref: 'Licension' }],
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
    email: {
      type: String,
      required: true,
    },
    realname: String,
    country: String,
    profession: String,
    image: String,
    rate: Number,
  },
  { timestamps: true },
)

const licensionSchema = new Schema(
  {
    _id: {
      type: mongoose.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    details: [String],
    prices: Object,
  },
  { timestamps: true },
)

mongoose.model('Client', clientSchema)
mongoose.model('Licension', licensionSchema)

const User = mongoose.model('User', userSchema)

module.exports = User
