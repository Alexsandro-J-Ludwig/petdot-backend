import { UserModel } from "../models/User.model.js";

class UserRepository {
  static async createUser(data: {
    name: string;
    email: string;
    pass: string;
    celular: string;
  }) {
    return await UserModel.create(data);
  }

  static async getUserById(uuid: string) {
    return await UserModel.findOne({ where: { uuid } });
  }

  static async getUserByEmail(email: string) {
    return await UserModel.findOne({ where: { email } });
  }

  static async updateUser(data: {
    uuid: string;
    name?: string;
    email?: string;
    pass?: string;
    celular?: string;
    nivel_acesso?: string;
  }) {
    const { uuid, ...fields } = data;

    const update = Object.fromEntries(
      Object.entries(fields).filter(([_, value]) => value !== undefined)
    );

    return await UserModel.update(update, { where: { uuid } });
  }

  static async deleteUser(uuid: string) {
    return await UserModel.destroy({ where: { uuid } });
  }
}

export { UserRepository };
