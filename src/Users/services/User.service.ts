import { AppError } from "../../erros/App.errors.ts";
import { UserRepository } from "../repositorys/User.repository.ts";
import type { UserDTO } from "../DTOs/User.dto.ts";
import { UserResponseDTO } from "../DTOs/UserResponse.dto.ts";
import { UserLoginDTO } from "../DTOs/UserLogin.dto.ts";
import { UserUpdateDTO } from "../DTOs/UserUpdate.dto.ts";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import {S3} from "aws-sdk";

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

    const token = jwt.sign(
      { uuid: response.uuid, acesso: response.nivel_acesso },
      process.env.SKJWT!,
      {
        expiresIn: 92600,
      }
    );

    return new UserResponseDTO(token, "Usuário criado com sucesso");
  }

  // static async getURL() {
  //   const r2 = new S3({
  //     endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,

  //   })
  // }

  static async getUser(dto: UserLoginDTO) {
    const response = await UserRepository.getUserByEmail(dto.email);
    if (!response) throw AppError.notFound("Usuário");

    const passwordMatch = await bcrypt.compare(
      dto.pass,
      response.dataValues.pass
    );
    if (!passwordMatch) throw AppError.unauthorized("Senhas não coincidem");
    console.log(response.dataValues);

    const token = jwt.sign(
      { uuid: response.dataValues.uuid, acess: response.nivel_acesso },
      process.env.SKJWT!,
      { expiresIn: 92600 }
    );

    return new UserResponseDTO(token, "Usuário autenticado com sucesso");
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
    return new UserResponseDTO("", "Usuário atualizado com sucesso");
  }

  static async deleteUser(uuid: string) {
    const existing = await UserRepository.getUserById(uuid);
    if (!existing) throw AppError.notFound("Usuário");

    await UserRepository.deleteUser(uuid);
    return new UserResponseDTO("", "Usuário deletado com sucesso");
  }
}

export { UserService };
