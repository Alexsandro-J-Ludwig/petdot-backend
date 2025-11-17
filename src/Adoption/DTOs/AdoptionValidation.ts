import validator from "validator";
import { AppError } from "../../erros/App.errors.js";
const { isEmpty, isUUID } = validator;

class AdoptionValidation {
  static validatorUUID_user(uuid_user: string) {
    if (isEmpty(uuid_user))
      throw AppError.badRequest("UUID_User cannot be empty");

    if (!isUUID(uuid_user)) throw AppError.badRequest("UUID_User is not valid");
  }

  static validatorUUID_animal(uuid_animal: string) {
    if (isEmpty(uuid_animal))
      throw AppError.badRequest("UUID_Animal cannot be empty");

    if (!isUUID(uuid_animal))
      throw AppError.badRequest("UUID_Animal is not valid");
  }

  static validatorUUID_shelter(uuid_shelter: string) {
    if (isEmpty(uuid_shelter))
      throw AppError.badRequest("UUID_Shelter cannot be empty");

    if (!isUUID(uuid_shelter))
      throw AppError.badRequest("UUID_Shelter is not valid");
  }

  static validatorDate(adoption_date: Date) {
    if (isEmpty(adoption_date.toString()))
      throw AppError.badRequest("Adoption_Date cannot be empty");

    const dateNow = new Date();
    if (adoption_date > dateNow)
      throw AppError.badRequest("Adoption_Date cannot be in the future");
  }

  static validatorAll({
    uuid_user,
    uuid_animal,
    uuid_shelter,
    adoption_date,
  }: {
    uuid_user: string;
    uuid_animal: string;
    uuid_shelter: string;
    adoption_date: Date
  }) {
    this.validatorUUID_user(uuid_user);
    this.validatorUUID_animal(uuid_animal);
    this.validatorUUID_shelter(uuid_shelter);
    this.validatorDate(adoption_date);
  }
}

export { AdoptionValidation };