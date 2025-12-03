import { Request } from "express";
import { AdoptionValidation } from "./AdoptionValidation.js";

interface AdoptionBody {
  uuid_animal: string;
  uuid_shelter: string;
  adoption_date: Date;
}

class AdoptionDTO {
    constructor(
    public readonly uuid_user: string,
    public readonly uuid_animal: string,
    public readonly uuid_shelter: string,
    public readonly adoption_date: Date,
  ) {
    AdoptionValidation.validatorAll(this);
  }

  static fromRequest(user: string, body: AdoptionBody): AdoptionDTO {    
    return new AdoptionDTO(
      user,
      body.uuid_animal,
      body.uuid_shelter,
      body.adoption_date,
    );
  }
}

export { AdoptionDTO };