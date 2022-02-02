const User = require('../models/user')
const routes = require('express').Router()
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    res.send('No JWT token provided')
  } else {
    jwt.verify(token, 'jwtSecret', (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: 'Authentication failed!' })
      } else {
        res.json({ auth: true })
        req._id = decoded.id
        // next()
      }
    })
  }
}

routes.get('/auth', verifyJWT, (req, res) => {
  return res.send(200)
})

routes.post('/login', (req, res) => {
  User.findOne(req.body, function (err, user) {
    if (err) return res.status(500).send(err)
    if (!user) return res.status(200).send(false)
    const id = user._id
    const token = jwt.sign({ id }, 'jwtSecret', {
      expiresIn: 6000, //ms
    })

    return res.status(200).send({ user, auth: true, token })
  })
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

module.exports = routes
