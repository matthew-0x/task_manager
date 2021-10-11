import Task from '../models/taskModel'

// @desc    Fetch all tasks
// @route   GET /api/tasks
// @access  Public

const getTasks = async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Task.countDocuments({ ...keyword })
  const tasks = await Task.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ tasks, page, pages: Math.ceil(count / pageSize) })
}

// @desc    Fetch a single task
// @route   GET /api/tasks/:id
// @access  Public
const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task) {
    res.json(task)
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
}

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin  **Access control not implemented
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task) {
    await task.remove()
    res.json({ message: 'Task removed' })
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
}

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private/Admin  **Access control not implemented
const createTask = async (req, res) => {
  const task = new Task({
    description: 'Sample task',
    done: false,
  })

  const createdTask = await task.save()
  res.status(201).json(createdTask)
}

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private/Admin **Access control not implemented
const updateTask = async (req, res) => {
  const { description, done } = req.body

  const task = await Task.findById(req.params.id)

  if (task) {
    task.description = description
    task.done = done

    const updatedTask = await task.save()
    res.json(updatedTask)
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
}
