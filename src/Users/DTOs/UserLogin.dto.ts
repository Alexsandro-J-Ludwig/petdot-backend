import { UserValidator } from "./UserValidator.js";

class UserLoginDTO {
    constructor(
        public readonly email: string,
        public readonly pass: string,
    ){
        UserValidator.validateEmail(this.email);
        UserValidator.validatePass(this.pass);
    }

    static fromRequest(body: any): UserLoginDTO {
        return new UserLoginDTO(body.email, body.pass);
    }
}

export {UserLoginDTO}