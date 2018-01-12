const fs = require('fs')
const TicketModel = require('../models/ticket-model')  

const add = async (ticket) => {
    return TicketModel.create(ticket)
}

const findAll = async () => {
    return TicketModel.find()
}

const del = async (ticketID) => {
    return TicketModel.remove({ ticketID })
}

const find = async (ticketID) => {
    return TicketModel.findOne({ ticketID })
}

const edit = async (ticketID, data) => {
    const ticket = await TicketModel.findOne({ ticketID })
    if (typeof data.name !== 'undefined'){ ticket.name = data.name }     
    if (typeof data.status !== 'undefined'){ ticket.status = data.status }     
    if (typeof data.front !== 'undefined'){ ticket.front = data.front }     
    const newTicket = await ticket.save();
    return newTicket;
}



module.exports = {
    findAll,
    add,
    del,
    find,
    edit
}