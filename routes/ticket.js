const express = require('express')
const router = express.Router();
const TicketService = require('../services/ticket-service') 


router.post('/add', async (req, res, next) => {
    const ticket = await TicketService.add(req.body)
    res.send(ticket)
})

router.get('/', async (req, res, next) => {
    const tickets = await TicketService.findAvailableSeats()
    res.send(tickets)
})

router.get('/:ticketID', async (req, res, next) => {
    const ticket = await TicketService.find(req.params.ticketID)
    const price = await TicketService.giveTicketPrice(req.params.ticketID)
    const fullDetails = [ticket,price]
    res.send(fullDetails)
})

module.exports = router;