import { ShelterValidation } from "./ShelterValidation.ts";

class ShelterDTO {
  constructor(
    public readonly name: string,
    public readonly cnpj: string,
    public readonly uuid_address: string,
    public readonly phonenumber: string,
    public readonly email: string,
    public readonly uuid_user: string,
    public readonly description: string
  ) {
    ShelterValidation.validatorAll(this);
  };

  static fromRequest(body: any): ShelterDTO {
    return new ShelterDTO(
      body.name,
      body.cnpj,
      body.description,
      body.uuid_address,
      body.phonenumber,
      body.email,
      body.uuid_user
    );
  };
};

export { ShelterDTO };