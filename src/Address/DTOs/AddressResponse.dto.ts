class AddressResponseDTO {
  constructor(
    public readonly address?: string,
    public readonly number?: string,
    public readonly complement?: string,
    public readonly neighborhood?: string,
    public readonly city?: string,
    public readonly state?: string,
    public readonly cep?: string,
    public readonly message?: { text: string }
  ) {}

  static withMessage(text: string) {
    return new AddressResponseDTO(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      { text }
    );
  }
}

export { AddressResponseDTO };
