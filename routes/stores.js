const express = require('express')
const router = express.Router()
const controller = require('../controllers/firebase')

router.get('/', controller.getAll)
router.post('/', controller.addOne)
router.get('/:id', controller.getOne)
router.put('/:id', controller.updateOne)
router.delete('/:id', controller.deleteOne)

module.exports = router;