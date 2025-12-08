import { Autentificate } from "../../middleware/Autentificate.js";
import { AddressController } from "../controller/Address.controller.js";
import { Router } from "express";

class AddressRotue {
  routes: Router;

  constructor() {
    this.routes = Router();
    this.initRoutes();
  }
  initRoutes() {
    this.routes.post(
      "/create",
      Autentificate.validateToken,
      AddressController.createAddress
    );
    this.routes.post(
      "/create/shelter",
      Autentificate.validateToken,
      AddressController.createAddressShelter
    );
    this.routes.get(
      "/get",
      Autentificate.validateToken,
      AddressController.getAddress
    );
    this.routes.get(
      "/get/user",
      Autentificate.validateToken,
      AddressController.getAddressByUser
    );
    this.routes.get(
      "/get/shelter/:uuid",
      Autentificate.validateToken,
      AddressController.getAddressShelter
    );
    this.routes.put(
      "/update",
      Autentificate.validateToken,
      AddressController.updateAddress
    );
    this.routes.delete(
      "/delete",
      Autentificate.validateToken,
      AddressController.deleteAddress
    );
  }
}

export { AddressRotue };
