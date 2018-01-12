const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)


const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    funds: {
        type: Number,
        default: 100000,
        required: true
    },
    // funds: 100000,
    haveSeat: {
        type: Boolean,
        required: true
    },
    seatNumber: {
        type: String
    }, 
    paid: {
        type: Boolean,
        default: false,
        required: true
    }
})


CustomerSchema.plugin(AutoIncrement, { inc_field: 'customerID' })  
module.exports = mongoose.model('Customer', CustomerSchema)  