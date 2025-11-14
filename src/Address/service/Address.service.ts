import { AppError } from "../../erros/App.errors.ts";
import type { AddressDTO } from "../DTOs/Address.dto.ts";
import { AddressResponseDTO } from "../DTOs/AddressResponse.dto.ts";
import type { AddressUpdateDTO } from "../DTOs/AddressUpdate.dto.ts";
import { AddressRepository } from "../repository/Address.repository.ts";

class AddressService {
  static async createAddress(dto: AddressDTO) {
    const existing = await AddressRepository.getAddress(dto.uuid_user);
    if (existing) throw AppError.conflict("User can only address");

    const result = await AddressRepository.createAddress(dto);
    return new AddressResponseDTO(result, "Endereço criado com sucesso");
  }

  static async getAddress(uuid_user: string) {
    const response = await AddressRepository.getAddress(uuid_user);
    if (!response) throw AppError.notFound("Address not found");

    return new AddressResponseDTO(response, "Endereço encontrado com sucesso");
  }

  static async updateAddress(dto: AddressUpdateDTO) {
    const existing = await AddressRepository.getAddress(dto.uuid_user);
    if (!existing) throw AppError.notFound("Address not found");

    await AddressRepository.updateAddress(dto);
    return new AddressResponseDTO({data: existing}, "Endereço atualizado com sucesso");
  }

  static async deleteAddress(uuid_user: string) {
    const existing = await AddressRepository.getAddress(uuid_user);
    if (!existing) throw AppError.notFound("Address not found");

    await AddressRepository.deleteAddress(uuid_user);
    return new AddressResponseDTO("", "Endereço deletado com sucesso");
  }
}

export { AddressService };
