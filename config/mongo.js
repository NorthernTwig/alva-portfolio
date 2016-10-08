"use strict"

const mongoose = require("mongoose")
const db = mongoose.connection
const DATABASE_NAME = 'example'

module.exports = () => {

    // Allows for mongoose promises
    mongoose.Promise = global.Promise

    // Connects to the selected server as param
    mongoose.connect("mongodb://localhost/" + DATABASE_NAME)

    // On error
    db.on("error", err => {
      console.log(err)
        console.log("Mongo could not establish connection.")
    })

    // On open
    db.once("open", () => {
        console.log("Mongo established connection.")
    })

    // When shut down
    process.on("SIGINT", () => {
        db.close(() => {
            console.log("Mongo connection has been terminated.")
            process.exit(0)
        })
    })

}
