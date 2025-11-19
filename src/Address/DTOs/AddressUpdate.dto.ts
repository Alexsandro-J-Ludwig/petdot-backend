import { Request } from "express";
import { AddressValidator } from "./AddressValdiator.js";

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

  static fromRequest(user: any, body: Request): AddressUpdateDTO {
    console.log(user, body);
    
    return new AddressUpdateDTO(
      user,
      body.body.bo.address,
      body.body.number,
      body.body.complement,
      body.body.neighborhood,
      body.body.city,
      body.body.state,
      body.body.cep
    );
  }
}

export { AddressUpdateDTO };
