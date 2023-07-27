const { createDeposito,updateDeposito } = require("../controllers/deposito.controller");
const router = require("express").Router();
const auth = require("../middlewares/auth");

class DepositoRoutes{
    routesFromDeposito(){
        router.post("/deposito",auth,createDeposito);
        router.patch("/deposito/:id",auth,updateDeposito);
        return router;
    }

}

module.exports = new DepositoRoutes();