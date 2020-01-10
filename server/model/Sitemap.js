const mongoose = require('mongoose')

let MapSchema = new mongoose.Schema({
    url: String,
    hashtag: String,
    depth: Number,
    requestTime: Number
})

module.exports = mongoose.model('Sitemap', MapSchema)