import { ShelterModel } from "../model/Shelter.model";

class ShelterRepository {
  static async createShelter(data: any): Promise<ShelterModel> {
    return ShelterModel.create(data);
  };

  static async getShelterById(uuid: string) {
    return await ShelterModel.findByPk(uuid);
  };

  static async getAllShelters(): Promise<ShelterModel[]> {
    return await ShelterModel.findAll();
  };

  static async getByUser(uuid_user: string): Promise<ShelterModel[]> {    
    return await ShelterModel.findAll({ where: {uuid_user}});
  };

  static async updateShelter(data: any): Promise<[affectedCount: number]>  {
    const { uuid, ...fields } = data;

    const update = Object.fromEntries(
      Object.entries(fields).filter(([_, value]) => value !== undefined)
    );

    return await ShelterModel.update(update, { where: { uuid } });
  }

  static async deleteShelter(uuid: string): Promise<number> {
    return await ShelterModel.destroy({ where: { uuid } });
  }
}

export { ShelterRepository };