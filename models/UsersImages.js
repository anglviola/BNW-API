import Sequelize from "sequelize";
import { connection } from "../connection/database.js";

const UsersImages = connection.define(
    "UsersImages", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        caption: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: "users_images",
        timestamps: true,
    }
);

export default UsersImages;
