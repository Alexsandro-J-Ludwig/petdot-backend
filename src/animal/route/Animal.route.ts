import { Autentificate } from "../../middleware/Autentificate.js";
import { AnimalController } from "../controller/Animal.controller.js";

import { Router } from "express";

class AnimalRoutes {
  routes: Router;

  constructor() {
    this.routes = Router();

    this.initRoutes();
  }

  initRoutes() {
    this.routes.post(
      "/",
      Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AnimalController.create
    );
    this.routes.get(
      "/url/:filename", Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AnimalController.getURL
    )
    this.routes.get(
      "/get/:id",
      Autentificate.validateToken,
      AnimalController.getById
    );
    this.routes.get(
      "/get",
      Autentificate.validateToken,
      AnimalController.getAll
    );
    this.routes.get(
      "/getByShelter/:id",
      Autentificate.validateToken,
      AnimalController.getByShelter
    );
    this.routes.put(
      "/:id",
      Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AnimalController.update
    );
    this.routes.delete(
      "/:id",
      Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AnimalController.delete
    );
  }
}

export { AnimalRoutes };
