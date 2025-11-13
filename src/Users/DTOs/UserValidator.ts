import jwt from "jsonwebtoken";
import validator from "validator";
const { isEmpty, isEmail, isUUID, isJWT } = validator;

import { AppError } from "../../erros/App.errors.ts";

class UserValidator {
  static validateName(name: string) {
    if (isEmpty(name)) throw AppError.badRequest("Name connot be empty");
  }

  static validateEmail(email: string) {
    if (isEmpty(email)) throw AppError.badRequest("Email cannot be empty");
    if (!isEmail(email)) throw AppError.badRequest("invalid email format");
  }

  static validatePass(pass: string) {
    if (isEmpty(pass)) throw AppError.badRequest("Password connot be empty");
    if (pass.length < 8) throw AppError.badRequest("Password too small");
    if (pass.length > 50) throw AppError.badRequest("Password too long");
  }

  static validateUUID(uuid: string) {
    if (!isUUID(uuid)) throw AppError.badRequest("Invalid UUID");
  }

  static validarToken(token: string) {
    try {
      const pureToken = token.replace(/^Bearer\s+/i, "");
      return jwt.verify(pureToken, process.env.SKJWT as string);
    } catch (err) {
      throw AppError.badRequest("Token invalido");
    }
  }

  static validateAll({
    name,
    email,
    pass,
    celular,
  }: {
    name: string;
    email: string;
    pass: string;
    celular: string;
  }) {
    this.validateName(name);
    this.validateEmail(email);
    this.validatePass(pass);
    if (isEmpty(celular))
      throw AppError.badRequest("Callphone cannot be empty");
  }
}

export { UserValidator };
