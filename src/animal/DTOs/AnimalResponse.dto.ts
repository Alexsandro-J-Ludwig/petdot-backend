class AnimalResponseDTO {
  constructor(
    public readonly uuid: string | undefined,
    public readonly name: string | undefined,
    public readonly redemption_date: Date | undefined,
    public readonly species: string | undefined,
    public readonly race: string | undefined,
    public readonly gender: string | undefined,
    public readonly vaccines: string | undefined,
    public readonly uuid_shelter: string | undefined,
    public readonly description?: string | undefined,
    public readonly message?: string | {}
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
