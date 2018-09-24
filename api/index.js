const express = require('express')
const router = express.Router()

require('./routes/user')(router)
require('./routes/token')(router)
require('./routes/signup')(router)

module.exports = router
