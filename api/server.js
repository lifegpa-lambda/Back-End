const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authRouter = require('../auth/auth-routes.js')
const userRouter = require('../router/users-routes.js')
const categoryRouter = require('../router/categories-routes.js')
const habitRouter = require('../router/habits-routes.js')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api', authRouter)
server.use('/api/users', userRouter)
server.use('/api/habits', habitRouter)
server.use('/api/categories', categoryRouter)

server.get('/', (req, res) => {
    res.status(200).send(`
      <div>
        <h2>Server Running Live...</h2>
        <p>Url to Login endpoint <strong>'/api/login'</strong></p>
        <p>Url to Register endpoint <strong>'/api/register'</strong></p>
      </div>`);
  });

module.exports = server
