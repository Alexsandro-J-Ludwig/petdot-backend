import { Autentificate } from "../../middleware/autentificate.ts";
import { AddressController } from "../controller/Address.controller.ts";
import { Router } from "express";

class AddressRotue{
    routes: Router;

    constructor(){
        this.routes = Router();
        this.initRoutes();
    }
    initRoutes(){
        this.routes.post("/create", Autentificate.validateToken, AddressController.createAddress);
        this.routes.get("/get", Autentificate.validateToken, AddressController.getAddress);
        this.routes.put("/update", Autentificate.validateToken, AddressController.updateAddress);
        this.routes.delete("/delete", Autentificate.validateToken, AddressController.deleteAddress);
    }
}

export { AddressRotue };