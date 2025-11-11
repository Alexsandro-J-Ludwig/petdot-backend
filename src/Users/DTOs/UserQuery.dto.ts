import { UserValidator } from "./UserValidator.ts";

class UserQueryDTO {
  constructor(
    public readonly uuid: string | undefined,
    public readonly email: string | undefined,
  ) {
    if(this.uuid !== undefined) {
        UserValidator.validateUUID(this.uuid);
    }
    if(this.email !== undefined) {
        UserValidator.validateEmail(this.email);
    }
  }
}
