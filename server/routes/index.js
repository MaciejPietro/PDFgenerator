const routes = require('express').Router()
const User = require('../models/user')

routes.post('/auth', (req, res) => {
  User.findOne(
    {
      name: req.body.name,
      password: req.body.password,
    },
    function (err, user) {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      return res.status(200).send(true)
    },
  )
})

routes.post('/findByName', (req, res) => {
  User.findOne(
    {
      name: req.body.name,
    },
    function (err, user) {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      return res.status(200).send(user)
    },
  )
})

routes.post('/findByEmail', (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      return res.status(200).send(user)
    },
  )
})

routes.post('/register', ({ body }, res) => {
  User.create(
    {
      name: body.name,
      password: body.password,
      email: body.email,
    },
    function (err, response) {
      if (err) return res.status(500).send(err)
      if (!response) return res.status(200).send(false)
      return res.status(200).send(response)
    },
  )
})

module.exports = routes
