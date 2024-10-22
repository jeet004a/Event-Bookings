const { AdminDB } = require('../models')
const { GenerateSalt, GeneratePassword } = require('../../utils')



class AdminRepository {
    async CreateAdmin(UserInputs) {
        try {
            const { email, password, personal_contact, role, compnay_name } = UserInputs
            const salt = await GenerateSalt()
            const saltpassword = await GeneratePassword(password, salt)
            const result = new AdminDB({
                email,
                password: saltpassword,
                salt,
                contact: personal_contact,
                companyName: compnay_name,
                role,
            })

            const user = await result.save()
            return user
        } catch (error) {
            console.log('Error Location Create Admin, Repository', error)
        }

    }

    async FindAdmin(UserInputs) {
        try {
            const { email, password } = UserInputs
            const existingAdmin = await AdminDB.findOne({ email: email })
            if (existingAdmin) {
                return existingAdmin
            }
            return false
        } catch (error) {
            console.log('Error Location FindAdmin Admin Repo', error)
        }
    }
}

module.exports = AdminRepository