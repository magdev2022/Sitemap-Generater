module.exports = (router) => {
    router.route('/get_sitemap')
        .post((req, res, next) => {
            if (req.body.site_url) {
                const url = req.body.site_url
                if (url.includes("http://") | url.includes("https://")) {
                    res.json({ "url": "ok" })
                } else {
                    res.json({ "err": "Invalid URL" })
                }
            } else {
                res.json({ "err": "Empty URL" })
            }
        })
}