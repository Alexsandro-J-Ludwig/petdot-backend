import { Request } from "express";
import { AnimalValidation } from "./AnimalValidation.js";

class AnimalDTO {
  constructor(
    public readonly name: string,
    public readonly redemption_date: Date,
    public readonly species: string,
    public readonly race: string,
    public readonly gender: string,
    public readonly vaccines: string,
    public readonly uuid_shelter: string,
    public readonly description?: string,
  ) {
    AnimalValidation.valdiatorAll(this);
  }

  static fronRequest(body: Request): AnimalDTO {
    console.log(body);
    
    return new AnimalDTO(
      body.body.name,
      body.body.redemption_date,
      body.body.species,
      body.body.race,
      body.body.gender,
      body.body.vaccines,
      body.body.uuid_shelter,
      body.body.description,
    );
  }
}

export { AnimalDTO };
