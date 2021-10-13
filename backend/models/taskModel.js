import mongoose from 'mongoose'

const taskSchema = mongoose.Schema(
  {
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema, 'Tasks')
export default Task
