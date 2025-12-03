import { UserController } from "../controlls/User.controller.js";
import { Autentificate } from "../../middleware/Autentificate.js";

import { Router } from "express";

class UserRoutes {
  routes: Router;
  constructor() {
    this.routes = Router();

    this.initRoutes();
  }

  initRoutes() {
    this.routes.post("/create", UserController.createUser);
    this.routes.post(
      "/getURL",
      Autentificate.validateToken,
      UserController.getURL
    );
    this.routes.post("/get", UserController.getUser);
    this.routes.get(
      "/",
      Autentificate.validateAdminAcess,
      UserController.getInfo
    );
    this.routes.get(
      "/me",
      Autentificate.validateToken,
      UserController.getAcess
    );
    this.routes.put(
      "/update",
      Autentificate.validateToken,
      UserController.updateUser
    );
    this.routes.delete(
      "/delete",
      Autentificate.validateToken,
      UserController.deleteUser
    );
  }
}

export { UserRoutes };
