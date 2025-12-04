import { Request } from "express";
import { AddressValidator } from "./AddressValdiator.js";

interface AddressBody {
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}

class AddressDTO {
  constructor(
    public readonly address: string,
    public readonly number: string,
    public readonly complement: string,
    public readonly neighborhood: string,
    public readonly city: string,
    public readonly state: string,
    public readonly cep: string,
    public readonly uuid_entidade: string
  ) {
    AddressValidator.validatorAll(this);
  }

  static fromRequest(user: any, body: AddressBody): AddressDTO {
    
    return new AddressDTO(
      body.address,
      body.number,
      body.complement,
      body.neighborhood,
      body.city,
      body.state,
      body.cep,
      user
    );
  }
}

export { AddressDTO };