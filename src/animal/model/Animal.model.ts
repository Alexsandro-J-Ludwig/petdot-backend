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
};

interface AnimalModelOptional extends Optional<AnimalModelProps, "uuid" | "description"> {};

class AnimalModel extends Model<AnimalModelProps, AnimalModelOptional> {};