const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EventService = new mongoose.Schema({
    title: String,
    category: String,
    pricePD: Number,
    availabilityDates: {
        type: Date,
        require: true
    },
    contactDetails: String,
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


module.exports = mongoose.model('eventservice', EventService)