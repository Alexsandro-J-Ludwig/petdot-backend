import { AddressModel } from "../model/Address.model.js";

class AddressRepository {
  static async createAddress(data: any): Promise<AddressModel> {
    return await AddressModel.create(data);
  }

  static async getAddress(uuid: string): Promise<AddressModel | null> {
    return await AddressModel.findByPk( uuid );
  }

  static async getAddressByUser(uuid_entidade: string): Promise<AddressModel | null> {
    return await AddressModel.findOne({ where: { uuid_entidade } });
  }

  static async updateAddress(data: any): Promise<[affectedCount: number]> {
    const { uuid_user, ...fields } = data;

    const update = Object.fromEntries(
      Object.entries(fields).filter(([__, value]) => value !== undefined)
    );

    return await AddressModel.update(update, { where: { uuid_entidade: uuid_user} });
  }

  static async deleteAddress(uuid_user: string): Promise<number> {
    return await AddressModel.destroy({ where: { uuid_entidade: uuid_user} });
  }
}

export { AddressRepository };
