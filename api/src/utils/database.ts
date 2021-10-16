require('dotenv').config()

import mongoose from 'mongoose'

const { CONNECTION_STRING } = process.env

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 60000, // Close sockets after 60 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
}

export async function connectDb() {
  const connectionString = `${CONNECTION_STRING}`
  return mongoose.connect(connectionString, options)
}

mongoose.connection.on('error', function (error) {
  console.error('database connection error:', error)
})

mongoose.connection.once('open', function () {
  console.log(`Database connected to: ${CONNECTION_STRING}`)
})

export async function clearDB() {
  return await mongoose.connection.db.dropDatabase()
}

export async function closeDB() {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
}
