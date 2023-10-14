// The class activities was used as a reference to this project - see activity 14-24
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// To verify user creditial when logging in.
class User extends Model {
  checkPassword(userPassword) {
    return bcrypt.compareSync(userPassword, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [12], // Minimum password length of 12 characters
    },
  },
  // Hook function to hash and verify the user password before storing it in the database
  hooks: {
    beforeCreate: async (newUserData) => {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  modelame: "user",
});

//Export user model
module.exports = User;
