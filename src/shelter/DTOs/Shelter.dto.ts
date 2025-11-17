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

  static fromRequest(user: any, body: any): ShelterDTO {
    return new ShelterDTO(
      body.name,
      body.cnpj,
      body.description,
      body.uuid_address,
      body.phonenumber,
      body.email,
      user
    );
  };
};

export { ShelterDTO };