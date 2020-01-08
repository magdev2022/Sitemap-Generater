const get_sitemap = require('./get_sitemap')
const download_sitemap = require('./download_sitemap')
const send_sitemap = require('./send_sitemap')
module.exports = (router) => {
    get_sitemap(router)
    download_sitemap(router)
    send_sitemap(router)
}