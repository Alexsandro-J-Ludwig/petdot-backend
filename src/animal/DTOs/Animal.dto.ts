import { AnimalValidation } from "./AnimalValidation.ts";

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
    public readonly imageURL: string[] = [],
  ) {
    AnimalValidation.valdiatorAll(this);
  }

  static fronRequest(body: any): AnimalDTO {
    console.log(body);
    
    return new AnimalDTO(
      body.name,
      body.redemption_date,
      body.species,
      body.race,
      body.gender,
      body.vaccines,
      body.uuid_shelter,
      body.description,
      body.imageURL,
    );
  }
}

export { AnimalDTO };
