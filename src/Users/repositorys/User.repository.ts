import { UserModel } from "../models/User.model.js";

class UserRepository {
  static async createUser(data: any): Promise<UserModel> {
    return await UserModel.create(data);
  }

  static async getUserById(uuid: string): Promise<UserModel | null> {    
    return await UserModel.findOne({ where: { uuid } });
  }

  static async getUserByEmail(email: string): Promise<UserModel | null> {
    return await UserModel.findOne({ where: { email } });
  }

  static async updateUser(data: any): Promise<[affectedCount: number]> {
    const uuid = typeof data.uuid === "string" ? data.uuid : data.uuid?.uuid;

    const fields = { ...data };
    delete fields.uuid;

    const update = Object.fromEntries(
      Object.entries(fields).filter(([_, value]) => value !== undefined)
    );

    return await UserModel.update(update, { where: { uuid } });
  }

  static async deleteUser(uuid: string): Promise<number> {
    return await UserModel.destroy({ where: { uuid } });
  }
}

export { UserRepository };
