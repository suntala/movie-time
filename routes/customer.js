const express = require('express')
const router = express.Router();
const CustomerService = require('../services/customer-service') 


router.post('/add', async (req, res, next) => {
    const customer = await CustomerService.add(req.body)
    res.send(customer)
})

router.get('/:customerID', async (req, res, next) => {
    const customer = await CustomerService.find(req.params.customerID)
    res.send(customer)
})

router.post('/:customerID/reserve-ticket-test', async (req, res, next) => {
    const customer = await CustomerService.find(req.params.customerID)

    const stages = await CustomerService.reserveSeat(req.body.ticketID, req.params.customerID, 0) //also use 0 to test --> put in the right time later (create one for testing and one for regular)
    res.send(stages)
})

router.post('/:customerID/reserve-ticket', async (req, res, next) => {
    const customer = await CustomerService.find(req.params.customerID)

    const stages = await CustomerService.reserveSeat(req.body.ticketID, req.params.customerID, 180000) //also use 0 to test --> put in the right time later (create one for testing and one for regular)
    res.send(stages)
})

router.post('/:customerID/buy-ticket', async (req, res, next) => {
    const customer = await CustomerService.find(req.params.customerID)
    const newCustomer = await CustomerService.paySeat(req.body.ticketID, req.params.customerID)
    res.send(newCustomer)  
})



module.exports = router;