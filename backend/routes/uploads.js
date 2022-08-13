const express = require('express')
const router = express.Router()
const { uploadImages } = require('../controllers/uploads')
const { authUser } = require('../middlewares/auth')

router.post('/uploadImages', uploadImages)

module.exports = router
