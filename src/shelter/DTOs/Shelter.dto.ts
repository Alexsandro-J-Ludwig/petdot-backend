import { ShelterValidation } from "./ShelterValidation.js";

interface ShelterBody {
  name: string;
  cnpj: string;
  description: string | undefined;
  uuid_address: string;
  phonenumber: string;
  email: string;
};

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

  static fromRequest(user: any, body: ShelterBody): ShelterDTO {
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