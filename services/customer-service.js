const fs = require('fs')
const CustomerModel = require('../models/customer-model')  

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
    if (typeof data.status !== 'undefined'){ customer.status = data.status }     
    if (typeof data.front !== 'undefined'){ customer.front = data.front }     
    const newCustomer = await customer.save();
    return newCustomer;
}



module.exports = {
    findAll,
    add,
    del,
    find,
    edit
}