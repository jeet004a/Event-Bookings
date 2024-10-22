const { ServiceRepository } = require('../database')
const { Formatedata } = require('../utils/index')
class Service {
    constructor() {
        this.repository = new ServiceRepository()
    }
    async service(inputs) {
        try {
            // await this.repository.createservice(inputs)
            const result = await this.repository.createservice(inputs)
            if (result) {
                return Formatedata(result)
            } else {
                return Formatedata("Somthing went worng")
            }
        } catch (error) {
            console.log('Error location product-service', error)
        }
    }
    async getall() {
        try {
            const result = await this.repository.GetAllServices()
                // console.log(result)
                // console.log('Hello')

            return Formatedata(result)
        } catch (error) {
            console.log('Error location product getall method', error)
        }
    }

    async modifiedSearch(Inputs) {
        try {
            const result = await this.repository.searchByKey(Inputs)
            return Formatedata(result)
                // await this.repository.searchByKey(Inputs)
        } catch (error) {
            console.log('Error location modified search event service', error)
        }
    }

    async adminservices(adminemail) {
        try {
            const result = await this.repository.GetAllAdminServices(adminemail)
            if (result) {
                return Formatedata(result)
            } else {
                return Formatedata("empty")
            }
        } catch (error) {
            console.log('Error location admin service service repository', error)
        }
    }

    async deleteService(inputs) {
        try {
            const result = await this.repository.DeleteAdminService(inputs)
            if (result) {
                return Formatedata("Service Deleted")
            }
            return Formatedata("Data Not Found")
        } catch (error) {
            console.log('Error location delete Service', error)
        }
    }

    async editService(inputs) {
        try {
            const result = await this.repository.EditEventService(inputs)
            if (result) {
                return Formatedata(result)
            }
            return Formatedata("Something Not wrong")
        } catch (error) {
            console.log('Error location editService', error)
        }
    }
}

module.exports = Service