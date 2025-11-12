import valdiator from "validator";
import { AppError } from "../../erros/App.errors.ts";
const { isEmpty, isDate, isUUID } = valdiator;

class AnimalValidation {
  static valitorName(name: string) {
    if (isEmpty(name)) throw AppError.badRequest("name");
    if (name.length < 3) throw AppError.badRequest("name");
  }

  static validatorRedemption_date(redemption_date: Date) {
    if (isEmpty(redemption_date.toString()))
      throw AppError.badRequest("redemption_date");
    if (isDate(redemption_date.toString()))
      throw AppError.badRequest("redemption_date");
    if (redemption_date > new Date())
      throw AppError.badRequest("redemption_date");
  }

  static valdiatorSpecies(species: string) {
    if(isEmpty(species)) throw AppError.badRequest("species");
    if(species.length < 3) throw AppError.badRequest("species");
  }

  static validatorRace(race: string) {
    if(isEmpty(race)) throw AppError.badRequest("race");
    if(race.length < 3) throw AppError.badRequest("race");
  }

  static validatorGender(gender: string) {
    if(isEmpty(gender)) throw AppError.badRequest("gender");
    if(gender !== "male" && gender !== "female") throw AppError.badRequest("gender");
  }

  static validatorVaccines(vaccines: string) {
    if(isEmpty(vaccines)) throw AppError.badRequest("vaccines");
  }

  static validatorUUID_shelter(uuid_shelter: string) {
    if(isEmpty(uuid_shelter)) throw AppError.badRequest("uuid_shelter");
    if(!isUUID(uuid_shelter)) throw AppError.badRequest("uuid_shelter");
  }

  static validatorDisponible(disponible: boolean) {
    if(disponible !== true && disponible !== false) throw AppError.badRequest("disponible");
  }

  static valdiatorAll({
    name,
    redemption_date,
    species,
    race,
    gender,
    vaccines,
    uuid_shelter,
  }: {
    name: string;
    redemption_date: Date;
    species: string;
    race: string;
    gender: string;
    vaccines: string;
    uuid_shelter: string;
  }) {
    this.valitorName(name);
    this.validatorRedemption_date(redemption_date);
    this.valdiatorSpecies(species);
    this.validatorRace(race);
    this.validatorGender(gender);
    this.validatorVaccines(vaccines);
    this.validatorUUID_shelter(uuid_shelter);
  }
}

export { AnimalValidation }