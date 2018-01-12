const fs = require('fs')
const CustomerModel = require('../models/customer-model')  
const TicketService = require('../services/ticket-service')  
// const theaterFunds = require('../theater-funds')
// import { theaterFunds } from '../theater-funds.js'

const add = (customer) => {
    return CustomerModel.create(customer)
}

const findAll = () => {
    return CustomerModel.find()
}

const del = (customerID) => {
    return CustomerModel.remove({ customerID })
}

const find = (customerID) => {
    return CustomerModel.findOne({ customerID })
}

const edit = async (customerID, data) => {
    const customer = await CustomerModel.findOne({ customerID })
    if (typeof data.name !== 'undefined'){ customer.name = data.name }     
    if (typeof data.status !== 'undefined'){ customer.status = data.status }     
    if (typeof data.front !== 'undefined'){ customer.front = data.front }     
    const newCustomer = await customer.save();
    return newCustomer;
}


const reserveSeat = async (ticketID, customerID) => {
    const ticket = await TicketService.find(ticketID)
    const customer = await find(customerID)

    const timeIsUp = () => {
        console.log("Time is up")
    }
    

    let newTicket;
    if (!customer.haveSeat) {
        ticket.status = "reserved"
        customer.haveSeat = true
        await ticket.save()
        await customer.save()
        // setTimeout(myFunc, 180000);
        setTimeout(timeIsUp, 30000);

        
        if (customer.paid) {
            ticket.status = "unavailable"
            // customer.haveSeat = true   //add seatNumber
            newTicket = await ticket.save()  //await setTimeout?
        }
        else {
            ticket.status = "available"
            customer.haveSeat = false
            newTicket = await ticket.save()  
            await customer.save()   
        }
    }
    // else{
    //     newTicket = ticket
    // }
}

// pay function....

const paySeat = async (ticketID, customerID) => {
    // console.log(ticketID)
    const ticket = await TicketService.find(ticketID)
    // console.log(ticket)

    const customer = await find(customerID)
    const price = await TicketService.giveTicketPrice(ticketID)

    let newCustomer;
    if (!customer.haveSeat) {
        customer.funds -= price
        newCustomer = await customer.save()
    }

    return newCustomer
}


// const buySeat = async (ticketID, customerID) => {
//     const ticket = await TicketModel.findOne({ ticketID })
//     const customer = await CustomerModel.findOne({ customerID })
//     if customer.haveSeat == false
//     remove the price from the funds
// }

module.exports = {
    findAll,
    add,
    del,
    find,
    edit,
    reserveSeat, 
    paySeat
}





// const reserveSeat = async (ticketID, customerID) => {
//     const ticket = await TicketService.find(ticketID)
//     const customer = await find(customerID)

//     const timeIsUp = () => {
//         console.log("Time is up")
//     }

//     if (!customer.haveSeat) {
//         ticket.status = "reserved"
//         const newTicket = await ticket.save()
//         // setTimeout(myFunc, 180000);
//         setTimeout(timeIsUp, 30000);
//         // console.log(theaterFunds)

//         if (customer.paid) {
//             ticket.status = "unavailable"
//             const newTicket = await ticket.save() 
//         }
//         else {
//             ticket.status = "available"
//             const newTicket = await ticket.save()     
//         }
        


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



// const reserveSeat = async (ticketID, customerID) => {
//     const ticket = await TicketService.find(ticketID)
//     const customer = await find(customerID)

//     const timeIsUp = () => {
//         console.log("Time is up")
//     }
    
//     let newTicket;
//     if (!customer.haveSeat) {
//         ticket.status = "reserved"
//         newTicket = await ticket.save()
//         // const newTicket = await ticket.save()
//         // setTimeout(myFunc, 180000);
//         setTimeout(timeIsUp, 30000);

//         if (customer.paid) {
//             ticket.status = "unavailable"
//             customer.haveSeat = true   //add seatNumber
//             newTicket = await ticket.save() 
//         }
//         else {
//             ticket.status = "available"
//             newTicket = await ticket.save()     
//         }
//     }



//     // if customerPaid
//     // ticketStatus = "unavailable"
//     // else
//     // ticketStatus = "available"
//     // and change the stuff for the customer too
//     // return newTicket
// }





// const reserveSeat = async (ticketID, customerID) => {
//     const ticket = await TicketService.find(ticketID)
//     const customer = await find(customerID)

//     const timeIsUp = () => {
//         console.log("Time is up")
//     }
    

//     // let newTicket;
//     if (!customer.haveSeat) {
//         ticket.status = "reserved"
//         customer.haveSeat = true
//         await ticket.save()
//         await customer.save()
//         // const newTicket = await ticket.save()
//         // setTimeout(myFunc, 180000);
//         setTimeout(timeIsUp, 30000);

        
//         if (customer.paid) {
//             ticket.status = "unavailable"
//             // customer.haveSeat = true   //add seatNumber
//             newTicket = await ticket.save() 
//         }
//         else {
//             ticket.status = "available"
//             customer.haveSeat = false
//             newTicket = await ticket.save()  
//             await customer.save()   
//         }
//     }
//     // else{
//     //     newTicket = ticket
//     // }



//     // if customerPaid
//     // ticketStatus = "unavailable"
//     // else
//     // ticketStatus = "available"
//     // and change the stuff for the customer too


//     // return newTicket
// }