import { Request } from "express";
import { ShelterValidation } from "./ShelterValidation.js";

interface ShelterBody {
  name: string | undefined;
  cnpj: string | undefined;
  description: string | undefined;
  uuid_address: string | undefined;
  phonenumber: string | undefined;
  email: string | undefined;
  uuid_user: string | undefined;
};

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

  static fromRequest(params: Request, body: ShelterBody) {
    return new ShelterUpdateDTO(
      params.params.id!,
      body.name || undefined,
      body.cnpj || undefined,
      body.description || undefined,
      body.uuid_address || undefined,
      body.phonenumber || undefined,
      body.email || undefined,
      body.uuid_user || undefined
    );
  };
};

export { ShelterUpdateDTO };
