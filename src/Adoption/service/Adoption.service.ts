import { AppError } from "../../erros/App.errors.ts";
import { Logger } from "../../utils/Logger.ts";
import type { AdoptionDTO } from "../DTOs/Adoption.dto.ts";
import { AdoptionResponseDTO } from "../DTOs/AdoptionResponse.ts";
import { AdoptionModel } from "../model/Adoption.model.ts";
import { AdoptionRepository } from "../repository/Adoption.repository.ts";

class AdoptionService {
  static async createAdoption(dto: AdoptionDTO): Promise<AdoptionResponseDTO> {
    const existing = await AdoptionRepository.findByAnimalUuid(dto.uuid_animal);
    if (existing) throw AppError.conflict("Animal já adotado");

    const response = await AdoptionRepository.create(dto);

    new Logger().logInfo(`Adoption created. ${new Date().toISOString()}`);

    return new AdoptionResponseDTO(response.dataValues, "Adotado com sucesso");
  }

  static async getAdoptionByUuid(uuid: string): Promise<AdoptionResponseDTO> {
    const response = await AdoptionRepository.findByAnimalUuid(uuid);
    if (!response) throw AppError.notFound("Adoção não encontrada");

    return AdoptionResponseDTO.fronResponse(response, "sucess")
  }

  static async getAllAdoptions(): Promise<AdoptionResponseDTO[]> {
    const responses = await AdoptionRepository.findAll();
    if (responses.length === 0)
      throw AppError.notFound("Nenhuma adoção encontrada");

    return responses.map((response) => AdoptionResponseDTO.fronResponse(response, "sucess"));
  }

  static async getAdoptionsByUserUuid(
    uuid_user: string
  ): Promise<AdoptionResponseDTO[] | null> {
    const responses = await AdoptionRepository.findByUserUuid(uuid_user);
    if (responses && responses.length === 0)
      throw AppError.notFound("Nenhuma adoção encontrada");

    return responses!.map((response) => AdoptionResponseDTO.fronResponse(response, "sucess"));
  }

  static async getAdoptionByAnimalUuid(
    uuid_animal: string
  ): Promise<AdoptionResponseDTO> {
    const response = await AdoptionRepository.findByAnimalUuid(uuid_animal);
    if (!response) throw AppError.notFound("Adoção não encontrada");

    return AdoptionResponseDTO.fronResponse(response, "sucess");
  }

  static async deleteAdoptionByUuid(
    uuid: string
  ): Promise<AdoptionResponseDTO> {
    const response = await AdoptionRepository.findByUuid(uuid);
    if (!response) throw AppError.notFound("Adoção não encontrada");

    await AdoptionRepository.deleteByUuid(uuid);
    return AdoptionResponseDTO.fronResponse(response, "Adoption deleted successfully");
  }
}

export { AdoptionService };
