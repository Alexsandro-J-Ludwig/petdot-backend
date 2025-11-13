import { Sequelize } from "sequelize";
import { Logger } from "../utils/Logger.ts";
import { UserModel } from "../Users/models/User.model.ts";

class Connection {
  sequelize: Sequelize;
  logger: Logger = new Logger();

  constructor() {
    this.logger.logInfo("Application .env database variables");
    
    if (!process.env.URL) {
      throw new Error("Erro ao conectar ao banco de dados");
    }
    
    this.sequelize = new Sequelize(process.env.URL);
  }
}

UserModel.initialize(new Connection().sequelize);

export { Connection };
