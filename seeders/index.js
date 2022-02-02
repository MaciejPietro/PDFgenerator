const User = require('../models/user')

module.exports = function () {
  User.findOne({ username: 'user' }, function (err, docs) {
    if (docs) {
      console.log('User populated already')
    } else {
      const user = new User({
        username: 'user',
        password: 'password1',
        email: 'maciejwsrh97@wp.pl',
        signatureKey: '',
        logo: '',
        currencies: ['USD', 'EUR'],
        personalDetails: {
          name: 'Maciej',
          surname: 'Pietro',
          stageName: 'Empe Beats',
          email: 'maciejwsrh97@wp.pl',
          country: 'Poland',
          localization: 'wyrzysk',
        },
        licensions: [
          {
            _id: '007',
            name: 'Basic',
            details: ['mp3 + wav', 'can upload nowhere'],
            prices: {
              USD: 40,
              EUR: 30,
            },
          },
          {
            _id: '008',
            name: 'Premium',
            details: ['wav + stems', 'can upload somewhere'],
          },
          {
            _id: '009',
            name: 'Exclusive',
            details: ['wav + stems', 'can upload everywhere'],
          },
        ],
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
}
