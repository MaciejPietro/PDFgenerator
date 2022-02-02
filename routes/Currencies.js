const User = require('../models/user')
const routes = require('express').Router()

routes.get('/:_id', async ({ params: { _id } }, res) => {
  await User.findOne(
    { _id },
    {
      currencies: 1,
    },
    function (err, user) {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      return res.status(200).send(user)
    },
  )
})

routes.patch('/:_id', ({ body, params: { _id } }, res) => {
  User.findOneAndUpdate(
    { _id },
    { $set: { currencies: body } },
    { useFindAndModify: false, new: true },
    (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      return res.status(200).send(user.currencies)
    },
  )
})

module.exports = routes
