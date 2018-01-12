import test from 'ava'
import request from 'supertest'
import app from '../../app'


test ('Add tickets and get tickets page', async t => {
    const name1 = 'Test ' + Math.random()
    const name2 = 'Test ' + Math.random()

    await request(app).post('/tickets/add')
        .send({name: name1, status: "available", front: true})
    await request(app).post('/tickets/add')
        .send({name: name2, status: "available", front: false})
    
    const res = await request(app).get('/tickets')

    t.is(res.status, 200)
    t.regex(res.text, new RegExp(name1))
    t.regex(res.text, new RegExp(name2))
})
//check that unavailable is not displayed


test ('Get individual ticket page including price ', async t => {

    const input = {name:'Test ' + Math.random(), status: "available", front: true}

    const ticket = (await request(app).post('/tickets/add').send(input)).body

    const res = await request(app).get(`/tickets/${ticket.ticketID}`)
 
    t.is(res.status, 200)
    t.regex(res.text, new RegExp(input.name))
})
