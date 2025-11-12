import { AppError } from "../../erros/App.errors.ts";
import type { AnimalDTO } from "../DTOs/Animal.dto.ts";
import { AnimalResponseDTO } from "../DTOs/AnimalResponse.dto.ts";
import { AnimalUpdateDTO } from "../DTOs/AnimalUpdate.dto.ts";
import { AnimalRepository } from "../repository/Animal.repository.ts";

class AnimalService {
  static async create(dto: AnimalDTO): Promise<AnimalResponseDTO> {
    const existing = await AnimalRepository.getAnimalByShelter(
      dto.uuid_shelter
    );

    if (existing.map((item) => item.name).includes(dto.name))
      throw AppError.conflict("Animal");
    
    const response = await AnimalRepository.createAnimal(dto);
    return AnimalResponseDTO.fromResponse({ ...response.get(), message: "sucess" });
  }
  
  // static async sendURL(){};

  static async getById(uuid: string): Promise<AnimalResponseDTO | null> {
    const response = await AnimalRepository.getAnimalById(uuid);
    if (!response) throw AppError.notFound("Animal");

    return AnimalResponseDTO.fromResponse({ ...response.get(), message: "sucess" });
  }

  static async getAll(): Promise<AnimalResponseDTO[]> {
    const response = await AnimalRepository.getAllAnimals();
    if (!response) throw AppError.notFound("Animal");

    return response.map((item) => AnimalResponseDTO.fromResponse({...item.get(), message: "sucess"}));
  }

  static async getByShelter(
    uuid_shelter: string
  ): Promise<AnimalResponseDTO[]> {
    const response = await AnimalRepository.getAnimalByShelter(uuid_shelter);
    if (!response) throw AppError.notFound("Animal");

    return response.map((item) => AnimalResponseDTO.fromResponse({...item.get(), message: "sucess"}));
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
