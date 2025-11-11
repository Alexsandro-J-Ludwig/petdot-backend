import { Sequelize } from "sequelize";

class Connection {
  sequelize: Sequelize;

  constructor() {
    if (!process.env.URL) {
      throw new Error("Erro ao conectar ao banco de dados");
    }
    this.sequelize = new Sequelize(process.env.URL);
  }
}

export { Connection };
