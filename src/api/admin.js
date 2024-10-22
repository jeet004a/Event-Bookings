const AdminService = require('../services/admin-service')
const { AdminDB } = require('../database/models')
module.exports = async(app) => {
    const service = new AdminService()
    app.post('/admin/signup', async(req, res, next) => {
        try {
            const { email, password, personal_contact, compnay_name } = req.body
            const existingAdmin = await AdminDB.findOne({ email: email })
            if (existingAdmin) {
                return res.status(200).json({ "MSG": "Already registerd you organization with this email ID" })
            }
            let path = req.path
            path = path.substr(1, path.lenght).substr(0, path.substr(1, path.lenght).indexOf('/'))
            const Admin = await service.SignUp({ email, password, personal_contact, role: path, compnay_name })
            if (Admin) {
                return res.status(200).json(Admin)
            }
            return res.status(200).json({ "MSG": "Something Went wrong" })
        } catch (error) {
            console.log('Error ', error)
        }
    })

    app.get('/admin/signin', async(req, res, next) => {
        try {
            const { email, password } = req.body
            const AdminData = await service.Signin({ email, password })
            if (AdminData) {
                return res.status(200).json(AdminData)
            }
            return res.status(200).json({ "MSG": "Something Went wrong" })
        } catch (error) {
            console.log('Error location Admin signin', error)
        }
    })
}