import express from 'express'
import dotenv from 'dotenv'
import taskRoutes from './routes/taskRoutes.js'
import connectDB from './databaseConfig.js'
dotenv.config({ path: './.env' })

const app = express()
const serverPORT = process.env.PORT || 5000
connectDB() // establishes database connection

app.use(express.json())
app.use('/api/tasks', taskRoutes)

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${serverPORT}`
  )
)
