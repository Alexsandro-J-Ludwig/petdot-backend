import { Request } from "express";

interface AnimalUploadBody {
  filename: string | undefined;
}

class AnimalUploadDTO {
  constructor(
    public readonly filename: string | undefined,
    public readonly contentType: string, 
  ) {}

  static fromRequest(filename: AnimalUploadBody, headers: Request): AnimalUploadDTO {
    return new AnimalUploadDTO(
      filename.filename as string,
      headers.headers["content-type"] as string
    );
  }
}

export { AnimalUploadDTO };
