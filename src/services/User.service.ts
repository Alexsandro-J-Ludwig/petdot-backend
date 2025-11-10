import { AppError } from "../erros/App.errors.js";
import { UserRepository } from "../repositorys/User.repository.js";
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
    return new UserResponseDTO(response);
  }

  static async getUser(dto: UserLoginDto) {
    const response = await UserRepository.getUserByEmail(dto.email);
    if (!response) throw AppError.notFound("Usuário");

    const passwordMatch = await bcrypt.compare(dto.pass, response.pass);
    if (!passwordMatch) throw AppError.unauthorized("Senhas não coincidem");

    return new UserResponseDTO(response);
  }

  static async updateUser(dto: UserUpdateDTO) {
    const existing = await UserRepository.getUserById(dto.uuid);
    if (!existing) throw AppError.notFound("Usuário");

    if (dto.pass !== undefined && dto.pass !== null) {
      dto.pass = await bcrypt.hash(dto.pass, 10);
    }

    const response = await UserRepository.updateUser(dto);
    return new UserResponseDTO(response);
  }

  static async deleteUser(uuid: string) {
    const existing = await UserRepository.getUserById(uuid);
    if (!existing) throw AppError.notFound("Usuário");

    await UserRepository.deleteUser(uuid);
    return { message: "Usuário deletado com sucesso" };
  }
}

export { UserService };
