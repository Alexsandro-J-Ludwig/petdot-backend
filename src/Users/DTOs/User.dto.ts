import { Request } from "express";
import { UserValidator } from "./UserValidator.js";

interface UserBody {
  name: string;
  email: string;
  pass: string;
  celular: string;
}

class UserDTO {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly pass: string,
    public readonly celular: string
  ) {
    UserValidator.validateAll(this);
  }

  static fromRequest(body: Request): UserDTO {
    return new UserDTO(
      body.body.name,
      body.body.email,
      body.body.pass,
      body.body.celular
    );
  }
}

export { UserDTO };
