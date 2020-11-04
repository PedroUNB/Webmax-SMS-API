const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      user_name: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      tableName: "users",
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.generateToken = function () {
    const now = Math.floor(Date.now() / 1000);
    return jwt.sign(
      {
        id: this.id,
        iat: now,
        exp: now + 60 * 60 * 24 * 3,
      },
      process.env.APP_SECRET
    );
  };

  return User;
};
