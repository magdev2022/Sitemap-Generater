const csv = require('csv-parser')
const fs = require('fs')
module.exports = (router) => {
    router.route('/send_sitemap')
        .get((req, res, next) => {
            res.json({ "url": "ok" })
        })
}