'use strict'

const router = require('express').Router()
const imageInformation = require('../models/imageInformation.js')


router.route('/')
    .get((req, res) => {
        return res.render('home')
    })

module.exports = router
