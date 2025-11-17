import { AppError } from "../../erros/App.errors";
import type { ShelterDTO } from "../DTOs/Shelter.dto";
import { ShelterResponseDTO } from "../DTOs/ShelterResponse.dto";
import type { ShelterUpdateDTO } from "../DTOs/ShelterUpdate.dto";
import { ShelterRepository } from "../repository/Shelter.repository";

class ShelterService {
  static async createShelter(dto: ShelterDTO) {
    const existing = await ShelterRepository.getByUser(dto.uuid_user);
    if (existing.some((shelter) => shelter.dataValues.cnpj === dto.cnpj))
      throw AppError.conflict("Shelter alredy exist");
    
    const response = await ShelterRepository.createShelter(dto);

    response.dataValues.uuid_user = "";

    return new ShelterResponseDTO(response.dataValues, "Shelter was created");
  }

  static async getShelterById(uuid: string) {
    console.log(uuid);
    
    const response = await ShelterRepository.getShelterById(uuid);
    if (!response) throw AppError.notFound("Shelter not found");

    response.dataValues.uuid_user = "";

    return new ShelterResponseDTO(response.dataValues, "Shelter found");
  }

  static async getAllShelter() {
    const response = await ShelterRepository.getAllShelters();
    if (response.length === 0) throw AppError.notFound("Shelter not found");

    response.map((item) => item.dataValues.uuid_user = "")
    return new ShelterResponseDTO(response, "Shelters found");
  }

  static async getByUser(uuid_user: string) {
    const response = await ShelterRepository.getByUser(uuid_user);
    if (response.length === 0) throw AppError.notFound("Shelter not found");

    response.map((item) => item.dataValues.uuid_user = "")
    return new ShelterResponseDTO(response, "Shelter found");
  }

  static async updateShelter(dto: ShelterUpdateDTO) {
    const existing = await ShelterRepository.getShelterById(dto.uuid);
    if (!existing) throw AppError.notFound("Shelter not found");

    await ShelterRepository.updateShelter(dto);

    return new ShelterResponseDTO("", "Shelter was updated");
  }

  static async deleteShelter(uuid: string) {
    const existing = await ShelterRepository.getShelterById(uuid);
    if (!existing) throw AppError.notFound("Shelter not found");

    await ShelterRepository.deleteShelter(uuid);

    return new ShelterResponseDTO("", "Shelter was deleted");
  }
}

export { ShelterService };
