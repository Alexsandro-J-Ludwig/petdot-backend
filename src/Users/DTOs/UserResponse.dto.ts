import { UserValidator } from "./UserValidator.js";

class UserResponseDTO {
    constructor(
        public readonly token?: string,
        public readonly message?: string | {}
    ){}
}

export {UserResponseDTO}