'use strict'

const mongoose = require('mongoose')


const Pets = mongoose.model('Pets', {
    name: String,
    type: String,
    description: String,
    date: {type: Date, default: Date.now}
})

module.exports = Pets;