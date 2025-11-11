import { AddressValidator } from "./AddressValdiator.ts";

class AddressDTO {
  constructor(
    public readonly address: string,
    public readonly number: string,
    public readonly complement: string,
    public readonly neighborhood: string,
    public readonly city: string,
    public readonly state: string,
    public readonly cep: string,
    public readonly uuid_user: string
  ) {
    AddressValidator.validatorAll(this);
  }

  static fromRequest(body: any): AddressDTO {
    return new AddressDTO(
      body.address,
      body.number,
      body.complement,
      body.neighborhood,
      body.city,
      body.state,
      body.cep,
      body.uuid_user
    );
  }
}

export { AddressDTO };