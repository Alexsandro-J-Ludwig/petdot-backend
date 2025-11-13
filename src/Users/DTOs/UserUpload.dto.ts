import { UserValidator } from "./UserValidator.ts";

class UserUploadDTO {
  constructor(
    public readonly filename: string,
    public readonly contentType: string
  ) {
    UserValidator.validateName(filename);
    UserValidator.validateName(contentType);
  }

  static fromRequest(body: any, headers: any): UserUploadDTO {
    const filename = body.filename;
    const contentType = headers["content-type"];
    return new UserUploadDTO(filename, contentType);
  }
}

export { UserUploadDTO };
