class AnimalResponseDTO {
  constructor(public readonly data: any) {}

  static fromResponse(response: any): AnimalResponseDTO {
    return new AnimalResponseDTO(response);
  }

  static fromURL(uploadURL: string, publicURL: string): AnimalResponseDTO {
    return new AnimalResponseDTO({ uploadURL, publicURL });
  }
}

export { AnimalResponseDTO };
