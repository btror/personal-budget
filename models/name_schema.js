const mongoose = require("mongoose")
const nameSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        trim: true,
        required: true
    }
}, { collection: 'budget_list'})

module.exports = mongoose.model('budget_list', nameSchema)
