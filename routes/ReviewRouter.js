const router = require('express').Router()
const controller = require('../controllers/ReviewController')
const middleware = require('../middleware')

router.get('/', controller.GetReview)
router.get('/user', controller.GetUserReviews)
router.get('/session', controller.GetSessionReview)
router.get('/caregiver', controller.GetCaregiverReviews)
router.post(
  '/add',
  middleware.stripToken,
  middleware.verifyToken,
  controller.AddReview
)
router.put(
  '/edit',
  middleware.stripToken,
  middleware.verifyToken,
  controller.EditReview
)
router.delete(
  '/delete',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteReview
)

module.exports = router
