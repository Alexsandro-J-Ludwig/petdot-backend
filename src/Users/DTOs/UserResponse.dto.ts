import { UserValidator } from "./UserValidator.js";

class UserResponseDTO {
    constructor(
        public readonly uuid:string,
    ){
        UserValidator.validateUUID(uuid);
    }
}

export {UserResponseDTO}