const ProductService = require('../services/event-service')
const AdminAuth = require('./middlewares/AdminAuth')



module.exports = async(app) => {
    const service = new ProductService()
    app.post('/service', AdminAuth, async(req, res, next) => {
        try {
            const { email } = req.user
            const result = await service.service({ data: req.body, email: email })
            if (result) {
                return res.status(200).json(result)
            }
            return res.status(200).json({ "msg": "ABC" })
        } catch (error) {
            console.log('error location add product', error)
        }
    })

    app.get('/admin/services', AdminAuth, async(req, res, next) => {
        try {
            const { email } = req.user
                // await service.adminservices({ email: email })
            const result = await service.adminservices({ email: email })
            if (result) {
                return res.status(200).json(result)
            }
            return res.status(200).json({ "msg": "Somthing went wrong" })
        } catch (error) {
            console.log('Error location')
        }
    })

    app.delete('/admin/:id', AdminAuth, async(req, res, next) => {
        try {
            const { email } = req.user
            const serviceId = req.params.id
            const result = await service.deleteService({ email, serviceId })
                // console.log(serviceId)
            if (result) {
                return res.status(200).json(result)
            }
            return res.status(200).json({ "msg": "Somthing went wrong" })
        } catch (error) {
            console.log('Error Location delete admin api', error)
        }
    })


    app.put('/admin/edit/:id', AdminAuth, async(req, res, next) => {
        try {
            const { email } = req.user
            const serviceId = req.params.id
            const result = await service.editService({ email, serviceId, body: req.body })
            if (result) {
                return res.status(200).json({ "MSG": result })
            }
            return res.status(200).json({ "msg": "Somthing went wrong" })
        } catch (error) {
            console.log('Error location Admin put api', error)
        }
    })

    app.get('/services', async(req, res, next) => {
        try {
            // await service.modifiedSearch(req.query)
            const result = await service.modifiedSearch(req.query)
                // const result = await service.getall()
            if (result) {
                return res.status(200).json(result)
            }
            return res.status(200).json({ "msg": "Somthing went wrong" })
        } catch (error) {
            console.log('Error location')
        }
    })

}