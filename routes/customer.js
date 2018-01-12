const express = require('express')
const router = express.Router();
const CustomerService = require('../services/customer-service') 


router.post('/add', async (req, res, next) => {
    const customer = await CustomerService.add(req.body)
    res.send(customer)
})

router.get('/:customerID', async (req, res, next) => {
    const customer = await CustomerService.find(req.params.customerID)
    // const fullDetails = [ticket, price]
    res.send(customer)
})

router.post('/:customerID/reserve-ticket', async (req, res, next) => {
    const customer = await CustomerService.find(req.params.customerID)
    // const fullDetails = [ticket, price]
    // const newTicket = await CustomerService.reserveSeat(req.body.ticketID, req.params.customerID)
    // res.send(newTicket)
    await CustomerService.reserveSeat(req.body.ticketID, req.params.customerID)
    res.send(customer)
})

router.post('/:customerID/buy-ticket', async (req, res, next) => {
    const customer = await CustomerService.find(req.params.customerID)
    // console.log(customer)
    // const fullDetails = [ticket, price]
    // const newTicket = await CustomerService.reserveSeat(req.body.ticketID, req.params.customerID)
    // res.send(newTicket)
    const newCustomer = await CustomerService.paySeat(req.body.ticketID, req.params.customerID)
    res.send(newCustomer)  //figure out about when it gets sent (logging in console...)
})

// router.get('/', async (req, res, next) => {
//     const tickets = await TicketService.findAvailableSeats()
//     res.send(tickets)
// })

// router.get('/:ticketID', async (req, res, next) => {
//     const ticket = await TicketService.find(req.params.ticketID)
//     const price = await TicketService.giveTicketPrice(req.params.ticketID)
//     const fullDetails = [ticket, price]
//     res.send(fullDetails)
//     // res.send(ticket)
// })

module.exports = router;