const jwt = require('jsonwebtoken')

const user = {
  id: 1,
  name: 'Sergey',
  lastName: 'Alexeev',
  email: 'ser@mail.ru'
}

module.exports = router => {
  router.post('/login', (req, res) => {
    jwt.sign({ user }, 'asdsad', (err, token) => {
      if (err) {

      }
      res.json({
        token: token
      })
    })
  })
}
