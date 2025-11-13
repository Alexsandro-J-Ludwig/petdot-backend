import { Autentificate } from "../../middleware/autentificate.ts";
import { AdoptionController } from "../controller/Adoption.controller.ts";

import { Router } from "express";

class AdoptionRoutes {
router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post(
      "/adoptions",
      Autentificate.validateToken,
      AdoptionController.create,
    );
    this.router.get(
      "/adoptions/:uuid",
      Autentificate.validateToken,
      AdoptionController.getByUuid,
    );
    this.router.get(
      "/adoptions",
      Autentificate.validateToken,
      AdoptionController.getAll,
    );
    this.router.get(
      "/adoptions/:uuid_user",
      Autentificate.validateToken,
      AdoptionController.getByUserUuid,
    );
    this.router.get(
      "/adoptions/:uuid_animal",
      Autentificate.validateToken,
      AdoptionController.getByAnimalUuid,
    );
    this.router.delete(
      "/adoptions/:uuid",
      Autentificate.validateToken,
      Autentificate.validateAdminAcess,
      AdoptionController.deleteByUuid,
    );
  }
}

export { AdoptionRoutes };