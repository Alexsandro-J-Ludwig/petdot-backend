import { UserController } from "../controlls/User.controller.ts";
import { Autentificate } from "../../middleware/Autentificate.ts";

import { Router } from "express";

class UserRoutes {
  routes: Router;
  constructor() {
    this.routes = Router();

    this.initRoutes();
  }

  initRoutes() {
    this.routes.post("/create", UserController.createUser);
    this.routes.post("/getURL", UserController.getURL);
    this.routes.post("/get", UserController.getUser);
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
