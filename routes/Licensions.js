const User = require('../models/user')
const routes = require('express').Router()
const mongoose = require('mongoose')

routes.get('/:_id', async ({ params: { _id } }, res) => {
  await User.findOne(
    { _id },
    {
      licensions: 1,
    },
    function (err, user) {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      return res.status(200).send(user.licensions)
    },
  )
})

routes.post('/:_id', ({ body, params: { _id } }, res) => {
  let action = { $set: { 'licensions.$[p]': body } }

  if (body._id == '') {
    body._id = new mongoose.mongo.ObjectID()
    action = { $push: { licensions: body } }
  }

  User.findOneAndUpdate(
    { _id },
    action,
    {
      arrayFilters: [{ 'p._id': new mongoose.mongo.ObjectId(body._id) }],
      new: true,
    },
    (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      return res.status(200).send(user.licensions)
    },
  )
})

routes.delete('/:_id/:_licID', async ({ params: { _id, _licID } }, res) => {
  console.log(_id, _licID)
  await User.findOneAndUpdate(
    { _id },
    { $pull: { licensions: { _id: new mongoose.mongo.ObjectId(_licID) } } },
    { new: true },
    (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)

      return res.status(200).send(user.licensions)
    },
  )
})

module.exports = routes
