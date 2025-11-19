import { Request } from "express";
import { UserValidator } from "./UserValidator.js";

class UserLoginDTO {
    constructor(
        public readonly email: string,
        public readonly pass: string,
    ){
        UserValidator.validateEmail(this.email);
        UserValidator.validatePass(this.pass);
    }

    static fromRequest(body: Request): UserLoginDTO {
        return new UserLoginDTO(body.body.email, body.body.pass);
    }
}

export {UserLoginDTO}