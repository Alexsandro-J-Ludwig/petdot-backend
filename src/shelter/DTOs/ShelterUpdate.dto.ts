import { ShelterValidation } from "./ShelterValidation.ts";

class ShelterUpdateDTO {
  constructor(
    public readonly uuid: string,
    public readonly name?: string,
    public readonly cnpj?: string,
    public readonly description?: string,
    public readonly uuid_address?: string,
    public readonly phonenumber?: string,
    public readonly email?: string,
    public readonly uuid_user?: string
  ) {
    ShelterValidation.validatorUUID(uuid);

    if (name !== undefined) ShelterValidation.valdiatorName(name);
    if (cnpj !== undefined) ShelterValidation.validatorCnpj(cnpj);
    if (uuid_address !== undefined)
      ShelterValidation.validatorUuid_address(uuid_address);
    if (phonenumber !== undefined)
      ShelterValidation.validatorPhonenumber(phonenumber);
    if (email !== undefined) ShelterValidation.validatorEmail(email);
    if (uuid_user !== undefined)
      ShelterValidation.validatorUuid_user(uuid_user);
  };

  static fromRequest(params: any, body: any) {
    return new ShelterUpdateDTO(
      params.uuid,
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

export { ShelterUpdateDTO };
