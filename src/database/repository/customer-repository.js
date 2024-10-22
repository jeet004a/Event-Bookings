const { CustomerModel, EventServiceModel, OrderDB } = require('../models')
const { v4: uuid } = require('uuid')

class CustomerRepository {
    async CreateCustomer(userInputs) {
        try {
            const { email, password, salt, phone } = userInputs
            const userData = new CustomerModel({
                email,
                password,
                salt,
                phone
            })
            const user = await userData.save()
            return user
        } catch (error) {
            console.log('error location customer repository create customer', error)
        }
    }
    async signin(userInputs) {
        try {
            const { email } = userInputs
            const existingUser = await CustomerModel.findOne({ email: email })
            return existingUser
        } catch (error) {
            console.log('error location', error)
        }
    }

    async AddToCart(userInputs) {
        try {
            const { _id, serviceId } = userInputs
            const existingUser = await CustomerModel.findOne({ _id: _id })
            const existingService = await EventServiceModel.findOne({ _id: serviceId })
            for (let i = 0; i < existingUser.cart.length; i++) {
                // console.log(existingService.cart[0])
                if (existingUser.cart[i].toString() === existingService._id.toString()) {
                    return "You are already opt this service at same date"
                }
            }

            existingUser.cart.push(existingService)
                // console.log(existingUser)

            if (existingUser) {
                return await existingUser.save()
                return 1
            } else {
                return "Something went wrong"
            }
        } catch (error) {
            console.log('Error location Create User order repository', error)
        }
    }

    async DeleteFromCart(userInputs) {
        try {
            const { _id, serviceId } = userInputs
            const existingUser = await CustomerModel.findOne({ _id: _id })
            for (let i = 0; i < existingUser.cart.length; i++) {
                if (existingUser.cart[i].toString() === serviceId.toString()) {
                    existingUser.cart.splice(i, 1)
                    return await existingUser.save()
                }
            }
            return "Somthing went wrong"
        } catch (error) {
            console.log('Error location')
        }
    }

    async CartDeatils(userInputs) {
            try {
                const { _id } = userInputs
                const existingUser = await CustomerModel.findById({ _id: _id }).populate('cart')
                    // console.log(existingUser.cart)
                return existingUser.cart
            } catch (error) {
                console.log('Error location Cart Details user repository', error)
            }
        }
        //Create Order Logic
    async CreateOrder(userInputs) {
        try {
            const { _id } = userInputs
            const existingUser = await CustomerModel.findById({ _id: _id }).populate('cart')
                // console.log(existingUser)
            if (existingUser.cart != null) {
                let result = []

                let orgName = new Set()
                for (let i = 0; i < existingUser.cart.length; i++) {
                    orgName.add(existingUser.cart[i].title)
                }
                orgName = Array.from(orgName)
                console.log(typeof(orgName[0]))
                console.log(typeof(existingUser.cart[0].title))
                for (let i = 0; i < orgName.length; i++) {
                    let amount = 0
                    let x = {}
                    let service = []
                    let availabilityDates = []
                    for (let j = 0; j < existingUser.cart.length; j++) {
                        if (orgName[i] === existingUser.cart[j].title) {
                            service.push(existingUser.cart[j].category)
                            availabilityDates.push(existingUser.cart[j].availabilityDates)
                            amount = amount + existingUser.cart[j].pricePD
                        }
                    }
                    let orderNumber = uuid()
                    let BB = new OrderDB({
                        orderId: orderNumber,
                        services: service,
                        orgName: orgName[i],
                        amount: amount,
                        customerId: existingUser._id,
                        bookingdate: availabilityDates
                    })

                    await BB.save()
                    existingUser.bookings.push(BB)
                }
                existingUser.cart = []
                await existingUser.save()
                    // console.log(result)
                return "Order Placed"
            } else {
                return "Cart is Empty"
            }
            return "Not Proceed"

        } catch (error) {
            console.log('Error location Create Order repository', error)
        }
    }

    async OrderDetails(Inputs) {
        try {
            const { _id } = Inputs
            const existingUser = await CustomerModel.findById({ _id: _id }).populate('bookings')
            return existingUser.bookings
        } catch (error) {
            console.log('Error location Order details repository', error)
        }
    }


}

module.exports = CustomerRepository