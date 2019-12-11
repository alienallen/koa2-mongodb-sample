const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const controller = require('./controller')
const rest = require('./rest');
const db = require('./config/database')
const env = require('./config/environment')
const logger = require('./config/logger')

const app = new Koa()

// handle CORS
app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}))

// log request URL
app.use(async (ctx, next) => {
  logger.info(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})

// parse request body
app.use(bodyParser())

// bind .rest() for ctx
app.use(rest.restify())

// add controllers
app.use(controller())

// // connect to database
// db.connectDatabase(env.connectionString)

// app.listen(env.port)
// logger.info(`server started on port ${env.port} (${env.mode})`)

db.connectDatabase(env.connectionString)
  .then(() => app.listen(env.port, () => logger.info(`server started on port ${env.port} (${env.mode})`)))
  .catch(err => logger.error(err));
  
