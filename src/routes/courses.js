const express = require('express')
const router = express.Router()

const courseControllers = require('../apps/controllers/Coursecontrollers')

router.get('/create', courseControllers.create)
router.post('/store', courseControllers.store)
router.get('/:id/edit', courseControllers.edit)
router.put('/:id', courseControllers.update)
router.post('/handle-form-actions', courseControllers.handleFormActions)
router.post('/restore-force-form-actions', courseControllers.restoreForceFormAction)
router.patch('/:id/restore', courseControllers.restore)
router.delete('/:id/force', courseControllers.forceDestroy)
router.delete('/:id', courseControllers.destroy)
router.get('/:slug', courseControllers.show)

module.exports = router