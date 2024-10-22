const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../config')


module.exports.GenerateSalt = async() => {
    try {
        return await bycrpt.genSalt()
    } catch (error) {
        console.log('Error location Generate salt', error)
    }
}
module.exports.GeneratePassword = async(password, salt) => {
    try {
        return await bycrpt.hash(password, salt)
    } catch (error) {
        console.log('Error location Generate pass', error)
    }
}


module.exports.GenerateSignature = async(payload) => {
    try {
        return jwt.sign(payload, APP_SECRET, { expiresIn: '1d' })
    } catch (error) {
        console.log('Error location Generate Signature', error)
    }
}

module.exports.ValidateSignature = async(req) => {
    try {
        for (let i = 0; i < req.rawHeaders.length; i++) {
            if (req.rawHeaders[i].split(" ")[0] === "Bearer") {
                const token = req.rawHeaders[i].split(" ")[1]
                const payload = await jwt.verify(token, APP_SECRET)
                req.user = payload
                return true
            }
        }
        // console.log(req.rawHeaders[3].split(" ")[1])
    } catch (error) {
        console.log('Error location Validate Signature', error)
    }
}

module.exports.ValidatePassword = async(existingPassword, enteredPassword, salt) => {
    try {
        // console.log(await this.GeneratePassword(enteredPassword, salt))
        // console.log(existingPassword)
        return existingPassword === await this.GeneratePassword(enteredPassword, salt)
    } catch (error) {
        console.log('Error location Validate password sign in service', error)
    }
}

module.exports.Formatedata = async(payload) => {
    try {
        if (payload) {
            return { payload }
        }
    } catch (error) {
        console.log('Error location formate data utils', error)
    }
}