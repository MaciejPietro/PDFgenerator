const routes = require('express').Router()
const User = require('../models/user')

routes.post('/auth', (req, res) => {
  User.findOne(
    {
      username: req.body.username,
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
      username: req.body.name,
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
      username: body.name,
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

routes.get('/user/:username', async ({ params }, res) => {
  await User.findOne(
    {
      username: params.username,
    },
    function (err, user) {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      return res.status(200).send(user)
    },
  )
})

// routes.get('/user/:username', async ({ params }, res) => {
//   await User.findOne(
//     {
//       username: params.username,
//     },
//     function (err, user) {
//       if (err) return res.status(500).send(err)
//       if (!user) return res.status(200).send(false)
//       return res.status(200).send(user.artistDetails)
//     },
//   )
// })

routes.patch('/update-user', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { $set: req.body.data },
    { useFindAndModify: false },
    (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      return res.status(200).send(true)
    },
  )

  // User.findOne(s
  //   {
  //     username: params.username,
  //   },
  //   function (err, user) {
  //     if (err) return res.status(500).send(err)
  //     if (!user) return res.status(200).send(false)
  //     return res.status(200).send(user.artistDetails)
  //   },
  // )
})

module.exports = routes
