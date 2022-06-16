const {PORT_CONNECT, MONGO_URL} = require('./helpers/env')
const app = require("./app");
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
app.use(express.json())
app.use(cors())

const routerApi = require('./api');
const { required } = require("joi");
app.use('/api', routerApi)

// const PORT = process.env.PORT || 3000
// const uriDb = process.env.MONGO_URL

const PORT = PORT_CONNECT || 3000
const uriDb = MONGO_URL

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) =>
    {console.log(`Server not running. Error message: ${err.message}`),
    process.exit(1)}
  )