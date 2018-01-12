const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)


const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    funds: {
        type: Number,
        required: true
    }
})


CustomerSchema.plugin(AutoIncrement, { inc_field: 'customerID' })  
module.exports = mongoose.model('Customer', CustomerSchema)  