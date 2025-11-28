import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import { AppError } from "../../erros/App.errors.js";
import { AnimalDTO } from "../DTOs/Animal.dto.js";
import { AnimalResponseDTO } from "../DTOs/AnimalResponse.dto.js";
import { AnimalUpdateDTO } from "../DTOs/AnimalUpdate.dto.js";
import { AnimalRepository } from "../repository/Animal.repository.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { AnimalUploadDTO } from "../DTOs/AnimalUpload.dto.js";

class AnimalService {
  static async create(dto: AnimalDTO): Promise<AnimalResponseDTO> {
    const existing = await AnimalRepository.getAnimalByShelter(
      dto.uuid_shelter
    );

    if (
      existing.some(
        (animal) =>
          animal.dataValues.name === dto.name &&
          animal.dataValues.disponible === true
      )
    )
      throw AppError.conflict("Animal ja existe");

    const response = await AnimalRepository.createAnimal(dto);

    return AnimalResponseDTO.fromResponse({
      uuid: response.dataValues.uuid,
      ...response.get(),
      message: "sucess",
      publicURL: response.dataValues.imageURL,
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

    const uuid = crypto.randomUUID();
    const key = `upload/${uuid}/${dto.filename}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: dto.contentType,
    });

    const uploadURL = await getSignedUrl(r2, command, { expiresIn: 120 });

    const publicURL = `https://pub-0f7462610d0045a4b620fb4ed1b36606.r2.dev/${key}`;

    return AnimalResponseDTO.fromURL(uploadURL, publicURL);
  }

  static async getById(uuid: string): Promise<AnimalResponseDTO | null> {
    const response = await AnimalRepository.getAnimalById(uuid);
    if (!response) throw AppError.notFound("Animal not found");

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
    dto: AnimalUpdateDTO
  ): Promise<AnimalResponseDTO> {
    console.log("service: ", dto);
    
    const existing = await AnimalRepository.getAnimalById(dto.uuid);
    if (!existing) throw AppError.notFound("Animal");

    await AnimalRepository.updateAnimal(dto);

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
