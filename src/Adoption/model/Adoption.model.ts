import { DataTypes as DT, Model, type Optional } from "sequelize";
import sequelize from "sequelize/lib/sequelize";

interface AdoptionModelProps {
    uuid?: string;
    uuid_user: string;
    uuid_animal: string;
    uuid_shelter: string;
    adoption_date: Date;
};

interface AdoptionModelOptional extends Optional<AdoptionModelProps, "uuid"> {};

class AdoptionModel extends Model<AdoptionModelProps, AdoptionModelOptional> {
    public uuid?: string;
    public uuid_user!: string;
    public uuid_animal!: string;
    public uuid_shelter!: string;
    public adoption_date!: Date;

    static inicialize(sequelize: any) {
        AdoptionModel.init(
            {
                uuid: {
                    type: DT.UUID,
                    defaultValue: DT.UUIDV4,
                    primaryKey: true,
                    allowNull: false,
                    unique: true,
                },

                uuid_user: {
                    type: DT.UUID,
                    allowNull: false,
                },
                uuid_animal: {
                    type: DT.UUID,
                    allowNull: false,
                },
                uuid_shelter: {
                    type: DT.UUID,
                    allowNull: false,
                },
                adoption_date: {
                    type: DT.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "adoptions",
                timestamps: true,
            }
        );
    }
}

AdoptionModel.inicialize(sequelize);

export { AdoptionModel };