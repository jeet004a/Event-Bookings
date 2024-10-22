const { EventServiceModel, AdminDB } = require('../models/index')

class ServiceRepository {
    async createservice(inputs) {
        try {
            const { category, ppd, availability_dates, contact } = inputs.data
            const email = inputs.email
            const existingAdmin = await AdminDB.findOne({ email: email })
            console.log(existingAdmin)
            let date = new Date(availability_dates)
            const existingRecord = await EventServiceModel.findOne({ "title": existingAdmin.companyName, "category": category, "availabilityDates": date })
            if (existingRecord) {
                console.log(new Date())
                return "You are already added the categroy on this date"
            } else {
                if (date > new Date()) {
                    // return " Hello"
                    const data = new EventServiceModel({
                        title: existingAdmin.companyName,
                        category: category,
                        pricePD: ppd,
                        availabilityDates: date,
                        contactDetails: contact
                    })
                    const result = await data.save()
                    existingAdmin.registeredservices.push(result)
                    await existingAdmin.save()
                    return result
                } else {
                    return "Please enter future date"
                }

            }
        } catch (error) {
            console.log(error)
        }
    }


    async GetAllServices() {
        try {
            const result = await EventServiceModel.find({})
            return result
        } catch (error) {
            console.log('Error location GetAllServices servise')
        }
    }

    async GetAllAdminServices(inputs) {
        try {
            const { email } = inputs
            const existingAdmin = await AdminDB.findOne({ email: email })
            const result = await EventServiceModel.find({ title: existingAdmin.companyName })
            return result
        } catch (error) {
            console.log('Error location Get All Admin services', error)
        }
    }

    async DeleteAdminService(inputs) {
        try {
            const { email, serviceId } = inputs
            const AdminData = await AdminDB.findOne({ email: email })
            if (await EventServiceModel.findOne({ _id: serviceId, title: AdminData.companyName })) {
                const service = await EventServiceModel.deleteOne({ _id: serviceId, title: AdminData.companyName })
                    // console.log(AdminData.registeredservices)
                for (let i = 0; i < AdminData.registeredservices.length; i++) {
                    if (AdminData.registeredservices[i].toString() === serviceId.toString()) {
                        AdminData.registeredservices.splice(i, 1)
                        await AdminData.save()
                    }
                }
                return true
            }

            // console.log(AdminData)
            return false
        } catch (error) {
            console.log('Error location Delete Admin Service Repository', error)
        }
    }

    async EditEventService(inputs) {
        try {
            const { email, serviceId } = inputs
            const AdminData = await AdminDB.findOne({ email: email })
            const existingService = await EventServiceModel.findOne({ _id: serviceId, title: AdminData.companyName })
                // console.log(inputs.body)
            const { category, ppd, availability_dates, contact } = inputs.body
            let date = new Date(availability_dates)

            if (date > new Date()) {
                // return " Hello"
                const data = await EventServiceModel.updateOne({ _id: serviceId }, {
                        $set: {
                            category: category,
                            pricePD: ppd,
                            availabilityDates: date,
                            contactDetails: contact
                        }
                    })
                    // console.log(data)
                    // const result = await data.save()
                return true
            } else {
                return "Please enter future date"
            }
        } catch (error) {
            console.log('error location edit Service', error)
        }
    }


    async searchByKey(Inputs) {
        try {

            const title = Inputs.title ? Inputs.title.split(',') : []
            const category = Inputs.category ? Inputs.category.split(',') : []
            const minPrice = Inputs.minPrice || 0;
            const maxPrice = Inputs.maxPrice || Number.MAX_VALUE

            let startdate = new Date(Inputs.startDate)
            let enddate = new Date(Inputs.endDate)

            let query = {
                pricePD: { $gte: minPrice, $lte: maxPrice }
            }

            if (startdate || enddate) {
                query.availabilityDates = {}
                if (startdate) {
                    query.availabilityDates.$gte = new Date(Inputs.startDate)
                }
                if (enddate) {
                    query.availabilityDates.$lte = new Date(Inputs.endDate)
                }
            }

            if (title.length > 0) {
                query.title = { $in: title }
            }
            if (category.length > 0) {
                query.category = { $in: category }
            }
            const data = await EventServiceModel.find(query)
            if (data) {
                // console.log(data)
                return data
            } else {
                const result = await EventServiceModel.find({})
                return result
            }
            console.log(data)
            return "Somthing went wrong"
        } catch (error) {
            console.log('Error location search By Key repository', error)
        }
    }
}

module.exports = ServiceRepository