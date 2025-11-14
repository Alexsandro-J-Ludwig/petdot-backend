import { AddressValidator } from "./AddressValdiator.ts";

class AddressUpdateDTO {
  constructor(
    public readonly uuid_user: string,
    public readonly address?: string,
    public readonly number?: string,
    public readonly complement?: string,
    public readonly neighborhood?: string,
    public readonly city?: string,
    public readonly state?: string,
    public readonly cep?: string
  ) {
    if (address !== undefined) AddressValidator.validatorAddress(address);
    if (number !== undefined) AddressValidator.validatorNumber(number);
    if (complement !== undefined)
      AddressValidator.validatorComplement(complement);
    if (neighborhood !== undefined)
      AddressValidator.validatorNeighborhood(neighborhood);
    if (city !== undefined) AddressValidator.validatorCity(city);
    if (state !== undefined) AddressValidator.validatorState(state);
    if (cep !== undefined) AddressValidator.validatorCep(cep);
  }

  static fromRequest(user: any, body: any): AddressUpdateDTO {
    console.log(user, body);
    
    return new AddressUpdateDTO(
      user,
      body.address,
      body.number,
      body.complement,
      body.neighborhood,
      body.city,
      body.state,
      body.cep
    );
  }
}

export { AddressUpdateDTO };
