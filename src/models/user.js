import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Status } from "../constants/index.js";

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Username is required",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Passowrd is required",
      },
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: Status.ACTIVE,
    validate: {
      args: [[Status.ACTIVE, Status.INACTIVE]],
      msg: `Status must be ${Status.ACTIVE} OR ${Status.INACTIVE}`,
    },
  },
});

export default User;
