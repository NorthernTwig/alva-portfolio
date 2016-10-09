'use strict'

const router = require('express').Router()
const imageInformation = require('../models/imageInformation.js')

router.route('/images')
    .get((req, res) => {
        imageInformation.findOne({})
            .then(imageDatabase => {
                let jsonified = JSON.stringify(imageDatabase.source)
                return res.send(jsonified)
            })
            .catch(err => console.log(err))
    })

module.exports = router
