const { validateEmail, validateLength } = require('../helpers/validation')
const User = require('../models/User')
const bcrypt = require('bcrypt')
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
    return
    const user = await new User({
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
