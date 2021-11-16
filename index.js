const express = require('express')
const bodyParser = require('body-parser')
// const pdf = require('html-pdf')
const path = require('path')

const cors = require('cors')
// const pdfTemplate = require('./documents')
require('dotenv').config()

const routes = require('./routes')

const mongoose = require('mongoose')
const User = require('./models/user')

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

User.findOne({ username: 'user' }, function (err, docs) {
  if (docs) {
    console.log('Name exists already')
  } else {
    const user = new User({
      username: 'user',
      password: 'password1',
      email: 'maciejwsrh97@wp.pl',
      artistDetails: {
        name: 'Maciej',
        surname: 'Pietro',
        stageName: 'Empe Beats',
        email: 'maciejwsrh97@wp.pl',
        country: 'Poland',
        localization: 'wyrzysk',
      },
      clients: [
        {
          _id: '997',
          name: 'Eminem',
          realname: 'Marshal Matters',
          country: 'USA',
          email: 'Emi@wp.pl',
          profession: 'Rapper',
          rate: 5,
          image: 'b838e96a6051825b1a84a2f1601ac513',
        },
      ],
    })

    user.save()
  }
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.use(express.static(path.resolve(__dirname, './client/dist')))
// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
// })

// app.post('/api/create-pdf', (req, res) => {
//   pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
//     if (err) {
//       res.send(Promise.reject())
//     }

//     res.send(Promise.resolve())
//   })
// })

// app.get('/api/fetch-pdf', (req, res) => {
//   res.sendFile(`${__dirname}/result.pdf`)
// })

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/api', routes)

// app.post('/login', function(req, res) {
//   User.findOne({
//       uname: req.body.uname,
//       password: req.body.password
//     }, function(err, user) {
//       if (err) { return res.status(500).send(err); }

//       if (!user) { return res.status(200).send("User not found"); }

//       return res.status(200).send("You are logged in succesfully.");
//     }
//   });
// });
