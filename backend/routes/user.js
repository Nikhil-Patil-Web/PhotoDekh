const express = require('express')
const router = express.Router()
const {
  register,
  activateAccount,
  login,
  auth,
  sendVerification,
  findUser,
  sendResetPasswordCode,
} = require('../controllers/user')
const { authUser } = require('../middlewares/auth')

router.post('/register', register)
router.post('/activate', authUser, activateAccount)
router.post('/login', login)
router.post('/sendVerification', authUser, sendVerification)
router.post('/findUser', findUser)
router.post('/sendResetPasswordCode', sendResetPasswordCode)

module.exports = router
