import { Request } from "express";
import { AdoptionValidation } from "./AdoptionValidation.js";

class AdoptionDTO {
    constructor(
    public readonly uuid_user: string,
    public readonly uuid_animal: string,
    public readonly uuid_shelter: string,
    public readonly adoption_date: Date,
  ) {
    AdoptionValidation.validatorAll(this);
  }

  static fromRequest(user: any, body: Request): AdoptionDTO {    
    return new AdoptionDTO(
      user,
      body.body.uuid_animal,
      body.body.uuid_shelter,
      body.body.adoption_date,
    );
  }
}

export { AdoptionDTO };