import { AdoptionValidation } from "./AdoptionValidation.ts";

class AdoptionDTO {
    constructor(
    public readonly uuid_user: string,
    public readonly uuid_animal: string,
    public readonly uuid_shelter: string,
    public readonly adoption_date: Date,
  ) {
    AdoptionValidation.validatorAll(this);
  }

  static fromRequest(body: any): AdoptionDTO {
    return new AdoptionDTO(
      body.uuid_user,
      body.uuid_animal,
      body.uuid_shelter,
      body.adoption_date,
    );
  }
}

export { AdoptionDTO };