import validator from "validator";
const {isEmpty} = validator;

import { UserValidator } from "./UserValidator.js";
import { AppError } from "../../erros/App.errors.js";
import { Request } from "express";

interface UserBody {
  name: string | undefined;
  email: string | undefined;
  pass: string | undefined;
  celular: string | undefined;
  nivel_acesso: string | undefined;
  imagemURL: string | undefined;
}

class UserUpdateDTO {
  constructor(
    public readonly uuid: string,
    public readonly name?: string,
    public readonly email?: string,
    public readonly pass?: string,
    public readonly celular?: string,
    public readonly nivel_acesso?: string,
    public readonly imagemURL?: string
  ) {
    if (this.name !== undefined) UserValidator.validateName(this.name);
    if (this.email !== undefined) UserValidator.validateEmail(this.email);
    if (this.pass !== undefined) UserValidator.validatePass(this.pass);
    if (this.celular !== undefined && isEmpty(this.celular))
      throw AppError.badRequest("Celular não pode ser vazio");
  }

  static fromRequest(user: string, body: UserBody) {
    return new UserUpdateDTO(
      user,
      body.name,
      body.email,
      body.pass,
      body.celular,
      body.nivel_acesso,
      body.imagemURL
    );
  }
}

export { UserUpdateDTO };
