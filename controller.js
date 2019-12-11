
const fs = require('fs');
const logger = require('./config/logger')

// add url-route in /controllers:
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            logger.info(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path1 = url.substring(5);
            router.post(path1, mapping[url]);
            logger.info(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path2 = url.substring(4);
            router.put(path2, mapping[url]);
            logger.info(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path3 = url.substring(7);
            router.del(path3, mapping[url]);
            logger.info(`register URL mapping: DELETE ${path}`);
        } else {
            logger.info(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        logger.info(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
