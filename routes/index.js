const routes = require('express').Router()
const User = require('../models/user')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const mongoose = require('mongoose')

const { uploadFile, getObject, deleteFile } = require('../s3')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
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

routes.get('/account/:_id', async ({ params: { _id } }, res) => {
  await User.findOne(
    { _id },
    {
      username: 1,
      email: 1,
      password: 1,
    },
    function (err, user) {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      return res.status(200).send(user)
    },
  )
})

routes.get('/user/:_id', async ({ params: { _id } }, res) => {
  await User.findOne(
    { _id },
    {
      personalDetails: {
        country: 1,
        email: 1,
        localization: 1,
        name: 1,
        stageName: 1,
        surname: 1,
      },
    },
    function (err, user) {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      return res.status(200).send(user)
    },
  )
})

//SIGNATURE

routes.get('/signature/:_id', async (req, res) => {
  await User.findOne(
    { _id: req.params._id },
    {
      signatureKey: 1,
    },
    function (err, user) {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      const ObjPromise = getObject(user.signatureKey)
      ObjPromise.then((imgBase64) => {
        return res.status(200).send({ img: imgBase64, key: user.signatureKey })
      })
    },
  )
})

routes.patch(
  '/signature/:_id',
  upload.single('image'),
  async ({ body, file, params }, res) => {
    let signatureKey
    if (file) {
      const result = await uploadFile(file)
      await unlinkFile(file.path)
      signatureKey = result.Key
    }

    await User.findOneAndUpdate(
      { _id: params._id },
      { $set: { signatureKey: signatureKey } },
      { new: true },
      (err, user) => {
        if (err) return res.status(500).send(err)
        if (!user) return res.status(200).send(false)
        if (body.prevSigKey) deleteFile(body.prevSigKey)
        const ObjPromise = getObject(user.signatureKey)
        ObjPromise.then((imgBase64) => {
          return res.status(200).send(imgBase64)
        })
      },
    )
  },
)

//CURRENCIES

routes.get('/currencies/:_id', async ({ params: { _id } }, res) => {
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

routes.patch('/currencies/:_id', ({ body, params: { _id } }, res) => {
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

//LICENSIONS

routes.get('/licensions/:_id', async ({ params: { _id } }, res) => {
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

routes.post('/licension/:_id', ({ body, params: { _id } }, res) => {
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

routes.delete(
  '/licension/:_id/:_licID',
  async ({ params: { _id, _licID } }, res) => {
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
  },
)

//SETTINGS

routes.patch('/update-user/:id', ({ body: { data }, params: { id } }, res) => {
  User.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { useFindAndModify: false },
    (err, user) => {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      return res.status(200).send(true)
    },
  )
})

// CLIENTS ----------------------

async function convertImages(clients, res) {
  const imgs = []

  clients.forEach(({ image }) => {
    if (!image) return
    const imgBase64 = getObject(image)
    imgs.push(imgBase64)
  })

  return await Promise.all(imgs).then((imgs) => {
    for (const [key, client] of Object.entries(clients)) {
      client['imageKey'] = client.image
      client.image = imgs[key]
    }

    return res.status(200).send(clients)
  })
}

routes.patch(
  '/client/:_id/:_clientID',
  upload.single('image'),
  async ({ body, file, params: { _id, _clientID } }, res) => {
    if (file) {
      deleteFile(body.imageKey)
      const result = await uploadFile(file)
      await unlinkFile(file.path)
      body.image = result.Key
    }

    User.findOneAndUpdate(
      { _id },
      { $set: { 'clients.$[p]': body } },
      { arrayFilters: [{ 'p._id': _clientID }], new: true },
      (err, user) => {
        if (err) return res.status(500).send(err)
        if (!user) return res.status(200).send(false)
        return convertImages(user.clients, res)
      },
    )
  },
)

routes.get('/clients/:id', async ({ params: { id } }, res) => {
  await User.findOne(
    { _id: id },
    {
      clients: {
        _id: 1,
        name: 1,
        email: 1,
        profession: 1,
        rate: 1,
        country: 1,
        image: 1,
        realname: 1,
      },
    },
    function (err, user) {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)

      // return res.status(200).send(user.clients)
      return convertImages(user.clients, res)
    },
  )
})

routes.delete(
  '/client/:_id/:_clientID',
  async ({ params: { _id, _clientID } }, res) => {
    await User.findOneAndUpdate(
      { _id },
      { $pull: { clients: { _id: _clientID } } },
      (err, user) => {
        if (err) return res.status(500).send(err)
        if (!user) return res.status(200).send(false)

        const clients = user.clients.filter((el) => {
          if (el._id == _clientID) {
            console.log('delete ', el.image)
            deleteFile(el.image)
          }
          return el._id != _clientID
        })

        return convertImages(clients, res)
      },
    )
  },
)

routes.post(
  '/client/:_id',
  upload.single('image'),
  async ({ file, body, params }, res) => {
    if (file) {
      const result = await uploadFile(file)
      await unlinkFile(file.path)
      body.image = result.Key
    }

    User.findOneAndUpdate(
      { _id: params._id },
      { $push: { clients: body } },
      { new: true },
      (err, user) => {
        if (err) return res.status(500).send(err)
        if (!user) return res.status(200).send(false)
        return convertImages(user.clients, res)
      },
    )
  },
)

module.exports = routes
