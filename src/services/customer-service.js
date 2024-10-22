const { CustomerRepository } = require('../database')
const { GenerateSalt, GeneratePassword, GenerateSignature, Formatedata, ValidatePassword } = require('../utils')
class CustomerService {
    constructor() {
        this.repository = new CustomerRepository()
    }
    async signup(userInputs) {
        try {
            const { email, password, phone } = userInputs
            const salt = await GenerateSalt()
            const userPassword = await GeneratePassword(password, salt)
            const UserData = await this.repository.CreateCustomer({ email, password: userPassword, salt, phone })
            console.log(UserData)
            const token = await GenerateSignature({ email, _id: UserData._id })
            return Formatedata({ id: UserData._id, token })
        } catch (error) {
            console.log('Error location customer service signup', error)
        }
    }

    async signin(userInputs) {
        try {
            const { email, password } = userInputs
            // await this.repository.signin(userInputs)
            const userData = await this.repository.signin(userInputs)
            const passwordValidator = await ValidatePassword(userData.password, password, userData.salt)
                // await ValidatePassword(userData.password, password, userData.salt)
            if (passwordValidator) {
                const token = await GenerateSignature({ email: userData.email, _id: userData._id })
                return Formatedata({ id: userData._id, token })
            }


        } catch (error) {
            console.log('Error location customer service singin', error)
        }
    }
    async UserCart(Inputs) {
        try {
            const result = await this.repository.AddToCart(Inputs)
            return Formatedata(result)
        } catch (error) {
            console.log('Error location create order', error)
        }
    }
    async DeleteUserCart(Inputs) {
        try {
            const result = await this.repository.DeleteFromCart(Inputs)
                // return Formatedata("Hello")
            return Formatedata(result)
        } catch (error) {
            console.log('Error Location Delete user cart', error)
        }
    }

    async CartDetails(Inputs) {
            try {
                const result = await this.repository.CartDeatils(Inputs)
                return Formatedata(result)
            } catch (error) {
                console.log('Error location Cart Details customer service', error)
            }
        }
        //Create Order Logic
    async UserOrder(Inputs) {
        try {
            // console.log(Inputs)
            const result = await this.repository.CreateOrder(Inputs)
            return Formatedata(result)
        } catch (error) {
            console.log('error location User Order customer service', error)
        }
    }

    async AllOrder(Inputs) {
        try {
            const result = await this.repository.OrderDetails(Inputs)
            return Formatedata(result)
        } catch (error) {
            console.log('Error location Allorder customer service', error)
        }
    }

}

module.exports = CustomerService