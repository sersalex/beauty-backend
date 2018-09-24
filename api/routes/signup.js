const User = require('../../models/user')
var bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = router => {
  router.post('/signup', function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      if (err) return console.log(err)
      let body = Object.assign({}, req.body, { password: hash })
      let user = new User(body)
      user.save(function (err, user) {
        if (err) return console.log(err)
        res.status(200).json(user)
      })
    })
  })
}
