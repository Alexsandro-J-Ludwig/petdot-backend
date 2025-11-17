import { AppError } from "../../erros/App.errors";
import { UserRepository } from "../repositorys/User.repository";
import { UserDTO } from "../DTOs/User.dto";
import { UserResponseDTO } from "../DTOs/UserResponse.dto";
import { UserLoginDTO } from "../DTOs/UserLogin.dto";
import { UserUpdateDTO } from "../DTOs/UserUpdate.dto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { UserUploadDTO } from "../DTOs/UserUpload.dto";
import { Logger } from "../../utils/Logger";

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
      {
        uuid: response.dataValues.uuid,
        acess: response.dataValues.nivel_acesso,
      },
      process.env.SKJWT as string,
      { expiresIn: 92600 }
    );
    
    new Logger().logInfo(`User created. ${Date.now()}`);
    return new UserResponseDTO(token, "Usuário criado com sucesso");
  }

  static async getURL(dto: UserUploadDTO) {
    const r2 = new S3({
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      region: "auto",
      credentials: {
        accessKeyId: process.env.R2_ACESS_KEY!,
        secretAccessKey: process.env.R2_SECRET_KEY!,
      },
    });
  
    const bucket = process.env.R2_BUCKET!;
    const key = `upload/${dto.uuid}/${dto.filename}`;
  
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: dto.contentType,
    });
  
    const uploadURL = await getSignedUrl(r2, command, { expiresIn: 120 });
  
    const publicURL = `https://pub-0f7462610d0045a4b620fb4ed1b36606.r2.dev/${key}`;
  
    return new UserResponseDTO(undefined, "", uploadURL, publicURL);
  }
  
  static async getUser(dto: UserLoginDTO) {
    const response = await UserRepository.getUserByEmail(dto.email);
    if (!response) throw AppError.notFound("Usuário");

    const passwordMatch = await bcrypt.compare(
      dto.pass,
      response.dataValues.pass
    );
    if (!passwordMatch) throw AppError.unauthorized("Senhas não coincidem");

    const token = jwt.sign(
      {
        uuid: response.dataValues.uuid,
        acess: response.dataValues.nivel_acesso,
      },
      process.env.SKJWT as string,
      { expiresIn: 92600 }
    );

    new Logger().logInfo("User authenticated successfully")
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

    const response = await UserRepository.getUserById(dto.uuid);

    if (dto.nivel_acesso !== undefined && response) {
      jwt.sign(
        {
          uuid: response.dataValues.uuid,
          acesso: response.dataValues.nivel_acesso,
        },
        process.env.SKJWT as string,
        { expiresIn: 92600 }
      );
    }
    
    new Logger().logInfo("User was updated")
    return new UserResponseDTO("", "Usuário atualizado com sucesso");
  }

  static async deleteUser(uuid: string) {
    const existing = await UserRepository.getUserById(uuid);
    if (!existing) throw AppError.notFound("Usuário");

    await UserRepository.deleteUser(uuid);

    new Logger().logInfo("User was deleted")
    return new UserResponseDTO("", "Usuário deletado com sucesso");
  }
}

export { UserService };
