import { UserValidator } from "./UserValidator.ts";

class UserLoginDTO {
    constructor(
        public readonly email: string,
        public readonly pass: string,
    ){
        UserValidator.validateEmail(this.email);
        UserValidator.validatePass(this.pass);
    }
}

export {UserLoginDTO}