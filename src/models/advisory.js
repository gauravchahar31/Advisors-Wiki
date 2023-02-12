const mongoose = require('mongoose')

const advisorySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
})

const Advisory = new mongoose.model("advisory", advisorySchema)

module.exports = Advisory