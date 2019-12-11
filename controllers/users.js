const User = require('../models/user').UserModel;
const APIError = require('../rest').APIError;
const logger = require('../config/logger')

module.exports = {
    'GET /api/user/info': async (ctx, next) => {
        const data = await User.findOne({username: 'koa'})
        logger.info('data', data)
        const result = {
            code:200,
            data: data
        }
        ctx.rest({
            users: result
        })
    },
    'GET /api/user/login': async (ctx, next) => {
        
    }
}
