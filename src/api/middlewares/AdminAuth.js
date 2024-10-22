const { ValidateSignature } = require('../../utils/index')

module.exports = async(req, res, next) => {
    try {
        const validateUser = await ValidateSignature(req)
        if (validateUser) {
            return next()
        }
        return res.status(403).json({ message: 'Not Authorized' })
    } catch (error) {
        console.log('Error Location Admin Auth', error)
    }
}