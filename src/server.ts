import "dotenv/config";

import { Connection } from "./config/db.config.js";
import e, { type Application } from "express";
import cors from "cors";
import { ErrorHandle } from "./middleware/ErrorHandle.js";
import { Logger } from "./utils/Logger.js";

import { UserRoutes } from "./Users/routes/User.rotes.js";
import { AddressRotue } from "./Address/routes/AddressRoutes.js";
import { ShelterRoutes } from "./shelter/routes/Shelter.routes.js";
import { AnimalRoutes } from "./animal/route/Animal.route.js";
import { AdoptionRoutes } from "./Adoption/routes/Adoption.routes.js";

const allowedOrigins = [
  "https://petdot-fronend.vercel.app",
  "https://petdot-fronend-g9hwxzf9n-ale-ludws-projects.vercel.app",
  "http://localhost:5173",
]

class Server {
  private connection: Connection;
  private app: Application;
  private logger: Logger = new Logger();

  constructor() {
    this.logger.logInfo("Iniciando o servidor...");
    this.app = e();
    this.app.use(e.json({ limit: "20mb" }));
    this.app.use(e.urlencoded({ extended: true, limit: "20mb" }));
    this.app.use(cors(
      {
      origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    },
      methods: ["GET", "POST", "PUT", "DELETE"],
    }
  ));

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

    const adoptionRoutes = new AdoptionRoutes();
    this.app.use("/adoption", adoptionRoutes.router);
  }

  public async start() {
    try {
      await this.connection.sequelize.authenticate();
      await this.connection.sequelize.sync();
      this.logger.logInfo("Banco de dados conectado");

      this.app.listen(process.env.PORT, () => {
        this.logger.logInfo(`Servidor rodando na porta: ${process.env.PORT}`);
      });
    } catch (err: any) {
      this.logger.logError(`Erro ao conectar ao servido, ${err}`);
    }
  }
}

new Server().start();
