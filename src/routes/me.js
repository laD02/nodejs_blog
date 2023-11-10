const express = require('express')
const router = express.Router()

const meControllers = require('../apps/controllers/Mecontrollers')

router.get('/stored/course', meControllers.storedCourse)
router.get('/trash/course', meControllers.trashCourse)

module.exports = router