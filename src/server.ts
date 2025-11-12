import "dotenv/config";

import { Connection } from "./config/db.config.js";
import e, { type Application } from "express";
import { ErrorHandle } from "./middleware/ErrorHandle.ts";

import { UserRoutes } from "./Users/routes/User.rotes.ts";
import { AddressRotue } from "./Address/routes/AddressRoutes.ts";
import { ShelterRoutes } from "./shelter/routes/Shelter.routes.ts";
import { AnimalRoutes } from "./Animal/route/Animal.route.ts";

class Server {
  private connection: Connection;
  private app: Application;

  constructor() {
    this.app = e();
    this.app.use(e.json());
    this.app.use(e.urlencoded({ extended: true }));

    this.connection = new Connection();

    this.initRoutes();

    this.app.use(ErrorHandle.errorHandle);
  }

  private initRoutes() {
    const userRoutes = new UserRoutes();
    this.app.use("/user", userRoutes.routes);

    const addressRoutes = new AddressRotue();
    this.app.use("/address", addressRoutes.routes);

    const shelterRoutes = new ShelterRoutes();
    this.app.use("/shelter", shelterRoutes.routes);

    const animalRoutes = new AnimalRoutes();
    this.app.use("/animal", animalRoutes.routes);
  }

  public async start() {
    try {
      await this.connection.sequelize.authenticate();
      await this.connection.sequelize.sync();
      console.log("Banco de dados conectado");

      this.app.listen(process.env.PORT, () => {
        console.log(`Servidor rodando na porta: ${process.env.PORT}`);
      });
    } catch (err: any) {
      console.error(`Erro ao conectar ao servido, ${err}`);
    }
  }
}

new Server().start();
