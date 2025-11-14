class AnimalUploadDTO {
  constructor(
    public readonly uuid: string,
    public readonly filename: string,
    public readonly contentType: string
  ) {}

  static fromRequest(body: any, headers: any): AnimalUploadDTO {
    return new AnimalUploadDTO(body.uuid, body.filename, headers.contentType);
  }
}

export { AnimalUploadDTO };
