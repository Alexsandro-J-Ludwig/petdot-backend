import { Request } from "express";
import { AnimalValidation } from "./AnimalValidation.js";

interface AnimalBody {
  name?: string | undefined;
  redemption_date?: Date | undefined;
  species?: string | undefined;
  race?: string | undefined;
  gender?: string | undefined;
  vaccines?: string | undefined;
  uuid_shelter?: string | undefined;
  description?: string | undefined;
}

class AnimalUpdateDTO {
  constructor(
    public readonly uuid: string,
    public readonly name?: string,
    public readonly redemption_date?: Date,
    public readonly species?: string,
    public readonly race?: string,
    public readonly gender?: string,
    public readonly vaccines?: string,
    public readonly uuid_shelter?: string,
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

  static fromRequest(params: Request, body: AnimalBody): AnimalUpdateDTO {
    return new AnimalUpdateDTO(
      params.params.id!,
      body.name || undefined,
      body.redemption_date || undefined,
      body.species || undefined,
      body.race || undefined,
      body.gender || undefined,
      body.vaccines || undefined,
      body.uuid_shelter || undefined,
      body.description || undefined
    );
  }
}

export { AnimalUpdateDTO };