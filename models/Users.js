import Sequelize from "sequelize";
import { connection } from "../connection/database.js";
import bcrypt from 'bcryptjs';

const Users = connection.define(
    "Users", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "users",
        timestamps: true,
        hooks: {
            beforeCreate(user) {
                if (user.changed("password")) {
                    const saltRounds = 10;
                    return bcrypt.hash(user.password, saltRounds).then((hashedPassword) => {
                        user.password = hashedPassword;
                    });
                }
            }
        }
    }
);

// Define method to validate password
Users.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

export default Users;
