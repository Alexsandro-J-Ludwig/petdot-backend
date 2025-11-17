import { UserValidator } from "./UserValidator.js";

class UserDTO {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly pass: string,
    public readonly celular: string,
    public readonly imageURL: string | null
  ) {
    UserValidator.validateAll({ name, email, pass, celular });
  }

  static fromRequest(body: any): UserDTO {
    return new UserDTO(
      body.name,
      body.email,
      body.pass,
      body.celular,
      body.imageURL
    );
  }
}

export { UserDTO };
