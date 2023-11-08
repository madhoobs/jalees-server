const router = require('express').Router()
const controller = require('../controllers/CaregiverController')
const middleware = require('../middleware')

router.get('/', controller.GetCaregiver)
router.get('/all', controller.GetAllCaregivers)
router.post('/add', controller.CreateCaregiver)
router.put('/edit', controller.UpdateCaregiver)
router.delete('/delete', controller.DeleteCaregiver)

module.exports = router
