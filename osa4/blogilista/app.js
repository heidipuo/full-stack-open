//const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const morgan = require('morgan')




const mongoUrl = config.MONGODB_URI

logger.info('connecting to', mongoUrl)
mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(middleware.requestLogger)


app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app