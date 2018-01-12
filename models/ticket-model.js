const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)


const TicketSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    front: {
        type: Boolean,
        required: true
    }
})


TicketSchema.plugin(AutoIncrement, { inc_field: 'ticketID' })  
module.exports = mongoose.model('Ticket', TicketSchema)  