import { AppError } from "../../erros/App.errors.ts";
import { UserRepository } from "../repositorys/User.repository.ts";

import type { UserDTO } from "../DTOs/User.dto.ts";
import { UserResponseDTO } from "../DTOs/UserResponse.dto.ts";
import { UserLoginDTO } from "../DTOs/UserLogin.dto.ts";
import { UserUpdateDTO } from "../DTOs/UserUdate.dto.ts";

import bcrypt from "bcryptjs";

class UserService {
  static async createUser(dto: UserDTO) {
    const existing = await UserRepository.getUserByEmail(dto.email);

    if (existing) throw AppError.conflict("Usuário já existe");

    const hashPassword = await bcrypt.hash(dto.pass, 10);

    const data = {
      ...dto,
      pass: hashPassword,
    };

    const response = await UserRepository.createUser(data);
    return new UserResponseDTO(response.uuid!);
  }

  static async getUser(dto: UserLoginDTO) {
    const response = await UserRepository.getUserByEmail(dto.email);
    if (!response) throw AppError.notFound("Usuário");

    const passwordMatch = await bcrypt.compare(dto.pass, response.pass);
    if (!passwordMatch) throw AppError.unauthorized("Senhas não coincidem");

    return new UserResponseDTO(response.uuid!);
  }

  static async updateUser(dto: UserUpdateDTO) {
    const existing = await UserRepository.getUserById(dto.uuid);
    if (!existing) throw AppError.notFound("Usuário");

    let updatedData = { ...dto };

    if (dto.pass !== undefined && dto.pass !== null) {
      const hashPass = await bcrypt.hash(dto.pass, 10);
      updatedData = { ...updatedData, pass: hashPass };
    }

    await UserRepository.updateUser(updatedData);
    return { message: "Dados de usuário atualizados com sucesso" };
  }

  static async deleteUser(uuid: string) {
    const existing = await UserRepository.getUserById(uuid);
    if (!existing) throw AppError.notFound("Usuário");

    await UserRepository.deleteUser(uuid);
    return { message: "Usuário deletado com sucesso" };
  }
}

export { UserService };
