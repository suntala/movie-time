const fs = require('fs')
const TicketModel = require('../models/ticket-model')  
const CustomerModel = require('../models/customer-model')  


const add = (ticket) => {
    return TicketModel.create(ticket)
}

const findAll = () => {
    return TicketModel.find()
}

const del = (ticketID) => {
    return TicketModel.remove({ ticketID })
}

const find = (ticketID) => {
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

const findAvailableSeats = async () => {
    return TicketModel.find({status: "available"})
    // return findAll()
}

const giveTicketPrice = async (ticketID) => {
    const ticket = await find(ticketID)
    // console.log(ticket)
    if (ticket.front) {
        return 20
    }
    else {
        return 10
    }
}

// const reserveSeat = async (ticketID, customerID) => {
//     const ticket = await find(ticketID)
//     const customer = await CustomerModel(customerID)

//     const timeIsUp = () => {
//         console.log("Time is up")
//     }

//     if (!customer.haveSeat) {
//         ticket.status = "reserved"
//         // setTimeout(myFunc, 180000);
//         setTimeout(myFunc, 60000);


//         // if 

//     }

//     // if customer.haveSeat == false
//     // ticketStatus = "reserved"
//     // wait 3 mins

//     // if customerPaid
//     // ticketStatus = "unavailable"
//     // else
//     // ticketStatus = "available"
//     // and change the stuff for the customer too

// }

// // const buySeat = async (ticketID, customerID) => {
// //     const ticket = await TicketModel.findOne({ ticketID })
// //     const customer = await CustomerModel.findOne({ customerID })
// //     if customer.haveSeat == false
// //     remove the price from the funds
// // }

module.exports = {
    findAll,
    add,
    del,
    find,
    edit,
    findAvailableSeats, 
    giveTicketPrice
}