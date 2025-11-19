import { Request } from "express";
import { AnimalValidation } from "./AnimalValidation.js";

interface AnimalBody {
  name: string;
  redemption_date: Date;
  species: string;
  race: string;
  gender: string;
  vaccines: string;
  uuid_shelter: string;
  description?: string;
}

class AnimalDTO {
  constructor(
    public readonly name: string,
    public readonly redemption_date: Date,
    public readonly species: string,
    public readonly race: string,
    public readonly gender: string,
    public readonly vaccines: string,
    public readonly uuid_shelter: string,
    public readonly description?: string
  ) {
    AnimalValidation.valdiatorAll(this);
  }

  static fronRequest(body: AnimalBody): AnimalDTO {
    return new AnimalDTO(
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

export { AnimalDTO };
