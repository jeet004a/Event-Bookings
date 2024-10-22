const CustomerService = require('../services/customer-service')
const { CustomerModel } = require('../database/models')
const { GenerateSignature, Formatedata } = require('../utils/index')
const UserAuth = require('./middlewares/UserAuth')
module.exports = async(app) => {
    const service = new CustomerService()
    app.post('/customer/signup', async(req, res) => {
        try {
            const { email, password } = req.body
            const existingUser = await CustomerModel.findOne({ email: email })
            if (!existingUser) {
                const userdata = await service.signup(req.body)
                if (userdata) {
                    return res.status(200).json(userdata)
                }
            } else {
                const token = await GenerateSignature({ email: existingUser.email, _id: existingUser._id })
                const data = await Formatedata({ id: existingUser._id, token })
                console.log(data)
                return res.status(200).json({ "Existing user": data })
            }
            return res.status(404).json({ 'msg': 'Somthing went wrong' })
        } catch (error) {
            console.log(error)
        }
    })

    app.get('/customer/signin', async(req, res) => {
        try {
            const { email, password } = req.body
            const userData = await service.signin(req.body)
            if (userData) {
                return res.status(200).json(userData)
            }
            return res.status(200).json({ "MSG": 'Somthing went wrong' })
        } catch (error) {
            console.log('Error location customer signin', error)
        }
    })

    app.post('/customer/:id', UserAuth, async(req, res) => {
        try {
            const { email, _id } = req.user
            const serviceId = req.params.id
            const result = await service.UserCart({ _id, serviceId })
            if (result) {
                return res.status(200).json(result)
            }
            return res.status(200).json({ "MSG": 'Somthing went wrong' })
        } catch (error) {
            console.log('Error location cutomer post request', error)
        }
    })

    app.delete('/customer/:id', UserAuth, async(req, res, next) => {
        try {
            const { email, _id } = req.user
            const serviceId = req.params.id
                // console.log(serviceId)
            const result = await service.DeleteUserCart({ _id, serviceId })
            if (result) {
                return res.status(200).json(result)
            }
            return res.status(200).json({ "MSG": 'Somthing went wrong' })
        } catch (error) {
            console.log('Error location ')
        }
    })

    app.get('/customer/cart', UserAuth, async(req, res, next) => {
        try {
            const { email, _id } = req.user
            const result = await service.CartDetails({ _id })
            if (result) {
                return res.status(200).json(result)
            }
            // console.log(result)
            return res.status(200).json({ "MSG": 'Somthing went wrong' })
        } catch (error) {
            console.log('Error location get user cart api', error)
        }
    })

    //Create Order Logic
    app.post('/orders', UserAuth, async(req, res, next) => {
        try {
            const { _id, email } = req.user
                // console.log(req.user)
            const userData = await service.UserOrder({ _id })
            if (userData) {
                return res.status(200).json(userData)
            }
            return res.status(200).json({ "MSG": 'Somthing went wrong' })
        } catch (error) {
            console.log('Error location post order api', error)
        }
    })

    app.get('/order', UserAuth, async(req, res, next) => {
        try {
            const { _id, email } = req.user
            const userData = await service.AllOrder({ _id })
            if (userData) {
                return res.status(200).json(userData)
            }
            return res.status(200).json({ "MSG": 'Somthing went wrong' })
        } catch (error) {
            console.log('Error location get order api', error)
        }
    })



}