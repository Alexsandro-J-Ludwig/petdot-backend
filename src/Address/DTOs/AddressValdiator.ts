import validator from "validator";
import { AppError } from "../../erros/App.errors.ts";
const { isEmpty, isUUID } = validator;

class AddressValidator {
  static validatorAddress(address: string) {
    if (isEmpty(address)) throw AppError.badRequest("Address cannot be empty");
  }

  static validatorNumber(number: string) {
    if (isEmpty(number)) throw AppError.badRequest("Number cannot be empty");
  }
  static validatorComplement(complement: string) {
    if (isEmpty(complement))
      throw AppError.badRequest("Complement cannot be empty");
  }
  static validatorNeighborhood(neighborhood: string) {
    if (isEmpty(neighborhood))
      throw AppError.badRequest("Neighborhood cannot be empty");
  }
  static validatorCity(city: string) {
    if (isEmpty(city)) throw AppError.badRequest("City cannot be empty");
  }
  static validatorState(state: string) {
    if (isEmpty(state)) throw AppError.badRequest("State cannot be empty");
  }
  static validatorCep(cep: string) {
    if (isEmpty(cep)) throw AppError.badRequest("CEP cannot be empty");
  }
  static validatorUUID_User(uuid_user: string) {
    if (isEmpty(uuid_user))
      throw AppError.badRequest("UUID_User cannot be empty");
    if (!isUUID(uuid_user))
      throw AppError.badRequest("UUID_User is not valid");
  }

  static validatorAll({
    address,
    number,
    complement,
    neighborhood,
    city,
    state,
    cep,
    uuid_user,
  }: {
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
    uuid_user: string;
  }) {
    this.validatorAddress(address);
    this.validatorNumber(number);
    this.validatorComplement(complement);
    this.validatorNeighborhood(neighborhood);
    this.validatorCity(city);
    this.validatorState(state);
    this.validatorCep(cep);
    this.validatorUUID_User(uuid_user);
  }
}

export { AddressValidator };
