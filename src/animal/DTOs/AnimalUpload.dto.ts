import { Request } from "express";

interface AnimalUploadBody {
  uuid: string;
  filename: string;
}

class AnimalUploadDTO {
  constructor(
    public readonly uuid: string,
    public readonly filename: string,
    public readonly contentType: string, 
  ) {}

  static fromRequest(body: AnimalUploadBody, headers: Request): AnimalUploadDTO {
    return new AnimalUploadDTO(
      body.uuid,
      body.filename,
      headers.headers["content-type"] as string
    );
  }
}

export { AnimalUploadDTO };
