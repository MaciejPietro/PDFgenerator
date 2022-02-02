const User = require('../models/user')
const routes = require('express').Router()

const util = require('util')
const fs = require('fs')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile, getObject, deleteFile } = require('../s3')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

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
  '/:_id/:_clientID',
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

routes.get('/:id', async ({ params: { id } }, res) => {
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

      return convertImages(user.clients, res)
    },
  )
})

routes.delete(
  '/:_id/:_clientID',
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
  '/:_id',
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
