const express = require('express')
const { PORT } = require('./config/index')
const expressApp = require('./expressApp')
const { databaseConnection } = require('./database')
const StartServer = async() => {
    const app = express()
    await databaseConnection()

    await expressApp(app)

    app.listen(PORT, () => {
            console.log(`Server started at port ${PORT}`)
        })
        // .on('error', (err) => {
        //     console.log('Error', err)
        //     process.exit()
        // })
}

StartServer()