const express = require('express')
const router = express.Router()
const controller = require('../controllers/fizzy')

router.get('/', controller.noCount)
router.get('/:count', controller.hasCount)

module.exports = router;