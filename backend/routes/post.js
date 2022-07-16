const express = require('express')
const router = express.Router()
const { createPost } = require('../controllers/post')
const { authUser } = require('../middlewares/auth')

router.post('/createPost', authUser, createPost)

module.exports = router
