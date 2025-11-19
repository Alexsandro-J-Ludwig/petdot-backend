import { Request } from "express";

class AnimalUploadDTO {
  constructor(
    public readonly uuid: string,
    public readonly filename: string,
    public readonly contentType: string
  ) {}

  static fromRequest(body: Request, headers: Request): AnimalUploadDTO {
    return new AnimalUploadDTO(body.body.uuid, body.body.filename, headers.body.contentType);
  }
}

export { AnimalUploadDTO };
