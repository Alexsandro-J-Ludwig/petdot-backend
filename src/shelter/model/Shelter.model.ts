import { DataTypes as DT, Model, type Optional } from "sequelize";

interface ShelterModelProps {
    uuid?: string;
    name: string;
    cnpj: string;
    description: string;
    uuid_address: string;
    phonenumber: string;
    email: string;	
    uuid_user: string;
};

interface ShelterModelOptional extends Optional<ShelterModelProps, "uuid" | "description"> {};

class ShelterModel extends Model<ShelterModelOptional, ShelterModelProps> {
    public uuid?: string;
    public name!: string;
    public cnpj!: string;
    public description!: string;
    public uuid_address!: string;
    public phonenumber!: string;
    public email!: string;	
    public uuid_user!: string;

    static initialize(sequelize: any) {
        ShelterModel.init(
            {
                uuid: {
                    type: DT.UUID,
                    defaultValue: DT.UUIDV4,
                    primaryKey: true,
                    allowNull: false
                },
                name: {
                    type: DT.STRING,
                    allowNull: false
                },
                cnpj: {
                    type: DT.STRING,
                    allowNull: false,
                    unique: true
                },
                description: {
                    type: DT.STRING,
                    defaultValue: "",
                    allowNull: true
                },
                uuid_address: {
                    type: DT.UUID,
                    allowNull: false
                },
                phonenumber: {
                    type: DT.STRING,
                    allowNull: false
                },
                email: {
                    type: DT.STRING,
                    allowNull: false,
                    unique: true
                },	
                uuid_user: {
                    type: DT.UUID,
                    allowNull: false
                }
            },
            {
                sequelize: sequelize,
                modelName: "Shelters",
                tableName: "shelters",
                freezeTableName: true,
                timestamps: true
            }
        );
    }
}

export { ShelterModel };