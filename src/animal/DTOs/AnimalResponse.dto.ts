class AnimalResponseDTO {
  constructor(
    public readonly uuid: string | undefined,
    public readonly name: string,
    public readonly redemption_date: Date,
    public readonly species: string,
    public readonly race: string,
    public readonly gender: string,
    public readonly vaccines: string,
    public readonly uuid_shelter: string,
    public readonly description?: string,
    public readonly message?: string
  ) {}

  static fromResponse(response: any): AnimalResponseDTO {
    return new AnimalResponseDTO(
      response.uuid || "",
      response.name || "",
      response.redemption_date || "",
      response.species || "",
      response.race || "",
      response.gender || "",
      response.vaccines || "",
      response.uuid_shelter || "",
      response.description || "",
      response.message
    );
  }
}

export { AnimalResponseDTO };
