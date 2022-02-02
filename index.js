const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const populateUser = require('./seeders')

const cors = require('cors')
require('dotenv').config()

const routes = require('./routes')

const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 5000

mongoose.set('useFindAndModify', false)
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) =>
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`)
    }),
  )
  .catch((err) => console.log(err))

populateUser()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, './client/dist')))

app.use('/api', routes)
