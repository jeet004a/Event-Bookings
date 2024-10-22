const express = require('express')
const { customer, service, admin } = require('./api')

module.exports = async(app) => {
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }))

    customer(app)
    service(app)
    admin(app)
}