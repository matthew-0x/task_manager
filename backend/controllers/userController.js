import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('Email address already exists')
  }

  const user = await User.create({
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      registration: 'Successful',
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error('Registration error')
  }
})
