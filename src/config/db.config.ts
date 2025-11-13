import { Sequelize } from "sequelize";
import { Logger } from "../utils/Logger.ts";
import { UserModel } from "../Users/models/User.model.ts";
import { AddressModel } from "../Address/model/Address.model.ts";
import { ShelterModel } from "../shelter/model/Shelter.model.ts";
import { AnimalModel } from "../animal/model/Animal.model.ts";
import { AdoptionModel } from "../Adoption/model/Adoption.model.ts";

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
AddressModel.initialize(new Connection().sequelize);
ShelterModel.initialize(new Connection().sequelize);
AnimalModel.inicialize(new Connection().sequelize);

export { Connection };
