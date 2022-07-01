const jwt = require('jsonwebtoken')
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/tokens')
const { sendVerificationEmail } = require('../helpers/mailer')

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message:
          'The first name needs to be of minimum 3 letters and maximum 30 letters',
      })
    }

    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message:
          'The last name needs to be of minimum 3 letters and maximum 30 letters',
      })
    }

    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message:
          'The password needs to be of minimum 3 letters and maximum 40 letters',
      })
    }

    const check = await User.findOne({ email })
    if (check) {
      return res.status(400).json({
        message: 'This email address already exists,try with another address',
      })
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' })
    }

    const cryptedPassword = await bcrypt.hash(password, 12)
    console.log(cryptedPassword)
    let tempUsername = first_name + last_name
    let newUsername = await validateUsername(tempUsername)

    const user = await new User({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save()

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    )
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
    sendVerificationEmail(user.email, user.first_name, url)
    const token = generateToken({ id: user._id.toString() }, '7d')
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message:
        'Your user registration is successful, please activate your account',
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const check = await User.findById(user.id)
    if (check.verified === true) {
      return res
        .status(400)
        .json({ message: 'This account has already been activated' })
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true })
      return res
        .status(200)
        .json({ message: 'Account has been activated successfully' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found with this email' })
    }

    const check = await bcrypt.compare(password, user.password)

    if (!check) {
      return res.status(400).json({
        message: 'Invalid Credential. Please Try Again',
      })
    }

    const token = generateToken({ id: user._id.toString() }, '7d')
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: 'Your user login is successful',
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
