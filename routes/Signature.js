const User = require('../models/user')
const routes = require('express').Router()

const util = require('util')
const fs = require('fs')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile, getObject, deleteFile } = require('../s3')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

routes.get('/:_id', async (req, res) => {
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
  '/:_id',
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

module.exports = routes
