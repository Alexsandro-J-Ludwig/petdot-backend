import { Sequelize } from "sequelize";
import { Logger } from "../utils/Logger.ts";
import { UserModel } from "../Users/models/User.model.ts";
import { AddressModel } from "../Address/model/Address.model.ts";
import { ShelterModel } from "../shelter/model/Shelter.model.ts";
import { AnimalModel } from "../animal/model/Animal.model.ts";
import { AdoptionModel } from "../Adoption/model/Adoption.model.ts";

class Connection {
  public static instance: Connection;
  sequelize: Sequelize;
  logger: Logger = new Logger();

  constructor() {
    this.logger.logInfo("Application .env database variables");
    
    if (!process.env.URL) {
      throw new Error("Erro ao conectar ao banco de dados");
    }
    
    this.sequelize = new Sequelize(process.env.URL);
  }

  static get Instance() {
    if (!this.instance) {
      this.instance = new Connection();
    }
    return this.instance;
  }
}

const sequelize = Connection.Instance.sequelize

UserModel.initialize(sequelize);
AddressModel.initialize(sequelize);
ShelterModel.initialize(sequelize);
AnimalModel.inicialize(sequelize); 
AdoptionModel.inicialize(sequelize);

export { Connection };
