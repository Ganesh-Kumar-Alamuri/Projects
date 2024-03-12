const express = require('express')
const router  = express.Router()
const authorizationMiddleware = require('../middleware/auth')
const {
    login,
    dashboard
} = require('../controllers/main')

router.route('/login').post(login)
router.route('/dashboard').get(authorizationMiddleware,dashboard)

module.exports = router