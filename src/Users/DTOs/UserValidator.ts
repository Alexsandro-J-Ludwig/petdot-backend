import { isEmpty, isEmail, isUUID } from "validator";

class UserValidator {
  static validateName(name: string) {
    if (isEmpty(name)) throw new Error("Name connot be empty");
  }

  static validateEmail(email: string) {
    if (isEmpty(email)) throw new Error("Email cannot be empty");
    if (!isEmail(email)) throw new Error("invalid email format");
  }

  static validatePass(pass: string) {
    if (isEmpty(pass)) throw new Error("Password connot be empty");
    if (pass.length < 8) throw new Error("Password too small");
    if (pass.length > 50) throw new Error("Password too long");
  }

  static validateUUID(uuid: string) {
    if (!isUUID(uuid)) throw new Error("Invalid UUID");
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
  }){
    this.validateName(name);
    this.validateEmail(email);
    this.validatePass(pass)
    if(isEmpty(celular)) throw new Error("Callphone cannot be empty")
  };
}

export { UserValidator };
