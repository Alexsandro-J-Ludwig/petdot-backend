import { Request } from "express";
import { UserValidator } from "./UserValidator.js";

interface UserUploadBody {
  filename: string;
}

class UserUploadDTO {
  constructor(
    public readonly uuid: string,
    public readonly filename: string,
    public readonly contentType: string
  ) {
    UserValidator.validateName(filename);
    UserValidator.validateUUID(uuid);
  }

  static fromRequest(req: Request): UserUploadDTO {
    const uuid = (req as any).user.uuid;
    const filename = req.body.filename;
    // const contentType = req.headers["content-type"]!;
    const contentType = req.body.contentType;
    return new UserUploadDTO(uuid, filename, contentType);
  }
}

export { UserUploadDTO };
