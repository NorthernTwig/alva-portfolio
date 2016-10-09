'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageInformation = mongoose.Schema({
    source: {
        type: String
    },
    description: {
      type: String
    }
})

module.exports = mongoose.model('imageInformation', imageInformation)
