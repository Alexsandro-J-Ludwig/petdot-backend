import { AddressModel } from "../model/Address.model.ts";

class AddressRepository {
    static async createAddress(data: {
        address: string,
        number: string,
        complement: string,
        neighborhood: string,
        city: string,
        state: string,
        cep: string,
        uuid_user: string,
    }){
        return await AddressModel.create(data);
    };

    static async getAddress(uuid_user: string){
        return await AddressModel.findOne({ where: {uuid_user}});
    }

    static async updateAddress(data: {
        uuid_user: string,
        address?: string | undefined,
        number?: string | undefined,
        complement?: string | undefined,
        neighborhood?: string | undefined,
        city?: string | undefined,
        state?: string | undefined,
        cep?: string | undefined,
    }) {
        const { uuid_user, ...fields} = data;

        const update = Object.fromEntries(
            Object.entries(fields).filter(([__, value]) => value !== undefined)
        );

        return await AddressModel.update(update, {where:{ uuid_user }});
    }

    static async deleteAddress(uuid_user: string) {
        return await AddressModel.destroy({ where: {uuid_user}});
    }
}

export { AddressRepository };