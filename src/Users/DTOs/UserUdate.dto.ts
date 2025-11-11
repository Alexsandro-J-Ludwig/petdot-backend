import { UserDTO } from "./User.dto.ts";

class UserUpdateDTO extends UserDTO {
    constructor(
        public readonly uuid: string,
        data: Partial<Omit<UserDTO, "uuid">>,
    ) {
        super(data.name ?? "", data.email ?? "", data.pass ?? "", data.celular ?? "");
    }
}

export { UserUpdateDTO };