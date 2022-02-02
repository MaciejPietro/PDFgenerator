const routes = require('express').Router()

const routesArr = [
  'User',
  'Settings',
  'Clients',
  'Signature',
  'Licensions',
  'Currencies',
  'Documents',
]

routesArr.forEach((route) => {
  routes.use(`/${route.toLowerCase()}`, require(`./${route}`))
})

// const User = require('./User')
// const Settings = require('./Settings')
// const Clients = require('./Clients')
// const Signature = require('./Signature')
// const Licensions = require('./Licensions')
// const Currencies = require('./Currencies')
// const Documents = require('./Documents')

// routes.use('/user', User)
// routes.use('/settings', Settings)
// routes.use('/clients', Clients)
// routes.use('/currencies', Currencies)
// routes.use('/licensions', Licensions)
// routes.use('/signature', Signature)

module.exports = routes
