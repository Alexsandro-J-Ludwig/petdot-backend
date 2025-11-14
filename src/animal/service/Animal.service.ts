import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import { AppError } from "../../erros/App.errors.ts";
import { AnimalDTO } from "../DTOs/Animal.dto.ts";
import { AnimalResponseDTO } from "../DTOs/AnimalResponse.dto.ts";
import { AnimalUpdateDTO } from "../DTOs/AnimalUpdate.dto.ts";
import { AnimalRepository } from "../repository/Animal.repository.ts";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { AnimalUploadDTO } from "../DTOs/AnimalUpload.dto.ts";
import { Logger } from "../../utils/Logger.ts";

class AnimalService {
  static async create(dto: AnimalDTO): Promise<AnimalResponseDTO> {
    const existing = await AnimalRepository.getAnimalByShelter(
      dto.uuid_shelter
    );

    if (existing.map((item) => item.name).includes(dto.name))
      throw AppError.conflict("Animal");

    if (!dto.vaccines)
      throw AppError.badRequest("Vaccines information is required");

    if (!dto.imageURL === null || dto.imageURL.length === 0)
      throw AppError.badRequest("At least one image URL is required");

    const response = await AnimalRepository.createAnimal(dto);

    new Logger().logInfo(`Animal created`);

    return AnimalResponseDTO.fromResponse({
      ...response.get(),
      message: "sucess",
    });
  }

  static async getURL(dto: AnimalUploadDTO) {
    const r2 = new S3({
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      region: "auto",
      credentials: {
        accessKeyId: process.env.R2_ACESS_KEY as string,
        secretAccessKey: process.env.R2_SECRET_KEY as string,
      },
    });

    const bucket = process.env.R2_BUCKET as string;

    const key = `upload/${dto.uuid}/${dto.filename}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: dto.contentType,
    });

    const uploadURL = await getSignedUrl(r2, command, { expiresIn: 120 });

    const publicURL = `https://pub-0f7462610d0045a4b620fb4ed1b36606.r2.dev/${key}`;

    new Logger().logInfo(`Generated upload URL`);

    return AnimalResponseDTO.fromURL(uploadURL, publicURL);
  }

  static async getById(uuid: string): Promise<AnimalResponseDTO | null> {
    const response = await AnimalRepository.getAnimalById(uuid);
    if (!response) throw AppError.notFound("Animal");

    new Logger().logInfo(`Animal consulted by ID`);

    return AnimalResponseDTO.fromResponse({
      ...response.get(),
      message: "sucess",
    });
  }

  static async getAll(): Promise<AnimalResponseDTO[]> {
    const response = await AnimalRepository.getAllAnimals();
    if (!response) throw AppError.notFound("Animal");

    new Logger().logInfo(`All animals consulted`);

    return response.map((item) =>
      AnimalResponseDTO.fromResponse({ ...item.get(), message: "sucess" })
    );
  }

  static async getByShelter(
    uuid_shelter: string
  ): Promise<AnimalResponseDTO[]> {
    const response = await AnimalRepository.getAnimalByShelter(uuid_shelter);
    if (!response) throw AppError.notFound("Animal");

    new Logger().logInfo(`Animals consulted by shelter ID`);

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

    new Logger().logInfo(`Animal updated with UUID: ${uuid}`);

    return AnimalResponseDTO.fromResponse({ message: "sucess" });
  }

  static async delete(uuid: string): Promise<AnimalResponseDTO> {
    const existing = await AnimalRepository.getAnimalById(uuid);
    if (!existing) throw AppError.notFound("Animal");

    await AnimalRepository.deleteAnimal(uuid);

    new Logger().logInfo(`Animal deleted with UUID: ${uuid}`);

    return AnimalResponseDTO.fromResponse({ message: "sucess" });
  }
}

export { AnimalService };
