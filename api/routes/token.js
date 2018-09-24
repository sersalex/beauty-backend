const jwt = require('jsonwebtoken')
const tokenList = {}
const SECRET = 'iZW'
const REFRESH_SECRET = 'W1haWwiOiJzZXJAbWFpbC5ydSIsInBhc3N3b3JkIjoiMjEyMzEyMTIzIiwiaWF0IjoxNTM3NjA2NDg2LCJleH'

const user = {
  name: 'Sergey',
  email: 'ser@mail.ru',
  password: '212312123'
}

module.exports = router => {
  router.post('/token', (req, res) => {
    let token = jwt.sign(user, SECRET, { expiresIn: 900 })
    const refreshToken = jwt.sign(user, REFRESH_SECRET, { expiresIn: 6000 })
    const response = {
      'access_token': token,
      'expires_in': 900,
      'refresh_token': refreshToken
    }
    tokenList[refreshToken] = response
    res.status(200).json(response)
    // refreshTokens[refreshToken] = username res.json({ token: 'JWT ' + token, refreshToken: refreshToken })
    // jwt.sign({ user }, SECRET, (err, token) => {
    //   if (err) {

    //   }
    //   res.json({
    //     token: token
    //   })
    // })
  })
}
