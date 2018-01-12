import test from 'ava'
import request from 'supertest'
import app from '../../app'


test ('Add customer and get designated page', async t => {
    const input = {name: 'MovieBuff ' + Math.random(), haveSeat: false}
    const customer = (await request(app).post('/customers/add').send(input)).body

    const res = await request(app).get(`/customers/${customer.customerID}`)

    t.is(res.status, 200)
    t.regex(res.text, new RegExp(input.name))
    t.is(res.body.funds, 100000)
    t.is(res.body.haveSeat, false)
})
//put more details and check each detail for test customer...

test ('Reserve a ticket', async t => {
    const inputCustomer = {name: 'MovieBuff ' + Math.random(), haveSeat: false}
    const inputTicket = {name:'Test ' + Math.random(), status: "available", front: true}
    const customer = (await request(app).post('/customers/add').send(inputCustomer)).body
    const ticket = (await request(app).post('/tickets/add').send(inputTicket)).body

    // console.log([customer, ticket])
    const res = await request(app)
        .post(`/customers/${customer.customerID}/reserve-ticket`)
        .send({ticketID: ticket.ticketID})
   
    t.is(res.status, 200)
})
//maybe return the new details in one of the customer-service functions (check which)



test ('Pay for a ticket', async t => {
    const inputCustomer = {name: 'MovieBuff ' + Math.random(), haveSeat: false}
    const inputTicket = {name:'Test ' + Math.random(), status: "available", front: true}
    const customer = (await request(app).post('/customers/add').send(inputCustomer)).body
    const ticket = (await request(app).post('/tickets/add').send(inputTicket)).body

    // console.log([customer, ticket])
    const res = await request(app)
        .post(`/customers/${customer.customerID}/buy-ticket`)
        .send({ticketID: ticket.ticketID})
   
    t.is(res.status, 200)
    t.is(res.body.funds, customer.funds - 20)
    t.is(res.body.paid, true)
})
//maybe return the new details in one of the customer-service functions (check which)





// test ('Get individual ticket page including price ', async t => {

//     const input = {name:'Test ' + Math.random(), status: "available", front: true}

//     const ticket = (await request(app)
//         .post('/tickets/add')
//         .send(input))
//         .body

//     const res = await request(app).get(`/tickets/${ticket.ticketID}`)
 
//     t.is(res.status, 200)
//     t.regex(res.text, new RegExp(input.name))
// })
