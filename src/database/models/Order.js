const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Order = new mongoose.Schema({
    orderId: String,
    // serviceId: [
    //     { type: Schema.Types.ObjectId, ref: 'eventservice', require: true }
    // ],
    services: [
        { type: String }
    ],
    orgName: String,
    OrderStatus: { type: String, default: 'Pending' },
    amount: Number,
    customerId: String,
    bookingdate: [{
        type: Date,
        require: true
    }],
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

module.exports = mongoose.model('order', Order)