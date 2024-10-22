const { AdminRepository } = require('../database/index')
const { Formatedata, ValidatePassword, GenerateSignature } = require('../utils/index')

class AdminService {
    constructor() {
        this.repository = new AdminRepository()
    }
    async SignUp(UserInputs) {
        try {
            const userData = await this.repository.CreateAdmin(UserInputs)
            return Formatedata(userData)
        } catch (error) {
            console.log('Error location Admin services SignUp', error)
        }
    }

    async Signin(UserInputs) {
        try {
            const { email, password } = UserInputs
            const existingUser = await this.repository.FindAdmin(UserInputs)
            if (existingUser) {
                const passwordValidation = await ValidatePassword(existingUser.password, password, existingUser.salt)
                if (passwordValidation) {
                    const token = await GenerateSignature({ email: existingUser.email, _id: existingUser._id })
                    return Formatedata({ _id: existingUser._id, token })
                } else {
                    return Formatedata("Invalid password or email id")
                }
            } else {
                return Formatedata("You are not registered please signUP with your email id")
            }
        } catch (error) {
            console.log('Error Location is Signin admin service', error)
        }
    }
}

module.exports = AdminService