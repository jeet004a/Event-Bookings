const { DB_URL } = require('../config/index')

const mongoose = require('mongoose')

module.exports = async() => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true
        })
        console.log('DB Connected')
    } catch (error) {
        console.log('Error while connecting to DB', error)
    }
}