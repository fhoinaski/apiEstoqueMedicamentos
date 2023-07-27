const { Router } = require('express');
const { routesFromUser } = require('./user.routes');
const { routesFromDeposito } = require('./deposito.routes');

const routes = Router();

routes.use('/api', routesFromUser()); 
routes.use('/api', routesFromDeposito()); 

module.exports = routes;
