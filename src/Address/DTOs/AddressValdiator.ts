import validator from "validator";
import { AppError } from "../../erros/App.errors.ts";
const { isEmpty } = validator;

class AddressValidator {
  static validatorAddress(address: string) {
    if (isEmpty(address)) throw AppError.badRequest("Address cannot be empty");
  }

  static validatorNumber(number: string) {}
  static validatorComplement(complement: string) {}
  static validatorNeighborhood(neighborhood: string) {}
  static validatorCity(city: string) {}
  static validatorState(state: string) {}
  static validatorCep(cep: string) {}
  static validatorUUID_User(uuid_user: string) {}

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
  }){
    this.validatorAddress(address);
    this.validatorNumber(number);
    this.validatorComplement(complement);
    this.validatorNeighborhood(neighborhood);
    this.validatorCity(city);
    this.validatorState(state);
    this.validatorCep(cep);
    this.validatorUUID_User(uuid_user)
  };
}

export { AddressValidator };