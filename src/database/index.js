module.exports = {
    databaseConnection: require('./connection'),
    CustomerRepository: require('./repository/customer-repository'),
    ServiceRepository: require('./repository/service-repository'),
    AdminRepository: require('./repository/admin-repository')
}