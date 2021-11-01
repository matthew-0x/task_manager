import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)
userSchema.methods.comparePassword = async (enteredPassword) => {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async (next) => {
  if (!this.isModified('password')) {
    next()
  }
  const saltRound = 5
  this.password = await bcrypt.hash(this.password, saltRound)
})
const User = mongoose.model('User', userSchema, 'Users')

export default User
