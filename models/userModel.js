const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name: String,
    category: String,
    owner: String,
    dateInsert: Date,
    dateDue: Date,
    dateCloture: Date
})

const messageSchema = mongoose.Schema({
    title: String,
    content: String,
    read: Boolean,
    dateExp: String,
    sender: String
})

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    status: String,
    gender: String,
    dateInsert: Date,
    messages: [messageSchema],
    tasks: [taskSchema]
})

const User = mongoose.model('User', userSchema)

module.exports = User