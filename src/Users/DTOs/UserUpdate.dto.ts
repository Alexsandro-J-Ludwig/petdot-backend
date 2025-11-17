import validator from "validator";
const {isEmpty} = validator;

import { UserValidator } from "./UserValidator.js";
import { AppError } from "../../erros/App.errors.js";

class UserUpdateDTO {
  constructor(
    public readonly uuid: string,
    public readonly name?: string,
    public readonly email?: string,
    public readonly pass?: string,
    public readonly celular?: string,
    public readonly nivel_acesso?: string
  ) {
    if (this.name !== undefined) UserValidator.validateName(this.name);
    if (this.email !== undefined) UserValidator.validateEmail(this.email);
    if (this.pass !== undefined) UserValidator.validatePass(this.pass);
    if (this.celular !== undefined && isEmpty(this.celular))
      throw AppError.badRequest("Celular não pode ser vazio");
  }

  static fromRequest(data: { users: any; body: any }) {
    return new UserUpdateDTO(
      data.users.uuid,
      data.body.name,
      data.body.email,
      data.body.pass,
      data.body.celular,
      data.body.nivel_acesso
    );
  }
}

export { UserUpdateDTO };
