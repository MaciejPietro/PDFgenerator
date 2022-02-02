// const User = require('../models/user')
const routes = require('express').Router()
const fs = require('fs')

const { dirname } = require('path')
const appDir = dirname(require.main.filename)

const pdf = require('html-pdf')
const { exclusive } = require('../documents')

routes.post('/pdf', (req, res) => {
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile(`${appDir}/documents/result.pdf`, (err) => {
      if (err) {
        res.send(Promise.reject())
      }

      res.send(Promise.resolve())
    })
})

// routes.post('/preview', (req, res) => {
//   pdf.create(pdfTemplate(req.body), {}).toStream(function (err, stream) {
//     const dir = `${appDir}/documents/foo.pdf`
//     stream.pipe(fs.createReadStream(dir))
//     // res.contentType('application/pdf')
//     // fs.createReadStream(dir).pipe(res)

//     res.send(stream)
//   })
// })

routes.post('/preview', ({ body }, res) => {
  pdf.create(exclusive(body), {}).toBuffer(function (err, buffer) {
    res.status(200).send(buffer)
  })
})

routes.get('/pdf', (req, res) => {
  res.sendFile(`${appDir}/documents/result.pdf`)
})

module.exports = routes
