const User = require('../../models/user')
const jwt = require('jsonwebtoken')

module.exports = function (router) {
  router.get('/user/:id', verifyToken, function (req, res) {
    jwt.verify(req.token, 'iZW', (err, authData) => {
      if (err) {
        if (err.message === 'jwt expired') {
          res.sendStatus(401)
        } else if (err.message === 'invalid signature') {
          res.sendStatus(400)
        }
        res.send(err)
      } else {
        User.findById(req.params.id).exec()
          .then(docs => res.status(200)
            .json(docs)
          )
          .catch(err => res.status(500)
            .json({
              message: 'Error finding user',
              error: err
            })
          )
      }
    })
  })

  function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]
      req.token = bearerToken
      next()
    } else {
      res.sendStatus(403)
    }
  }
}
