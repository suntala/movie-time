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

module.exports = router;