import { AppError } from "../../erros/App.errors.ts";
import type { AdoptionDTO } from "../DTOs/Adoption.dto.ts";
import { AdoptionResponseDTO } from "../DTOs/AdoptionResponse.ts";
import { AdoptionModel } from "../model/Adoption.model.ts";
import { AdoptionRepository } from "../repository/Adoption.repository.ts";

class AdoptionService {
  static async createAdoption(dto: AdoptionDTO): Promise<AdoptionResponseDTO> {
    const existing = await AdoptionRepository.findByAnimalUuid(dto.uuid_animal);
    if (existing) throw AppError.conflict("Animal já adotado");

    const response = await AdoptionRepository.create(dto);
    return new AdoptionResponseDTO("Adotado com sucesso", response);
  }

  static async getAdoptionByUuid(uuid: string): Promise<AdoptionResponseDTO> {
    const response = await AdoptionModel.findOne({ where: { uuid } });
    if (!response) throw AppError.notFound("Adoção não encontrada");

    return new AdoptionResponseDTO("sucess", response);
  }

  static async getAllAdoptions(): Promise<AdoptionResponseDTO[]> {
    const responses = await AdoptionModel.findAll();
    if (responses.length === 0)
      throw AppError.notFound("Nenhuma adoção encontrada");

    return responses.map((response) => new AdoptionResponseDTO("sucess", response));
  }

  static async getAdoptionsByUserUuid(
    uuid_user: string
  ): Promise<AdoptionResponseDTO[] | null> {
    const responses = await AdoptionModel.findAll({ where: { uuid_user } });
    if (responses.length === 0)
      throw AppError.notFound("Nenhuma adoção encontrada");

    return responses.map((response) => new AdoptionResponseDTO("sucess", response));
  }

  static async getAdoptionByAnimalUuid(
    uuid_animal: string
  ): Promise<AdoptionResponseDTO> {
    const response = await AdoptionModel.findOne({ where: { uuid_animal } });
    if (!response) throw AppError.notFound("Adoção não encontrada");

    return new AdoptionResponseDTO("sucess", response);
  }

  static async deleteAdoptionByUuid(
    uuid: string
  ): Promise<AdoptionResponseDTO> {
    const response = await AdoptionModel.findOne({ where: { uuid } });
    if (!response) throw AppError.notFound("Adoção não encontrada");

    await AdoptionModel.destroy({ where: { uuid } });
    return new AdoptionResponseDTO("Adoption deleted successfully", response);
  }
}

export { AdoptionService };
