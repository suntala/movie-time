const express = require('express')
const router = express.Router();
const TicketService = require('../services/ticket-service') 


router.get('/', async (req, res, next) => {
    res.render('index')
});





module.exports = router;