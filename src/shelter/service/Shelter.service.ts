import { AppError } from "../../erros/App.errors.ts";
import { Logger } from "../../utils/Logger.ts";
import type { ShelterDTO } from "../DTOs/Shelter.dto.ts";
import { ShelterResponseDTO } from "../DTOs/ShelterResponse.dto.ts";
import type { ShelterUpdateDTO } from "../DTOs/ShelterUpdate.dto.ts";
import { ShelterRepository } from "../repository/Shelter.repository.ts";

class ShelterService {
  static async createShelter(dto: ShelterDTO) {
    const existing = await ShelterRepository.getByUser(dto.uuid_user);
    if (existing.values.name === dto.name) throw AppError.conflict("Shelter");

    const response = await ShelterRepository.createShelter(dto);

    new Logger().logInfo(
      `Shelter created with UUID: ${response.dataValues.uuid}`
    );
    return new ShelterResponseDTO(response.dataValues, "Shelter was created");
  }

  static async getShelterById(uuid: string) {
    const response = await ShelterRepository.getShelterById(uuid);
    if (!response) throw AppError.notFound("Shelter");

    new Logger().logInfo(`Shelter consulted with UUID`);
    return new ShelterResponseDTO(response.dataValues, "Shelter found");
  }

  static async getAllShelter() {
    const response = await ShelterRepository.getAllShelters();
    if (response.length === 0) throw AppError.notFound("Shelter");

    new Logger().logInfo(`All shelters consulted`);
    return new ShelterResponseDTO(response, "Shelters found");
  }

  static async getByUser(uuid_user: string) {
    const response = await ShelterRepository.getByUser(uuid_user);
    if (response.length === 0) throw AppError.notFound("Shelter");

    new Logger().logInfo(`Shelter consulted by user UUID`);
    return new ShelterResponseDTO(response, "Shelter found");
  }

  static async updateShelter(dto: ShelterUpdateDTO) {
    const existing = await ShelterRepository.getShelterById(dto.uuid);
    if (!existing) throw AppError.notFound("Shelter");

    await ShelterRepository.updateShelter(dto);

    new Logger().logInfo(`Shelter updated with UUID: ${dto.uuid}`);
    return new ShelterResponseDTO("", "Shelter was updated");
  }

  static async deleteShelter(uuid: string) {
    const existing = await ShelterRepository.getShelterById(uuid);
    if (!existing) throw AppError.notFound("Shelter");

    await ShelterRepository.deleteShelter(uuid);

    new Logger().logInfo(`Shelter deleted with UUID: ${uuid}`);
    return new ShelterResponseDTO("", "Shelter was deleted");
  }
}

export { ShelterService };
