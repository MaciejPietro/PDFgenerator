const User = require('../models/user')
const routes = require('express').Router()

const { uploadFile, getObject, deleteFile } = require('../s3')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

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

routes.get('/personal/:_id', async ({ params: { _id } }, res) => {
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

routes.patch('/personal/:id', ({ body: { data }, params: { id } }, res) => {
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

routes.get('/logo/:_id', async ({ params: { _id } }, res) => {
  await User.findOne(
    { _id },
    {
      logo: 1,
    },
    function (err, user) {
      if (err) return res.status(500).send(err)
      if (!user) return res.status(200).send(false)
      const ObjPromise = getObject(user.logo)
      ObjPromise.then((imgBase64) => {
        return res.status(200).send({ img: imgBase64, key: user.logo })
      })
    },
  )
})

routes.put(
  '/logo/:_id',
  upload.single('image'),
  async ({ body: { prevLogo }, file, params: { _id } }, res) => {
    let logo
    if (file) {
      const result = await uploadFile(file)
      await unlinkFile(file.path)
      logo = result.Key
    }

    await User.findOneAndUpdate(
      { _id },
      { $set: { logo } },
      { new: true },
      (err, user) => {
        if (err) return res.status(500).send(err)
        if (!user) return res.status(200).send(false)
        // if (body.prevLogo) deleteFile(body.prevLogo)
        const ObjPromise = getObject(user.logo)
        ObjPromise.then((imgBase64) => {
          return res.status(200).send(imgBase64)
        })
      },
    )
  },
)

module.exports = routes
