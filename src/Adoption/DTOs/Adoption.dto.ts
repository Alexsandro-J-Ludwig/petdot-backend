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

  static fromRequest(user: any, body: any): AdoptionDTO {    
    return new AdoptionDTO(
      user,
      body.uuid_animal,
      body.uuid_shelter,
      body.adoption_date,
    );
  }
}

export { AdoptionDTO };