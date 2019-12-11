const products = require('../mock/products');
const APIError = require('../rest').APIError

module.exports = {
    'GET /api/feedbacks': async (ctx, next) => {
        ctx.rest({
            products: products.getProducts()
        })
    },

    'GET /api/feedbacks/:customerid': async (ctx, next) => {
        console.log(`get feedback from ${ctx.params.customerid}...`)
        var p = products.getProduct(ctx.params.customerid)
        if (p) {
            ctx.rest(p)
        } else {
            throw new APIError('product:not_found', 'product not found by id.')
        }
    },

    'POST /api/feedbacks': async (ctx, next) => {
        var p = products.createProduct(ctx.request.body.name, ctx.request.body.manufacturer, parseFloat(ctx.request.body.price))
        ctx.rest(p)
    }
}
