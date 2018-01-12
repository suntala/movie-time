const express = require('express')
const bodyParser = require('body-parser')
require(`./database-connection`)

const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.set('view engine', 'pug')


const home = require('./routes/home')
const ticket = require('./routes/ticket')
const customer = require('./routes/customer')

app.use('/', home)
app.use('/tickets', ticket)
app.use('/customers', customer)



module.exports = app