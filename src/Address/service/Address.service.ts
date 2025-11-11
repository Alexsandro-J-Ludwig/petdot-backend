import { AppError } from "../../erros/App.errors.ts";
import { AddressRepository } from "../repository/Address.repository.ts";

class AddressService {
    static async createAddress(dto: AddressDTO){
        const existing = await AddressRepository.getAddress(dto.uuid_user);
        if(existing) throw AppError.conflict("Address");

        await AddressRepository.createAddress(dto);
        return { message: "Endereço criado" };
    }

    static async getAddress(uuid_user: string) {
        const response = await AddressRepository.getAddress(uuid_user);
        if(!response) throw AppError.notFound("Address");

        return response;
    }

    static async updateAddress(dto: AddressUpdateDTO) {
        const existing = await AddressRepository.getAddress(dto.uuid_user);
        if(!existing) throw AppError.notFound("Address");

        const response = await AddressRepository.updateAddress(dto);
        return response;
    }

    static async deleteAddress(uuid_user: string) {
        const existing = await AddressRepository.getAddress(uuid_user);
        if(!existing) throw AppError.notFound("Address");

        await AddressRepository.deleteAddress(uuid_user);
        return { message: "Endereço deletado" };
    }
}

export { AddressService };