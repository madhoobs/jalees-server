const router = require('express').Router()
const controller = require('../controllers/SessionController')
const middleware = require('../middleware')

router.get('/', controller.GetSession)
router.get('/child', controller.GetChildSessions)
router.get(
  '/all',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetChildrenSessions
)
router.get('/caregiver', controller.GetCaregiverSessions)
router.post(
  '/add',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateSession
)
router.put(
  '/edit',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateSession
)
router.delete(
  '/delete',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteSession
)

module.exports = router
