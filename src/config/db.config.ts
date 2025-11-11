import { Sequelize } from "sequelize";
import { UserModel } from "../Users/models/User.model.ts";

class Connection {
  sequelize: Sequelize;

  constructor() {
    if (!process.env.URL) {
      throw new Error("Erro ao conectar ao banco de dados");
    }
    this.sequelize = new Sequelize(process.env.URL);
    
    UserModel.initialize(this.sequelize)
  }
}

export { Connection };
