import validator from "validator";
import { AppError } from "../../erros/App.errors.ts";
const { isEmail, isUUID, isEmpty } = validator;

class ShelterValidation {
  static validatorUUID(uuid: string) {
    if (isEmpty(uuid)) throw AppError.badRequest("UUID cannot be empty");
    if (!isUUID(uuid)) throw AppError.badRequest("Invalid UUID format");
  }

  static valdiatorName(name: string) {
    if (isEmpty(name)) throw AppError.badRequest("Name cannot be empty");
  }

  static validatorCnpj(cnpj: string) {
    const isCNPJ = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
    
    if (isEmpty(cnpj)) throw AppError.badRequest("Cnpj cannot be empty");
    if (!isCNPJ.test(cnpj)) throw AppError.badRequest("Invalid Cnpj format");
  }

  static validatorUuid_address(uuid_address: string) {
    if (isEmpty(uuid_address))
      throw AppError.badRequest("Address id cannot be empty");
    if (!isUUID(uuid_address)) throw AppError.badRequest("Invalid address id");
  }

  static validatorPhonenumber(phonenumber: string) {
    if (isEmpty(phonenumber))
      throw AppError.badRequest("Phonenumber cannot be empty");
  }

  static validatorEmail(email: string) {
    if (isEmpty(email)) throw AppError.badRequest("Email cannot be empty");
    if (!isEmail(email)) throw AppError.badRequest("Invalid email format");
  }

  static validatorUuid_user(uuid_user: string) {
    if (isEmpty(uuid_user))
      throw AppError.badRequest("User ID cannot be empty");
    if (!isUUID(uuid_user)) throw AppError.badRequest("Invalid User ID format");
  }

  static validatorAll({
    name,
    cnpj,
    uuid_address,
    phonenumber,
    email,
    uuid_user,
  }: {
    name: string;
    cnpj: string;
    uuid_address: string;
    phonenumber: string;
    email: string;
    uuid_user: string;
  }) {
    this.valdiatorName(name);
    this.validatorCnpj(cnpj);
    this.validatorUuid_address(uuid_address);
    this.validatorPhonenumber(phonenumber);
    this.validatorEmail(email);
    this.validatorUuid_user(uuid_user);
  }
}

export { ShelterValidation };
