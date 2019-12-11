
module.exports = {
    'GET /': async (ctx, next) => {
        // ctx.render('index.html');
        ctx.response.body = '<h1>This is a backend service...</h1>'
    }
};
