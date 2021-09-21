const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    weight: Number,
    img: String
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article