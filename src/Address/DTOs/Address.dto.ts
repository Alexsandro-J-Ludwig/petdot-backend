import { Request } from "express";
import { AddressValidator } from "./AddressValdiator.js";

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

  static fromRequest(user: any, body: Request): AddressDTO {
    
    return new AddressDTO(
      body.body.address,
      body.body.number,
      body.body.complement,
      body.body.neighborhood,
      body.body.city,
      body.body.state,
      body.body.cep,
      user
    );
  }
}

export { AddressDTO };