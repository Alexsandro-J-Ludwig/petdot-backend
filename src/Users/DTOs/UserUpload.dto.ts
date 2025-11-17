import { UserValidator } from "./UserValidator";

class UserUploadDTO {
  constructor(
    public readonly uuid: string,
    public readonly filename: string,
    public readonly contentType: string
  ) {
    UserValidator.validateName(filename);
    UserValidator.validateName(contentType);
    UserValidator.validateUUID(uuid);
  }

  static fromRequest(uuid: string, body: any, headers: any): UserUploadDTO {
    const filename = body.filename;
    const contentType = headers["content-type"];
    return new UserUploadDTO(uuid, filename, contentType);
  }
}

export { UserUploadDTO };
