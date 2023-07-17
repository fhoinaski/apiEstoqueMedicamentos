const express = require("express");
const cors = require("cors");

const { connect } = require("./database/connect");

class Server {

  constructor(server = express()) {
    this.start(server);
  };

  async database() {
    try {
      await connect.authenticate();
      console.log("Conexão estabelecida com sucesso.");
    } catch (error) {
      console.error("Não foi possível conectar ao banco de dados:", error);
      throw error;
    }
  }

  async start(app) {
    await this.database();
    app.listen(process.env.PORTSERVER, () => {
      console.log(`Servidor rodando na porta ${process.env.PORTSERVER}`);
    });
  }

}

module.exports = { Server};
