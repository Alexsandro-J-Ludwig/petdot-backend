import { AnimalValidation } from "./AnimalValidation.js";

class AnimalUpdateDTO {
  constructor(
    public readonly uuid: string,
    public readonly name: string,
    public readonly redemption_date: Date,
    public readonly species: string,
    public readonly race: string,
    public readonly gender: string,
    public readonly vaccines: string,
    public readonly uuid_shelter: string,
    public readonly description?: string
  ) {
    if (name) AnimalValidation.valitorName(name);
    if (redemption_date)
      AnimalValidation.validatorRedemption_date(redemption_date);
    if (species) AnimalValidation.valdiatorSpecies(species);
    if (race) AnimalValidation.validatorRace(race);
    if (gender) AnimalValidation.validatorGender(gender);
    if (vaccines) AnimalValidation.validatorVaccines(vaccines);
    if (uuid_shelter) AnimalValidation.validatorUUID_shelter(uuid_shelter);
  }

  static fromRequest(params: any, body: any): AnimalUpdateDTO {
    return new AnimalUpdateDTO(
      params,
      body.name,
      body.redemption_date,
      body.species,
      body.race,
      body.gender,
      body.vaccines,
      body.uuid_shelter,
      body.description
    );
  }
}

export { AnimalUpdateDTO };