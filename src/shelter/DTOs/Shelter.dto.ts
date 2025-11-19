import { Request } from "express";
import { ShelterValidation } from "./ShelterValidation.js";

class ShelterDTO {
  constructor(
    public readonly name: string,
    public readonly cnpj: string,
    public readonly description: string | undefined,
    public readonly uuid_address: string,
    public readonly phonenumber: string,
    public readonly email: string,
    public readonly uuid_user: string,
  ) {
    ShelterValidation.validatorAll(this);
  };

  static fromRequest(user: any, body: Request): ShelterDTO {
    return new ShelterDTO(
      body.body.name,
      body.body.cnpj,
      body.body.description,
      body.body.uuid_address,
      body.body.phonenumber,
      body.body.email,
      user
    );
  };
};

export { ShelterDTO };