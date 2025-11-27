import { Request } from "express";
import { AnimalValidation } from "./AnimalValidation.js";

interface AnimalBody {
  name?: string | undefined;
  redemption_date?: string | undefined;
  species?: string | undefined;
  race?: string | undefined;
  gender?: string | undefined;
  vaccines?: string | undefined;
  uuid_shelter?: string | undefined;
  description?: string | undefined;
  imageURL?: string | undefined;
}

class AnimalUpdateDTO {
  constructor(
    public readonly uuid: string,
    public readonly name?: string,
    public readonly redemption_date?: string,
    public readonly species?: string,
    public readonly race?: string,
    public readonly gender?: string,
    public readonly vaccines?: string,
    public readonly imageURL?: string
  ) {
    if (name) AnimalValidation.valitorName(name);
    if (species) AnimalValidation.valdiatorSpecies(species);
    if (race) AnimalValidation.validatorRace(race);
    if (gender) AnimalValidation.validatorGender(gender);
  }

  static fromRequest(
    req: Request,
    body: { data: AnimalBody }
  ): AnimalUpdateDTO {
    const b = body.data;
    return new AnimalUpdateDTO(
      req.params.id!,
      b.name,
      b.redemption_date,
      b.species,
      b.race,
      b.gender,
      b.vaccines,
      b.imageURL
    );
  }
}

export { AnimalUpdateDTO };
