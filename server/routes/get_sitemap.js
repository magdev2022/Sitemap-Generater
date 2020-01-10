const SitemapGenerator = require('advanced-sitemap-generator');
const SiteMap = require('./../model/Sitemap')
module.exports = (router) => {
    router.route('/get_sitemap')
        .post((req, res, next) => {
            if (req.body.site_url) {
                const url = req.body.site_url
                if (url.includes("http://") | url.includes("https://")) {
                    SiteMap.remove().exec()
                    const generator = SitemapGenerator(url, {
                        stripQuerystring: false,
                        ignoreHreflang: true
                    });
                    // register event listeners
                    generator.on('done', () => {
                        res.json({ "status": "ok" })
                    });
                    generator.on('add', (result) => {
                        const reqtime = result.stateData.requestTime
                        const save_map = { url: result.url, hashtag: result.uriPath, depth: result.depth, requestTime: reqtime }
                        const save = new SiteMap(save_map)
                        save.save((err, data) => {

                        })
                    });
                    generator.on('error', (error) => {
                        console.log(error)
                    });
                    generator.on('ignore', (url) => {
                        // log ignored url
                    });
                    // start the crawler
                    generator.start();
                } else {
                    res.json({ "err": "Invalid URL" })
                }
            } else {
                res.json({ "err": "Empty URL" })
            }
        })
}
