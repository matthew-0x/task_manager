import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDB Connected: ${db.connection.host}`)
  } catch (error) {
    console.error(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
