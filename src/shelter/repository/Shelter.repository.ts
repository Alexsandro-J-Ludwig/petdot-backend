import { ShelterModel } from "../model/Shelter.model.ts";

class ShelterRepository {
  static async createShelter(data: {
    name: string;
    cnpj: string;
    description: string;
    uuid_address: string;
    phonenumber: string;
    email: string;
    uuid_user: string;
  }) {
    return ShelterModel.create(data);
  };

  static async getShelterById(uuid: string) {
    return await ShelterModel.findByPk(uuid);
  };

  static async getAllShelters() {
    return await ShelterModel.findAll();
  };

  static async getByUser(uuid_user: string){
    return await ShelterModel.findAll({ where: {uuid_user}});
  };

  static async updateShelter(data: {
    uuid: string;
    name?: string | undefined;
    cnpj?: string | undefined;
    description?: string | undefined;
    uuid_address?: string | undefined;
    phonenumber?: string | undefined;
    email?: string | undefined;
    uuid_user?: string | undefined;
  }) {
    const { uuid, ...fields } = data;

    const update = Object.fromEntries(
      Object.entries(fields).filter(([_, value]) => value !== undefined)
    );

    return await ShelterModel.update(update, { where: { uuid } });
  }

  static async deleteShelter(uuid: string) {
    return await ShelterModel.destroy({ where: { uuid } });
  }
}

export { ShelterRepository };