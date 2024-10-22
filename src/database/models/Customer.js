const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CustomerSchema = new mongoose.Schema({
    email: String,
    password: String,
    salt: String,
    phone: String,
    bookings: [
        { type: Schema.Types.ObjectId, ref: 'order', require: true }
    ],
    // oldBookings: [
    //     { type: Schema.Types.ObjectId, ref: 'order', require: true }
    // ],
    cart: [
        { type: Schema.Types.ObjectId, ref: 'eventservice', require: true }
    ]
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
})


module.exports = mongoose.model('customer', CustomerSchema)