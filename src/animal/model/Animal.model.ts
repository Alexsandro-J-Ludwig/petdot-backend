import { DataTypes as DT, Model, type Optional } from "sequelize";

interface AnimalModelProps {
    uuid?: string;
    name: string;
    redemption_date: Date;
    species: string;
    race: string;
    gender: string;
    vaccines: string;
    description?: string;
    uuid_shelter: string;
    disponible?: boolean;
    imageURL: string[];
};

interface AnimalModelOptional extends Optional<AnimalModelProps, "uuid" | "description" | "disponible" | "imageURL"> {};

class AnimalModel extends Model<AnimalModelProps, AnimalModelOptional> {
    public uuid?: string;
    public name!: string;
    public redemption_date!: string;
    public species!: string;
    public race!: string;
    public gender!: string;
    public vaccines!: string;
    public description!: string;
    public uuid_shelter!: string;
    public disponible!: boolean;
    public imageURL!: string[];

    static inicialize(sequelize: any) {
        AnimalModel.init(
            {
                uuid: {
                    type: DT.UUID,
                    defaultValue: DT.UUIDV4,
                    primaryKey: true,
                    allowNull: false,
                    unique: true,
                },

                name: {
                    type: DT.UUID,
                    allowNull: false,
                },
                redemption_date: {
                    type: DT.DATE,
                    allowNull: false,
                },
                species: {
                    type: DT.STRING,
                    allowNull: false,
                },
                race: {
                    type: DT.STRING,
                    allowNull: false,
                },
                gender: {
                    type: DT.UUID,
                    allowNull: false
                },
                vaccines: {
                    type: DT.STRING,
                    defaultValue: "",
                    allowNull: false,
                },
                description: {
                    type: DT.STRING,
                    defaultValue: "",
                    allowNull: true,
                },
                uuid_shelter: {
                    type: DT.UUID,
                    allowNull: false,
                },
                disponible: {
                    type: DT.BOOLEAN,
                    defaultValue: true,
                    allowNull: false,
                },
                imageURL: {
                    type: DT.ARRAY(DT.STRING),
                    allowNull: true,
                }
            }, {
                sequelize: sequelize,
                modelName: "animals",
                tableName: "animals",
                freezeTableName: true,
                timestamps: true,
            }
        );
    };
};

export { AnimalModel };