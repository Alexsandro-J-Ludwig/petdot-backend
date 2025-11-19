import { AddressValidator } from "./AddressValdiator.js";

interface AddressBody {
  address: string | undefined;
  number: string | undefined;
  complement: string | undefined;
  neighborhood: string | undefined;
  city: string | undefined;
  state: string | undefined;
  cep: string | undefined;
}

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

  static fromRequest(user: string, body: AddressBody): AddressUpdateDTO {
    return new AddressUpdateDTO(
      user,
      body.address || undefined,
      body.number || undefined,
      body.complement || undefined,
      body.neighborhood || undefined,
      body.city || undefined,
      body.state || undefined,
      body.cep || undefined
    );
  }
}

export { AddressUpdateDTO };
