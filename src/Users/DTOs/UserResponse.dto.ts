import { UserValidator } from "./UserValidator.js";

class UserResponseDTO {
    constructor(
        public readonly token?: string,
        public readonly message?: string,
        public readonly uploadURL?: UserValidator,
        public readonly publicURL?: UserValidator,

    ){}
}

export {UserResponseDTO}