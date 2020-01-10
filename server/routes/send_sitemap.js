const SiteMap = require('./../model/Sitemap')

module.exports = (router) => {
    router.route('/send_sitemap')
        .get((req, res, next) => {
            SiteMap.find((err, result) => {
                res.json({ "result": result })
            })
        })
}
