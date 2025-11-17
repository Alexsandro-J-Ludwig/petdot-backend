import { Autentificate } from "../../middleware/Autentificate.js";
import { AdoptionController } from "../controller/Adoption.controller.js";

import { Router } from "express";

class AdoptionRoutes {
router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post(
      "/create",
      Autentificate.validateToken,
      AdoptionController.create,
    );
    this.router.get(
      "/:uuid",
      Autentificate.validateToken,
      AdoptionController.getByUuid,
    );
    this.router.get(
      "/get",
      Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AdoptionController.getAll,
    );
    this.router.get(
      "/getByUser",
      Autentificate.validateToken,
      AdoptionController.getByUserUuid,
    );
    this.router.get(
      "/getByAnimal/:uuid_animal",
      Autentificate.validateToken,
      AdoptionController.getByAnimalUuid,
    );
    this.router.delete(
      "/deletar/:uuid",
      Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AdoptionController.deleteByUuid,
    );
  }
}

export { AdoptionRoutes };