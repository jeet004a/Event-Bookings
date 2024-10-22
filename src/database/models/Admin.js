const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AdminDB = new mongoose.Schema({
    email: String,
    password: String,
    salt: String,
    contact: String,
    companyName: String,
    role: String,
    registeredservices: [
        { type: Schema.Types.ObjectId, ref: 'eventservice', require: true }
    ],
    orders: [
        { type: Schema.Types.ObjectId, ref: 'order', require: true }
    ]

})

module.exports = mongoose.model('admin', AdminDB)