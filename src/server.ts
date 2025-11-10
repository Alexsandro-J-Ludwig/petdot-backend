import "dotenv/config"

import { Connection } from "./config/db.config.js"
import e, {type Application} from "express";

class Server{
    private connection: Connection;
    private app: Application;

    constructor(){
        this.app = e();
        this.app.use(e.json());
        this.app.use(e.urlencoded({ extended: true }));

        this.connection = new Connection();

    }

    private initRoutes(){

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