const routes = require('express').Router()
const User = require('../models/user')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile, getObject, deleteFile } = require('../s3')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

routes.post('/auth', (req, res) => {
  User.findOne(req.body, function (err, user) {
    if (err) return res.status(500).send(err)
    if (!user) return res.status(200).send(false)
    return res.status(200).send(user)
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

routes.get('/account/:id', async ({ params: { id } }, res) => {
  await User.findOne(
    { _id: id },
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

routes.get('/user/:id', async ({ params: { id } }, res) => {
  await User.findOne(
    { _id: id },
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

// function encode(data) {
//   let buf = Buffer.from(data)
//   let base64 = buf.toString('base64')
//   return base64
// }

// routes.get('/images/:key', (req, res) => {
//   const key = req.params.key
//   const readStream = getFileStream(key)
//   // const img = getImage(key)
//   return readStream.pipe(res)
// })

// CLIENTS ----------------------

function convertImage(clients, res) {
  const imgs = []

  clients.forEach((client) => {
    const imgBase64 = getObject(client.image)
    imgs.push(imgBase64)
  })

  return Promise.all(imgs).then((imgs) => {
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
        return convertImage(user.clients, res)
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

      return convertImage(user.clients, res)
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
            deleteFile(el.image)
          }
          return el._id != _clientID
        })

        return convertImage(clients, res)
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
      { new: true, upsert: true },
      (err, user) => {
        if (err) return res.status(500).send(err)
        if (!user) return res.status(200).send(false)
        return convertImage(user.clients, res)
      },
    )
  },
)

module.exports = routes
