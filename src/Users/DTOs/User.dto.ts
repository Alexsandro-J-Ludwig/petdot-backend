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

  static fromRequest(body: UserBody): UserDTO {
    return new UserDTO(
      body.name,
      body.email,
      body.pass,
      body.celular
    );
  }
}

export { UserDTO };
