import mongoose from 'mongoose'

const taskSchema = mongoose.Schema(
  {
    description: { type: String, required: true },
    done: { type: Boolean },
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema, 'Tasks')
export default Task
