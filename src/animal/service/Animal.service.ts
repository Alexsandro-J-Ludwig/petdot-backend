import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import { AppError } from "../../erros/App.errors.ts";
import { AnimalDTO } from "../DTOs/Animal.dto.ts";
import { AnimalResponseDTO } from "../DTOs/AnimalResponse.dto.ts";
import { AnimalUpdateDTO } from "../DTOs/AnimalUpdate.dto.ts";
import { AnimalRepository } from "../repository/Animal.repository.ts";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { AnimalUploadDTO } from "../DTOs/AnimalUpload.dto.ts";

class AnimalService {
  static async create(dto: AnimalDTO): Promise<AnimalResponseDTO> {
    const existing = await AnimalRepository.getAnimalByShelter(
      dto.uuid_shelter
    );

    if (existing.map((item) => item.name).includes(dto.name))
      throw AppError.conflict("Animal");

    const response = await AnimalRepository.createAnimal(dto);
    return AnimalResponseDTO.fromResponse({
      ...response.get(),
      message: "sucess",
    });
  }

  static async sendURL(dto: AnimalUploadDTO) {
    const r2 = new S3({
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACESS_KEY as string,
        secretAccessKey: process.env.R2_SECRET_KEY as string,
      },
    });

    const bucket = process.env.R2_BUCKET as string;

    const key = `upload/${randomUUID()}/${dto.filename}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: dto.contentType,
    });

    const uploadURL = await getSignedUrl(r2, command, { expiresIn: 120 });

    const publicURL = `https://${bucket}.${
      process.env.R2_ACCOUNT_ID as string
    }.r2.cloudflarestorage.com/${key}`;

    return AnimalResponseDTO.fromResponse({ uploadURL, publicURL });
  }

  static async getById(uuid: string): Promise<AnimalResponseDTO | null> {
    const response = await AnimalRepository.getAnimalById(uuid);
    if (!response) throw AppError.notFound("Animal");

    return AnimalResponseDTO.fromResponse({
      ...response.get(),
      message: "sucess",
    });
  }

  static async getAll(): Promise<AnimalResponseDTO[]> {
    const response = await AnimalRepository.getAllAnimals();
    if (!response) throw AppError.notFound("Animal");

    return response.map((item) =>
      AnimalResponseDTO.fromResponse({ ...item.get(), message: "sucess" })
    );
  }

  static async getByShelter(
    uuid_shelter: string
  ): Promise<AnimalResponseDTO[]> {
    const response = await AnimalRepository.getAnimalByShelter(uuid_shelter);
    if (!response) throw AppError.notFound("Animal");

    return response.map((item) =>
      AnimalResponseDTO.fromResponse({ ...item.get(), message: "sucess" })
    );
  }

  static async update(
    uuid: string,
    dto: AnimalUpdateDTO
  ): Promise<AnimalResponseDTO> {
    const existing = await AnimalRepository.getAnimalById(uuid);
    if (!existing) throw AppError.notFound("Animal");

    const response = await AnimalRepository.updateAnimal({ uuid, ...dto });
    return AnimalResponseDTO.fromResponse({ message: "sucess" });
  }

  static async delete(uuid: string): Promise<AnimalResponseDTO> {
    const existing = await AnimalRepository.getAnimalById(uuid);
    if (!existing) throw AppError.notFound("Animal");

    await AnimalRepository.deleteAnimal(uuid);
    return AnimalResponseDTO.fromResponse({ message: "sucess" });
  }
}

export { AnimalService };
