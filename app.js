// express
let express = require('express')

//port 
let port = 3000

// middleware
let createError = require('http-errors')
let logger = require('morgan')
let helmet = require('helmet')
let bodyParser = require('body-parser')
let cors = require('cors')
let getSessionId = require('./security/middleware/getSessionId')

// setup app
let app = express()

app.use(cors())

app.use('/static', express.static(__dirname + '/static'))

app.use(getSessionId)

// apply middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(helmet())
app.use(getSessionId())

//routes
// serve frontend
let indexRouter = require('./routes/index')
app.use('/', indexRouter)
// tickets CRUD
let ticketsRouter = require('./routes/tickets')
app.use('/api/v1/tickets', ticketsRouter)
// ticket comments
let ticketCommentsRouter = require('./routes/ticketComments')
app.use('/api/v1/ticketComments', ticketCommentsRouter)
// users
let usersRouter = require('./routes/users')
app.use('/api/v1/users', usersRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
