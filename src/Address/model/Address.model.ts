import { DataTypes as DT, Model, type Optional } from "sequelize";

interface AddressModelPros {
    uuid?: string;
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
    uuid_entidade: string
}

interface AddressModelOptional extends Optional<AddressModelPros, "uuid"> {};

class AddressModel extends Model<AddressModelOptional, AddressModelPros>{
    public uuid?: string;
    public address!: string;
    public number!: string;
    public complement!: string;
    public neighborhood!: string
    public city!: string
    public state!: string;
    public cep!: string;
    public uuid_entidade!: string;
    
    static initialize(sequelize: any) {
        AddressModel.init(
            {
                uuid: {
                    type: DT.UUID,
                    defaultValue: DT.UUIDV4,
                    primaryKey: true,
                    allowNull: false,
                },
                address: {
                    type: DT.STRING,
                    allowNull: false,
                },
                number: {
                    type: DT.STRING,
                    defaultValue: "S/N",
                },
                complement: {
                    type: DT.STRING,
                    allowNull: false,
                },
                neighborhood: {
                    type: DT.STRING,
                    allowNull: false,
                },
                city: {
                    type: DT.STRING,
                    allowNull: false,
                },
                state: {
                    type: DT.STRING,
                    allowNull: false,
                },
                cep: {
                    type: DT.STRING,
                    allowNull: false,
                },
                uuid_entidade: {
                    type: DT.STRING,
                    allowNull: false,
                }
            }, {
                sequelize: sequelize,
                modelName: "Address",
                tableName: "address",
                freezeTableName: true,
                timestamps: true
            }
        )
    }
}

export { AddressModel };