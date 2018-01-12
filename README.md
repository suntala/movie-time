# movie-time

Reserve and buy tickets with Movie Time

Cameras  Lights  Action!  

Clone the repository:
git clone https://github.com/suntala/movie-time.git

Run the project: 
node index.js

Add customer and get designated page: 
    .post('/customers/add')

    .get(`/customers/${customer.customerID}`)


Pay for a ticket: 
    .post(`/customers/${customer.customerID}/buy-ticket`)

Reserve a ticket: 
    .post(`/customers/${customer.customerID}/reserve-ticket-test`)

Add a ticket and get tickets page: 
    .post('/tickets/add')
    .get('/tickets')


Get individual ticket page and price: 
    .get(`/tickets/${ticket.ticketID}`)