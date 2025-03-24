const express = require('express')
const router = express.Router()
const controller = require('../controllers/firebase')

router.get('/', controller.getVwCalcGenericValues)
router.get('/:id', controller.getVwCalcOtherValues)

module.exports = router;