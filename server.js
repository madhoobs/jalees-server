// Load express module
const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Port configuration
const PORT = process.env.PORT || 3000

// Invoke express functionality
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Import routes

// Mount routes

app.get('/', function (req, res) {
  res.send('Jalees Server')
})

// Listen to requests on port
app.listen(PORT, function () {
  console.log(`Jalees server is running on port ${PORT}`)
})