'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageInformation = mongoose.Schema({
    source: {
        type: Array
    }
})

module.exports = mongoose.model('imageInformation', imageInformation)
