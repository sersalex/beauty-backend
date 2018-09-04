const User = require('../../models/user')
const jwt = require('jsonwebtoken')

module.exports = function (router) {
  router.get('/user/:id', verifyToken, function (req, res) {
    jwt.verify(req.token, 'asdsad', (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        User.findById(req.params.id).exec()
          .then(docs => res.status(200)
            .json(Object.assign({}, docs, authData))
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

  router.get('/user/email/:email', function (req, res) {
    User.find({ 'email': req.params.email }).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })

  router.post('/user', function (req, res) {
    let user = new User(req.body)
    user.save(function (err, user) {
      if (err) return console.log(err)
      res.status(200).json(user)
    })
  })

  router.put('/user/:id', function (req, res) {
    console.log(res.body)
    let qry = { _id: req.query.id }
    let doc = {
      isActive: req.body.isActive
    }
    console.log(doc)
    User.update(qry, doc, function (err, respRaw) {
      if (err) return console.log(err)
      res.status(200).json(respRaw)
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
