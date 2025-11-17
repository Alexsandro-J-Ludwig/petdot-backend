import { Autentificate } from "../../middleware/Autentificate.js";
import { ShelterController } from "../controller/Shelter.controller.js";

import { Router } from "express";

class ShelterRoutes {
    routes: Router;

    constructor(){
        this.routes = Router();
        this.initRoutes();
    }

    initRoutes(){
        this.routes.post('/create', Autentificate.validateToken, ShelterController.createShelter);
        this.routes.get('/getByID/:id', Autentificate.validateToken, ShelterController.getShelterById);
        this.routes.get('/get', Autentificate.validateToken, ShelterController.getAllShelter);
        this.routes.get('/getUser', Autentificate.validateToken, ShelterController.getByUser);
        this.routes.put('/:id', Autentificate.validateToken, ShelterController.updateShelter);
        this.routes.delete('/:id', Autentificate.validateToken, ShelterController.deleteShelter);
    }
}

export { ShelterRoutes };	