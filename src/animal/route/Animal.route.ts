import { Autentificate } from "../../middleware/autentificate.ts";
import { AnimalController } from "../controller/Animal.controller.ts";

import { Router } from "express";

class AnimalRoutes {
  routes: Router;

  constructor() {
    this.routes = Router();

    this.initRoutes();
  }

  initRoutes() {
    this.routes.post(
      "/create",
      Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AnimalController.create
    );
    this.routes.get(
      "/getById/:id",
      Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AnimalController.getById
    );
    this.routes.get(
      "/getAll",
      Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AnimalController.getAll
    );
    this.routes.get(
      "/getByShelter/:uuid_shelter ",
      Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AnimalController.getByShelter
    );
    this.routes.put(
      "/update/:id",
      Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AnimalController.update
    );
    this.routes.delete(
      "/delete/:id",
      Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AnimalController.delete
    );
  }
}

export { AnimalRoutes };
