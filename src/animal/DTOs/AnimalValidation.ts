import valdiator from "validator";
import { AppError } from "../../erros/App.errors.ts";
const { isEmpty, isDate, isUUID } = valdiator;

class AnimalValidation {
  static valitorName(name: string) {
    if (isEmpty(name)) throw AppError.badRequest("Name cannot be empty");
    if (name.length < 2) throw AppError.badRequest("name too small");
  }

  static validatorRedemption_date(redemption_date: Date) {
    if (isEmpty(redemption_date.toString()))
      throw AppError.badRequest("redemption_date cannot be empty");
    if (!isDate(redemption_date.toString(), {format: "DD/MM/YYYY"}))
      throw AppError.badRequest("redemption_date not was a date");
    if (redemption_date > new Date())
      throw AppError.badRequest("redemption_date was a valid date");
  }

  static valdiatorSpecies(species: string) {
    if(isEmpty(species)) throw AppError.badRequest("species cannot be empty");
    if(species.length < 3) throw AppError.badRequest("species too small");
  }

  static validatorRace(race: string) {
    if(isEmpty(race)) throw AppError.badRequest("race cannot be empty");
    if(race.length < 3) throw AppError.badRequest("race too small");
  }

  static validatorGender(gender: string) {
    if(isEmpty(gender)) throw AppError.badRequest("gender cannot be empty");
    if(gender !== "male" && gender !== "female") throw AppError.badRequest("gender was a male or famale");
  }

  static validatorVaccines(vaccines: string) {
    if(isEmpty(vaccines)) throw AppError.badRequest("vaccines cannot be empty");
  }

  static validatorUUID_shelter(uuid_shelter: string) {
    if(isEmpty(uuid_shelter)) throw AppError.badRequest("uuid_shelter cannot be empty");
    if(!isUUID(uuid_shelter)) throw AppError.badRequest("invalid UUID format");
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