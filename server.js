// Loading the express module on our server
const express = require('express')

// Creates a new instance of express on our server
const app = express()

app.get('/', function (req, res) {
  // when a request comes in at localhost:3000, it will respond
})

// tells the server where to listen for requests
const port = process.env.PORT || 3000

app.listen(port, function () {
  // tells the server where to listen for requests on port 3000

  console.log(`Jalees is listening on port ${port}`)
}) // actualizing the line above
