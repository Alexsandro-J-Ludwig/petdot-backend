import { DataTypes as DT, Model, type Optional } from "sequelize";

interface UserModelProps {
    uuid?: string;
    name: string;
    email: string;
    pass: string;
    celular: string;
    nivel_acesso: string;
}

interface UserModelOptional extends Optional<UserModelProps, "uuid" | "nivel_acesso"> {};

class UserModel extends Model<UserModelProps, UserModelOptional>{
    public uuid?: string;
    public name!: string;
    public email!: string;   
    public pass!: string;
    public celular!: string;
    public nivel_acesso?: string;

    static initialize(sequelize: any) {
        UserModel.init(
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
                email: {
                    type: DT.STRING,
                    allowNull: false,
                    unique: true
                },
                pass: {
                    type: DT.STRING,
                    allowNull: false
                },
                celular: {
                    type: DT.STRING,
                    allowNull: false
                },
                nivel_acesso: {
                    type: DT.STRING,
                    defaultValue: 1,
                    allowNull: false
                }
            },
            {
                sequelize: sequelize,
                modelName: "Users",
                tableName: "users",
                freezeTableName: true,
                timestamps: true
            }
        );
    };
};

export { UserModel };