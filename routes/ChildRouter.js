const router = require('express').Router()
const controller = require('../controllers/ChildController')
const middleware = require('../middleware')

router.get('/', controller.GetChild)
router.get('/all', controller.GetChildren)
router.post(
  '/add',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateChild
)
router.put(
  '/edit',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateChild
)
router.delete(
  '/delete',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteChild
)

module.exports = router
