import { AnimalModel } from "../model/Animal.model.ts";

class AnimalRepository {
  static async createAnimal(data: any): Promise<AnimalModel> {
    return await AnimalModel.create(data);
  }

  static async getAnimalById(uuid: string): Promise<AnimalModel | null> {
    return await AnimalModel.findByPk(uuid);
  }

  static async getAllAnimals(): Promise<AnimalModel[]> {
    return await AnimalModel.findAll();
  }

  static async getAnimalByShelter(
    uuid_shelter: string
  ): Promise<AnimalModel[]> {
    return await AnimalModel.findAll({ where: { uuid_shelter } });
  }

  static async updateAnimal(
    data: any
  ): Promise<[affectedCount: number]> {
    const { uuid, ...fields } = data;

    const update = Object.fromEntries(
      Object.entries(fields).filter(([_, value]) => value !== undefined)
    );

    return await AnimalModel.update(update, { where: { uuid } });
  }

  static async deleteAnimal(uuid: string): Promise<number> {
    return await AnimalModel.destroy({ where: { uuid } });
  }
}

export { AnimalRepository };
