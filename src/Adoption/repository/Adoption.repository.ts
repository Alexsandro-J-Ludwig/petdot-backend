import { AdoptionModel } from "../model/Adoption.model";

class AdoptionRepository {
    static async create(data: any): Promise<AdoptionModel> {
        return await AdoptionModel.create(data);
    };

    static async findByUuid(uuid: string): Promise<AdoptionModel | null> {
        return await AdoptionModel.findOne({ where: { uuid } });
    };

    static async findAll(): Promise<AdoptionModel[]> {
        return await AdoptionModel.findAll();
    };

    static async findByUserUuid(uuid_user: string): Promise<AdoptionModel[] | null> {
        return await AdoptionModel.findAll({ where: { uuid_user } });
    }

    static async findByAnimalUuid(uuid_animal: string): Promise<AdoptionModel | null> {
        return await AdoptionModel.findOne({ where: { uuid_animal } });
    }

    static async deleteByUuid(uuid: string): Promise<number> {
        return await AdoptionModel.destroy({ where: { uuid } });
    };
};

export { AdoptionRepository };