const express = require('express')
const router = express.Router()

require('./routes/user')(router)
require('./routes/login')(router)

module.exports = router
