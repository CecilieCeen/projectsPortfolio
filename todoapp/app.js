const express = require('express')
require('dotenv').config()
const path = require('path')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const app = express()
const cookieJwtAuth = require('./middleware/cookieJwtAuth')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Routes
const indexRouter = require('./routes/index')
const userRoute = require('./routes/users')
const todoRoute = require('./routes/todos');

// To pass data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))

// Allow static files
app.use(express.static(path.join(__dirname, "public")))

// Allow cookie parsing:
app.use(cookieParser())

// Allow POST methods to update db GOES HERE:

// Setup routes
app.use('/users', userRoute)
app.use('/todos', cookieJwtAuth, todoRoute)

// Index router / frontpage
app.use('/', indexRouter)


app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })