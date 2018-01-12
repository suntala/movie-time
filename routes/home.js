const express = require('express')
const router = express.Router();
const TicketService = require('../services/ticket-service') 


router.get('/', async (req, res, next) => {
    res.render('index')
});

router.post('/', async (req, res, next) => {
    const ticket = await TicketService.add(req.body)
    res.send(ticket)
})



module.exports = router;