const CustomerModel = require('../models/customer-model')  
const TicketService = require('../services/ticket-service')  

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
    if (typeof data.funds !== 'undefined'){ customer.funds = data.funds }     
    if (typeof data.haveSeat !== 'undefined'){ customer.haveSeat = data.haveSeat }  
    if (typeof data.seatNumber !== 'undefined'){ customer.seatNumber = data.seatNumber }     
    if (typeof data.paid !== 'undefined'){ customer.paid = data.paid }        
    const newCustomer = await customer.save();
    return newCustomer;
}


const reserveSeat = async (ticketID, customerID, time) => {
    const ticket = await TicketService.find(ticketID)
    const customer = await find(customerID)

    if (time != 0) {
        let newTicket;
        const timeIsUp = async () => {

            if (customer.paid) {
                ticket.status = "unavailable"
                // customer.haveSeat = true   //add seatNumber
                newTicket = await ticket.save()  
            }
            else {
                ticket.status = "available"
                customer.haveSeat = false
                newTicket = await ticket.save()  
                await customer.save()   
            }
            console.log("Time is up")
        }

        if (!customer.haveSeat && (ticket.status == "available")) {
            ticket.status = "reserved"
            customer.haveSeat = true
            await ticket.save()
            await customer.save()

            setTimeout(timeIsUp, time);
        }
        return `Please wait ${time}`
    }
    else {
        let newTicketImmediate;
        let firstStage = ticket.status
        if (!customer.haveSeat && (ticket.status == "available")) {
            ticket.status = "reserved"
            firstStage = "reserved"

            customer.haveSeat = true
            await ticket.save()
            await customer.save()
            
            let secondStage = firstStage
            if (customer.paid) {
                ticket.status = "unavailable"
                secondStage = "unavailable"
                // customer.haveSeat = true   //add seatNumber
                newTicketImmediate = await ticket.save() 
            }
            else {
                ticket.status = "available"
                secondStage = "available"
                customer.haveSeat = false
                newTicketImmediate = await ticket.save()  
                await customer.save()   
            }
            const answer = [firstStage, secondStage, newTicketImmediate]
            return answer
        }
    }   
}


const paySeat = async (ticketID, customerID) => {
    const ticket = await TicketService.find(ticketID)

    const customer = await find(customerID)
    const price = await TicketService.giveTicketPrice(ticketID)

    let newCustomer;
    if (!customer.haveSeat && (ticket.status == "available")) {
        customer.funds -= price
        customer.paid = true
        newCustomer = await customer.save()
    }

    return newCustomer
}


module.exports = {
    findAll,
    add,
    del,
    find,
    edit,
    reserveSeat, 
    paySeat
}
