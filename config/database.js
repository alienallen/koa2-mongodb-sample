const parse = require('url-parse')
const mongoose = require('mongoose')
const logger = require('./logger')

// const redis = {
//     get host() {
//       return '127.0.0.1'
//     },
//     get port() {
//       return 6379
//     }
// }

module.exports = {
    // redis,
    connectDatabase: async (connectionString) => {
        mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })

        mongoose.set('useNewUrlParser', true)
        mongoose.set('useFindAndModify', false)
        mongoose.set('useCreateIndex', true)

        const dbConnect = mongoose.connection
        mongoose.Promise = global.Promise // 防止Mongoose: mpromise 错误

        // mongoose.set('debug', configs.mode === 'development')
        dbConnect.on('connecting', () => logger.info('Connecting to MongoDb...'))
        dbConnect.on('open', () => logger.info('Connection to MongoDb opened'))
        dbConnect.on('connected', () => logger.info('Connected to MongoDb'))
        dbConnect.on('reconnected', () => logger.info('Reconnected to MongoDb'))
        dbConnect.on('disconnected', () => logger.error('Disconnected from MongoDb'))

        dbConnect.on('error', err => {
            logger.error(`MongoDb Error ${err}`)
            mongoose.disconnect()
        })
    }
    // connectDatabase: (connectionString) => {
    //     return async (connectionString) => {
    //         // URL encodes the password for a Cosmos DB connection string
    //         // Needed because mongodb driver 3.0 and above requires passwords to be encoded
    //         const parsedURL = parse(connectionString)
    //         if (parsedURL.password) {
    //             // Decode before encode is used to maintain compatibility with previously
    //             // encoded passwords
    //             parsedURL.set('password', encodeURIComponent(decodeURIComponent(parsedURL.password)))
    //         }
    //         connectionString = parsedURL.href
    //         const connect = async () => {
    //             await mongoose.connect(connectionString, { useNewUrlParser: true })
    //         }
    //         mongoose.set('debug', configs.mode === 'development')
    //         mongoose.connection.on('connecting', () => logger.info('Connecting to MongoDb...'))
    //         mongoose.connection.on('open', () => logger.info('Connection to MongoDb opened'))
    //         mongoose.connection.on('connected', () => logger.info('Connected to MongoDb'))
    //         mongoose.connection.on('reconnected', () => logger.info('Reconnected to MongoDb'))
    //         mongoose.connection.on('disconnected', () => logger.error('Disconnected from MongoDb'))

    //         mongoose.connection.on('error', err => {
    //             logger.error(`MongoDb Error ${err}`)
    //             mongoose.disconnect()
    //         })

    //         try {
    //             await connect()
    //         } catch (err) {
    //             logger.error(`MongoDb first connection attempt failed ${err}`)
    //         }
    //     }
    // }
}