'use strict'

const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
const secret = require('./secret/session_secret.js')
const facebook = require('../routes/facebook')

module.exports = () => {

    app.use(session({
        name: secret.NAME,
        secret: secret.SECRET,
        saveUninitialized: false,
        resave: false,
        httpOnly: true,
        cookie: {
            secure: false
        }
    }))

    app.use(bodyParser.json())

    app.use((req, res, next) => {
        res.locals.user = req.session.user || false
        next()
    })

    app.engine('.hbs', exphbs({
        extname: '.hbs',
        defaultLayout: 'main'
    }))
    app.set('view engine', '.hbs')

    app.use(express.static('public'))


    //Activate when done bae <3
    // facebook()

    app.use('/', require('../routes/home'))
    app.use('/', require('../routes/imageApi'))

    app.use('*', (req, res) => {
        return res.redirect('/')
    })

    app.listen(PORT, function () {
        console.log('Express up. ' + PORT)
    })

}
