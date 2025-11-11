import "dotenv/config"

import { Connection } from "./config/db.config.js"
import e, {type Application} from "express";
import { ErrorHandle } from "./middleware/ErrorHandle.ts";
import { UserRoutes } from "./Users/routes/User.rotes.ts";

class Server{
    private connection: Connection;
    private app: Application;

    constructor(){
        this.app = e();
        this.app.use(e.json());
        this.app.use(e.urlencoded({ extended: true }));

        this.connection = new Connection();

        this.initRoutes();

        this.app.use(ErrorHandle.errorHandle)
    }

    private initRoutes(){
        const userRoutes = new UserRoutes;
        this.app.use("/user", userRoutes.routes);
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