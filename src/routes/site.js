const express = require('express')
const router = express.Router()

const siteControllers = require('../apps/controllers/Sitecontrollers')

router.get('/', siteControllers.index)

module.exports = router