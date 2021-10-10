import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const server = express()
const PORT = process.env.PORT || 5000

server.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

server.get('/', (req, res) => {
  res.send('api is working')
})
