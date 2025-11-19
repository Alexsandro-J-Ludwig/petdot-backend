import { Request } from "express";
import { UserValidator } from "./UserValidator.js";

class UserUploadDTO {
  constructor(
    public readonly uuid: string,
    public readonly filename: string,
    public readonly contentType: string
  ) {
    UserValidator.validateName(filename);
    UserValidator.validateUUID(uuid);
  }

  static fromRequest(uuid: string, body: Request, headers: Request): UserUploadDTO {
    const filename = body.body.filename;
    const contentType = headers.headers["content-type"];
    return new UserUploadDTO(uuid, filename, contentType!);
  }
}

export { UserUploadDTO };
