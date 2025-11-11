import { UserValidator } from "./UserValidator.js";

class UserResponseDTO {
    constructor(
        public readonly token:string,
    ){
        UserValidator.validarToken(token);
    }
}

export {UserResponseDTO}